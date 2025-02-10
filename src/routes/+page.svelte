<script lang="ts">
  import type { Language, NativeLanguage, ProficiencyLevel, Message } from '$lib/types/common';
  import { onMount } from 'svelte';
  import { fly, fade, scale } from 'svelte/transition';
  import Header from '$lib/components/Header.svelte';
  import {
    darkMode,
    selectedLanguage,
    nativeLanguage,
    proficiencyLevel,
    streak,
    messagesToday,
    dailyGoal,
    messages,
    isLoading,
    showEncouragement,
    encouragementMessage
  } from '$lib/stores';
  import {
    languages,
    nativeLanguages,
    levels,
    commonPhrases,
    getExcludedLanguages,
    languageGroups
  } from '$lib/data';
  import { welcomeMessages, suggestedPrompts } from '$lib/constants/constants';
  import LeftSidebar from '$lib/components/LeftSidebar.svelte';
  import RightSidebar from '$lib/components/RightSidebar.svelte';
  import ChatInput from '$lib/components/ChatInput.svelte';
  import ChatMessage from '$lib/components/ChatMessage.svelte';
  import Stats from '$lib/components/Stats.svelte';
  import Suggestions from '$lib/components/Suggestions.svelte';
  import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
  import LanguageSelector from '$lib/components/LanguageSelector.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SpeakingModal from '$lib/components/SpeakingModal.svelte';
  import GrammarModal from '$lib/components/GrammarModal.svelte';
  import WritingModal from '$lib/components/WritingModal.svelte';
  import LevelTestModal from '$lib/components/LevelTestModal.svelte';
  import WordGamesModal from '$lib/components/WordGamesModal.svelte';
  import FlashcardsModal from '$lib/components/FlashcardsModal.svelte';
  import DailyQuizModal from '$lib/components/DailyQuizModal.svelte';
  import { Toaster, toast } from 'svelte-sonner';
  import { get } from 'svelte/store';

  type Conversation = {
    id: string;
    title: string;
    messages: Message[];
  };

  let conversations: Conversation[] = [];
  let currentConversation: Conversation | null = null;

  let isLeftSidebarOpen = false;
  let isRightSidebarOpen = false;
  let chatContainer: HTMLElement;
  let lastMessageTime: Date | null = null;
  let isFirstVisit = true;
  let inputMessage = '';
  let levelSelectorHighlight = false;

  // Touch and mouse interaction variables
  let touchStart = 0;
  let mouseStart = 0;
  let currentlySwipedId: string | null = null;
  let wheelTimeout: number | null = null;
  let wheelDelta = 0;

  // Modal state
  let showLevelTest = false;
  let showWordGames = false;
  let showFlashcards = false;
  let showDailyQuiz = false;
  let showSpeakingModal = false;
  let showGrammarModal = false;
  let showWritingModal = false;

  // Form state
  let selectedLevel = '';
  let selectedTopic = '';
  let writingContent = '';
  let selectedSpeakingTopic = '';
  let speakingMessages: Message[] = [];
  let aiResponse = '';

  // Audio state
  let isRecording = false;
  let isProcessing = false;
  let isAiSpeaking = false;
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: Blob[] = [];
  let silenceTimeout: NodeJS.Timeout | null = null;
  let audioContext: AudioContext | null = null;
  let analyser: AnalyserNode | null = null;
  let animationFrameId: number | null = null;
  let visualizerCanvas: HTMLCanvasElement | null = null;
  let canvasCtx: CanvasRenderingContext2D | null = null;
  let silenceThreshold = -50; // dB
  let silenceDuration = 2000; // ms
  let lastAudioLevel = 0;
  let silenceStart: number | null = null;

  // Navigation state
  let activeCategory = 'chat';

  // Stats variables
  let wordsLearned = 30;
  let practiceTime = 45;

  async function copyToClipboard(text: string): Promise<void> {
    await navigator.clipboard.writeText(text);
    toast.success('Message copied');
  }

  async function regenerateResponse(message: string): Promise<void> {
    await handleSubmit(message);
  }

  function handleSubmit(message: string): Promise<void> {
    if (!currentConversation) {
      startNewConversation();
    }

    $isLoading = true;
    scrollToBottom();

    const welcomeMsg = $messages.find((m) => m.role === 'assistant');
    const newMessages = [
      ...(welcomeMsg ? [welcomeMsg] : []),
      { role: 'user' as const, content: message }
    ];
    $messages = newMessages;

    if (currentConversation) {
      currentConversation.messages = [...newMessages];
      if (newMessages.length === 1) {
        currentConversation.title = message.slice(0, 30) + (message.length > 30 ? '...' : '');
      }
      conversations = conversations.map((conv) =>
        conv.id === currentConversation?.id
          ? { ...currentConversation, messages: [...currentConversation.messages] }
          : conv
      );
    }

    updateStreak();
    updateProgress();

    return fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        language: $selectedLanguage,
        level: $proficiencyLevel,
        responseLanguage: $nativeLanguage
      })
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to get response');
        return response.json();
      })
      .then((data) => {
        const updatedMessages = [
          ...newMessages,
          { role: 'assistant' as const, content: data.message }
        ];
        $messages = updatedMessages;

        if (currentConversation) {
          currentConversation.messages = [...updatedMessages];
          conversations = conversations.map((conv) =>
            conv.id === currentConversation?.id
              ? { ...currentConversation, messages: [...currentConversation.messages] }
              : conv
          );
        }
        scrollToBottom();
      })
      .catch((error) => {
        console.error('Error:', error);
        const errorMessages = [
          ...newMessages,
          {
            role: 'assistant' as const,
            content: 'Sorry, I encountered an error. Please try again.'
          }
        ];
        $messages = errorMessages;
        if (currentConversation) {
          currentConversation.messages = [...errorMessages];
          conversations = conversations.map((conv) =>
            conv.id === currentConversation?.id
              ? { ...currentConversation, messages: [...currentConversation.messages] }
              : conv
          );
        }
      })
      .finally(() => {
        $isLoading = false;
      });
  }

  function startNewConversation() {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: `${$selectedLanguage} Conversation`,
      messages: []
    };
    conversations = [newConv, ...conversations];
    currentConversation = newConv;

    const welcomeMessage = welcomeMessages[$nativeLanguage] || welcomeMessages['English (UK)'];
    if (welcomeMessage) {
      const initialMessage: Message = {
        role: 'assistant' as const,
        content: welcomeMessage($selectedLanguage, $proficiencyLevel)
      };
      newConv.messages = [initialMessage];
      $messages = [initialMessage];
    }
  }

  function updateStreak() {
    const now = new Date();
    if (lastMessageTime) {
      const daysDiff = Math.floor(
        (now.getTime() - lastMessageTime.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysDiff <= 1) {
        $streak += 1;
      } else {
        $streak = 1;
      }
    } else {
      $streak = 1;
    }
    lastMessageTime = now;

    if ($streak % 5 === 0) {
      $showEncouragement = true;
      $encouragementMessage = `Amazing! You've maintained a ${$streak}-day streak! 🎉`;
      setTimeout(() => ($showEncouragement = false), 3000);
    }
  }

  function updateProgress() {
    $messagesToday += 1;
    const progress = ($messagesToday / $dailyGoal) * 100;
    if ($messagesToday === $dailyGoal) {
      $showEncouragement = true;
      $encouragementMessage = "Congratulations! You've reached your daily goal! 🌟";
      setTimeout(() => ($showEncouragement = false), 3000);
    }
  }

  function scrollToBottom() {
    if (chatContainer) {
      setTimeout(() => {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }

  // Word of the Day
  let wordOfTheDay = {
    word: 'Bonjour',
    pronunciation: '/bɔ̃.ʒuʁ/',
    meaning: 'Hello, Good morning',
    example: 'Bonjour! Comment allez-vous?'
  };

  // Learning tips array
  let tips = [
    'Practice tip: Try to use new words in different contexts to better remember them.',
    'Listening tip: Watch movies with subtitles in your target language.',
    'Speaking tip: Record yourself speaking and listen back to improve pronunciation.',
    "Writing tip: Keep a daily journal in the language you're learning.",
    'Grammar tip: Focus on the most common tenses first.',
    'Vocabulary tip: Learn words in related groups or themes.',
    'Culture tip: Understanding cultural context helps language learning.',
    'Study tip: Regular short practice sessions are better than long irregular ones.',
    "Immersion tip: Change your phone's language settings to practice daily.",
    "Reading tip: Start with children's books and gradually increase difficulty.",
    'Memory tip: Create memorable associations with new words.',
    "Conversation tip: Don't be afraid to make mistakes while speaking.",
    'Motivation tip: Set realistic goals and track your progress.',
    'Practice tip: Use language learning apps during your commute.',
    'Social tip: Join language exchange communities online.',
    'Pronunciation tip: Learn the phonetic alphabet for better accuracy.',
    'Writing tip: Practice writing short stories using new vocabulary.',
    'Study tip: Review learned material before going to sleep.',
    'Speaking tip: Talk to yourself in the target language while alone.',
    "Learning tip: Teach others what you've learned to reinforce knowledge."
  ];

  let tipIndex = 0;

  let audioSource: AudioBufferSourceNode | null = null;
  let lastPlayedAudioBuffer: AudioBuffer | null = null;
  let isAudioReady = false;
  let userInteraction = false;

  let speakingModal: HTMLDialogElement;

  let handleClickOutside: (e: MouseEvent) => void;

  function selectGrammarLevel(level: string) {
    selectedLevel = level;
    toast.success(`${level} selected`);
  }

  function selectGrammarTopic(topic: string) {
    selectedTopic = topic;
    toast.success(`${topic} selected`);
  }

  function handleLanguageChange() {
    // Save language preferences
    localStorage.setItem('nativeLanguage', $nativeLanguage);
    localStorage.setItem('targetLanguage', $selectedLanguage);
  }

  function toggleTheme() {
    $darkMode = !$darkMode;
    if ($darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', $darkMode.toString());
  }

  function toggleSidebar() {
    isLeftSidebarOpen = !isLeftSidebarOpen;
  }

  function handleTouchStart(event: TouchEvent, id: string) {
    touchStart = event.touches[0].clientX;
  }

  function handleMouseDown(event: MouseEvent, id: string) {
    mouseStart = event.clientX;
    const target = event.target as HTMLElement;
    target.style.cursor = 'grabbing';
  }

  function handleTouchMove(event: TouchEvent, id: string) {
    const touchEnd = event.touches[0].clientX;
    const diff = touchStart - touchEnd;
    handleSwipe(diff, id);
  }

  function handleMouseMove(event: MouseEvent, id: string) {
    if (mouseStart === 0) return;
    const mouseEnd = event.clientX;
    const diff = mouseStart - mouseEnd;
    handleSwipe(diff, id);
  }

  function handleSwipe(diff: number, id: string) {
    const swipeSensitivity = 0.3;
    const swipePosition = diff * 4;

    if (Math.abs(swipePosition) > swipeSensitivity) {
      currentlySwipedId = swipePosition < 0 ? id : null;
    }
  }

  function handleTouchEnd(id: string) {
    touchStart = 0;
  }

  function handleMouseUp(event: MouseEvent, id: string) {
    mouseStart = 0;
    const target = event.target as HTMLElement;
    target.style.cursor = 'default';
  }

  function deleteConversation(id: string) {
    conversations = conversations.filter((conv) => conv.id !== id);
    if (currentConversation?.id === id) {
      currentConversation = conversations[0] || null;
      $messages = currentConversation?.messages || [];
    }
    currentlySwipedId = null;
  }

  function handleWheel(event: WheelEvent, id: string) {
    event.preventDefault();

    wheelDelta += event.deltaX;

    if (wheelTimeout) {
      clearTimeout(wheelTimeout);
    }

    const wheelSensitivity = 5;
    if (Math.abs(wheelDelta) > wheelSensitivity) {
      currentlySwipedId = wheelDelta < 0 ? id : null;
    }

    wheelTimeout = window.setTimeout(() => {
      wheelDelta = 0;
    }, 30);
  }

  function handleConversationClick(conv: Conversation) {
    currentConversation = conv;
    if (conv) {
      $messages = [...conv.messages];
    }
  }

  function closeSpeakingModal() {
    showSpeakingModal = false;
    stopAiSpeech();
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
    if (audioContext) {
      audioContext.close();
      audioContext = null;
    }
    speakingMessages = [];
    isRecording = false;
    isProcessing = false;
    audioChunks = [];
  }

  async function handleSpeechEnd() {
    if (!audioChunks.length) {
      throw new Error('No audio recorded');
    }

    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('language', $nativeLanguage);

    try {
      isProcessing = true;
      const response = await fetch('/api/speech-to-text', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Failed to transcribe speech');

      const data = await response.json();
      if (!data.text) throw new Error('No transcription received');

      // Add user message to main chat
      const userMessage = data.text;
      $messages = [...$messages, { role: 'user', content: userMessage }];

      // Get AI response
      const aiResponse = await sendMessage(userMessage);

      // Play AI audio response
      await playAudioResponse(aiResponse);

      // Add AI response to main chat
      $messages = [...$messages, { role: 'assistant', content: aiResponse }];
    } catch (error) {
      console.error('Speech processing error:', error);
      toast.error('Error processing speech');
    } finally {
      isProcessing = false;
      audioChunks = [];
    }
  }

  async function playAudioResponse(text: string) {
    if (!showSpeakingModal) return;

    try {
      isAiSpeaking = true;
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'alloy' })
      });

      if (!response.ok) throw new Error('Failed to get audio response');
      const data = await response.json();

      if (audioSource) {
        audioSource.stop();
        audioSource.disconnect();
      }

      if (!audioContext) {
        audioContext = new AudioContext();
      }

      const audioData = atob(data.audio);
      const arrayBuffer = new ArrayBuffer(audioData.length);
      const view = new Uint8Array(arrayBuffer);

      for (let i = 0; i < audioData.length; i++) {
        view[i] = audioData.charCodeAt(i);
      }

      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioSource = audioContext.createBufferSource();
      audioSource.buffer = audioBuffer;

      // Create analyzer for visualization
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      // Connect audio source to both analyzer and destination
      audioSource.connect(analyser);
      audioSource.connect(audioContext.destination);

      // Start visualization with the analyzer node
      startVisualization(analyser);

      audioSource.start(0);

      audioSource.onended = () => {
        isAiSpeaking = false;
        stopVisualization();
        if (showSpeakingModal) {
          setTimeout(async () => {
            await startRecording();
            isRecording = true;
          }, 500);
        }
      };
    } catch (error) {
      console.error('Failed to play AI response:', error);
      toast.error('Failed to play response');
      isAiSpeaking = false;
      stopVisualization();
    }
  }

  function resetSpeakingState() {
    isRecording = false;
    isAiSpeaking = false;
    isProcessing = false;
    audioChunks = [];

    if (audioSource) {
      audioSource.stop();
      audioSource = null;
    }
    stopVisualization();
  }

  const stopAiSpeech = () => {
    if (audioSource) {
      audioSource.stop();
      audioSource.disconnect();
      audioSource = null;
    }
    isAiSpeaking = false;
    stopVisualization();
  };

  async function toggleRecording() {
    if (isAiSpeaking) {
      return;
    }

    if (isRecording) {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
      isRecording = false;
      if (silenceTimeout) {
        clearTimeout(silenceTimeout);
        silenceTimeout = null;
      }
      stopVisualization();
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      await startRecording();
      startVisualization(stream);
    }
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      const firstVisit = localStorage.getItem('firstVisit');
      if (!firstVisit) {
        isFirstVisit = true;
        localStorage.setItem('firstVisit', 'false');
        $nativeLanguage = 'English (UK)';
        $selectedLanguage = 'French';
        saveLanguagePreferences();
      } else {
        isFirstVisit = false;
        $nativeLanguage = 'English (UK)';
        $selectedLanguage = 'French';
      }

      const savedStreak = localStorage.getItem('streak');
      const savedLastMessage = localStorage.getItem('lastMessageTime');
      if (savedStreak) $streak = parseInt(savedStreak);
      if (savedLastMessage) lastMessageTime = new Date(savedLastMessage);

      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode) {
        $darkMode = savedDarkMode === 'true';
      } else {
        $darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      if ($darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    isLeftSidebarOpen = false;
    isRightSidebarOpen = false;

    setTimeout(() => {
      isLeftSidebarOpen = true;
      setTimeout(() => {
        isRightSidebarOpen = true;
        setTimeout(() => {
          startNewConversation();
          setTimeout(() => {
            const firstConversation = document.querySelector('.conversation-item');
            if (firstConversation) {
              firstConversation.classList.add('swiped');
              setTimeout(() => {
                firstConversation.classList.remove('swiped');
                setTimeout(() => {
                  isLeftSidebarOpen = false;
                  isRightSidebarOpen = false;
                }, 600);
              }, 1000);
            }
          }, 800);
        }, 600);
      }, 500);
    }, 0);

    // ESC key handler
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSpeakingModal) {
        closeSpeakingModal();
      }
    };

    // Click outside handler
    handleClickOutside = (e: MouseEvent) => {
      if (showSpeakingModal && e.target instanceof Element) {
        const modalContent = e.target.closest('.speaking-modal > div');
        const isOutside = !modalContent && e.target.classList.contains('speaking-modal');
        if (isOutside) {
          closeSpeakingModal();
        }
      }
    };

    // Add event listeners
    window.addEventListener('keydown', handleEscKey);
    window.addEventListener('mousedown', handleClickOutside);

    // Cleanup on component destroy
    return () => {
      window.removeEventListener('keydown', handleEscKey);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  });

  function saveLanguagePreferences() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nativeLanguage', $nativeLanguage);
      localStorage.setItem('targetLanguage', $selectedLanguage);
    }
  }

  $: groupedMessages = $messages.reduce((groups: Record<string, Message[]>, message) => {
    const date = new Date().toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  function clearChat() {
    $messages = [];
  }

  $: availableTargetLanguages = [...languages]
    .filter((lang) => {
      const excludedLanguages = getExcludedLanguages($nativeLanguage);
      return !excludedLanguages.includes(lang);
    })
    .sort((a, b) => a.localeCompare(b));

  $: availableNativeLanguages = [...languages].sort((a, b) => a.localeCompare(b));

  $: if ($messages) {
    scrollToBottom();
  }

  function handleFormSubmit(event: SubmitEvent) {
    event.preventDefault();
    handleSubmit(inputMessage);
  }

  function openLevelTest() {
    showLevelTest = true;
  }

  function closeLevelTest() {
    showLevelTest = false;
  }

  $: {
    if ($proficiencyLevel) {
      levelSelectorHighlight = true;
      setTimeout(() => {
        levelSelectorHighlight = false;
      }, 2000);
    }
  }

  $: {
    if ($nativeLanguage && $selectedLanguage) {
      saveLanguagePreferences();
    }
  }

  function toggleLeftSidebar() {
    isLeftSidebarOpen = !isLeftSidebarOpen;
  }

  function toggleRightSidebar() {
    isRightSidebarOpen = !isRightSidebarOpen;
  }

  // Interactive functions for right sidebar
  function startDailyQuiz() {
    showDailyQuiz = true;
  }

  function startFlashcards() {
    showFlashcards = true;
  }

  function startWordGames() {
    showWordGames = true;
  }

  // Update stats periodically
  setInterval(() => {
    wordsLearned = Math.min(100, wordsLearned + Math.random() * 5);
    practiceTime = Math.min(100, practiceTime + Math.random() * 5);
  }, 30000); // Update every 5 minutes

  let isDarkMode: boolean;
  darkMode.subscribe((value) => {
    isDarkMode = value;
  });

  function handleCategoryClick(category: string) {
    activeCategory = category;

    if (category === 'speaking') {
      showSpeakingModal = true;
    } else if (category === 'grammar') {
      showGrammarModal = true;
    } else if (category === 'writing') {
      showWritingModal = true;
    }
  }

  function drawVisualizer(dataArray: Uint8Array) {
    if (!canvasCtx || !visualizerCanvas) return;

    const width = visualizerCanvas.width;
    const height = visualizerCanvas.height;

    canvasCtx.clearRect(0, 0, width, height);

    const barWidth = (width / analyser!.frequencyBinCount) * 2.5;
    let x = 0;

    for (let i = 0; i < analyser!.frequencyBinCount; i++) {
      const barHeight = (dataArray[i] / 255) * height * 0.8;

      const hue = (i / analyser!.frequencyBinCount) * 360;
      canvasCtx.fillStyle = isAiSpeaking
        ? `hsla(${hue}, 80%, 60%, 0.8)`
        : `hsla(${hue}, 70%, 50%, 0.8)`;

      const y = height - barHeight;
      canvasCtx.fillRect(x, y, barWidth, barHeight);

      x += barWidth + 1;
    }

    animationFrameId = requestAnimationFrame(() => {
      if (!analyser) return;
      analyser.getByteFrequencyData(dataArray);
      drawVisualizer(dataArray);
    });
  }

  function startVisualization(input: MediaStream | AudioNode) {
    if (!audioContext) {
      audioContext = new AudioContext();
    }

    if (!visualizerCanvas) return;

    visualizerCanvas.width = visualizerCanvas.offsetWidth;
    visualizerCanvas.height = visualizerCanvas.offsetHeight;

    canvasCtx = visualizerCanvas.getContext('2d');
    if (!canvasCtx) return;

    let source;
    if (input instanceof MediaStream) {
      source = audioContext.createMediaStreamSource(input);
    } else {
      source = input;
    }

    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    drawVisualizer(dataArray);
  }

  function stopVisualization() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    if (canvasCtx && visualizerCanvas) {
      canvasCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
    }
  }

  function selectTopic(topic: string) {
    selectedSpeakingTopic = topic;
    toast.success(`${topic} selected`);
  }

  function selectWritingTopic(topic: string) {
    selectedTopic = topic;
  }

  function handleWritingSubmit() {
    if (writingContent.trim()) {
      isProcessing = true;
      // Process writing submission
      setTimeout(() => {
        isProcessing = false;
        showWritingModal = false;
      }, 1500);
    }
  }

  function replayAiResponse() {
    if (lastPlayedAudioBuffer) {
      playAudioResponse(aiResponse);
    }
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);

      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = handleSpeechEnd;

      mediaRecorder.start();
      isRecording = true;
      startVisualization(stream); // Start visualization after recording starts

      // Silence detection
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function checkAudioLevel() {
        if (!isRecording || !mediaRecorder) return;

        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / bufferLength;

        if (average < 5) {
          // Silence threshold
          if (!silenceTimeout) {
            silenceTimeout = setTimeout(() => {
              if (mediaRecorder && mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
                stopVisualization(); // Stop visualization when recording stops
              }
            }, 1000); // Stop recording after 1 second of silence
          }
        } else {
          if (silenceTimeout) {
            clearTimeout(silenceTimeout);
            silenceTimeout = null;
          }
        }

        lastAudioLevel = average;
        if (isRecording) {
          requestAnimationFrame(checkAudioLevel);
        }
      }

      checkAudioLevel();
    } catch (error) {
      console.error('Error starting recording:', error);
      isRecording = false;
    }
  }

  const playAudio = async (base64Audio: string) => {
    try {
      if (!audioContext) {
        audioContext = new AudioContext();
      }

      if (audioSource) {
        audioSource.stop();
        audioSource = null;
      }

      const audioData = atob(base64Audio);
      const arrayBuffer = new ArrayBuffer(audioData.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < audioData.length; i++) {
        view[i] = audioData.charCodeAt(i);
      }

      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioSource = audioContext.createBufferSource();
      audioSource.buffer = audioBuffer;

      // Create analyzer for visualization
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      // Connect audio source to both analyzer and destination
      audioSource.connect(analyser);
      audioSource.connect(audioContext.destination);

      // Start visualization with the analyzer node
      if (showSpeakingModal) {
        startVisualization(analyser);
      }

      isAiSpeaking = true;
      audioSource.start(0);

      audioSource.onended = () => {
        isAiSpeaking = false;
        audioSource = null;
        if (showSpeakingModal) {
          stopVisualization();
        }
      };
    } catch (error) {
      console.error('Error playing audio:', error);
      isAiSpeaking = false;
      if (showSpeakingModal) {
        stopVisualization();
      }
    }
  };

  async function sendMessage(userMessage: string) {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          language: $selectedLanguage,
          level: $proficiencyLevel,
          responseLanguage: $nativeLanguage
        })
      });

      if (!response.ok) throw new Error('Failed to get AI response');
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error getting AI response:', error);
      throw error;
    }
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="flex h-screen overflow-hidden">
  <Header
    {isLeftSidebarOpen}
    {isRightSidebarOpen}
    darkMode={$darkMode}
    onToggleLeftSidebar={toggleLeftSidebar}
    onToggleRightSidebar={toggleRightSidebar}
    onToggleTheme={toggleTheme}
  />

  {#if isLeftSidebarOpen}
    <LeftSidebar
      {activeCategory}
      {conversations}
      {currentConversation}
      {currentlySwipedId}
      onCategoryClick={handleCategoryClick}
      onConversationClick={handleConversationClick}
      onDeleteConversation={deleteConversation}
      {startNewConversation}
    />
  {/if}

  <div
    class="flex-1 flex bg-gray-50 dark:bg-gray-900 mt-14
    {isLeftSidebarOpen ? 'md:ml-64 sm:ml-48 ml-48' : ''} 
    {isRightSidebarOpen ? 'md:mr-64' : ''} 
    transition-all duration-200 pb-12"
  >
    <div class="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div
        class="flex-shrink-0 p-4 space-y-6 max-w-4xl mx-auto w-full"
        in:fly={{ y: -20, duration: 500 }}
      >
        <Stats streak={$streak} messagesToday={$messagesToday} dailyGoal={$dailyGoal} />
        <LanguageSelector
          bind:nativeLanguage={$nativeLanguage}
          bind:selectedLanguage={$selectedLanguage}
          bind:proficiencyLevel={$proficiencyLevel}
          onShowLevelTest={openLevelTest}
        />
      </div>

      <div class="flex-1 flex flex-col overflow-hidden">
        <div class="flex-1 overflow-y-auto px-4 pb-32 scroll-smooth" bind:this={chatContainer}>
          <div class="max-w-4xl mx-auto">
            <div class="space-y-4 pb-20">
              <Suggestions
                suggestions={suggestedPrompts[$nativeLanguage] || []}
                onSuggestionClick={handleSubmit}
              />

              {#each $messages as message, i}
                <ChatMessage
                  {message}
                  onCopy={(text) => copyToClipboard(text)}
                  onRegenerate={i > 0 && $messages[i - 1].role === 'user'
                    ? () => regenerateResponse($messages[i - 1].content)
                    : () => Promise.resolve()}
                  previousMessage={i > 0 ? $messages[i - 1] : null}
                />
              {/each}

              {#if $isLoading}
                <LoadingIndicator />
              {/if}
            </div>
          </div>
        </div>
      </div>

      <ChatInput {handleSubmit} isLoading={get(isLoading)} />
    </div>
  </div>

  {#if isRightSidebarOpen}
    <RightSidebar
      {wordsLearned}
      {practiceTime}
      {wordOfTheDay}
      {tips}
      onStartDailyQuiz={() => (showDailyQuiz = true)}
      onStartFlashcards={() => (showFlashcards = true)}
      onStartWordGames={() => (showWordGames = true)}
    />
  {/if}

  <Footer />

  {#if showLevelTest}
    <LevelTestModal bind:showModal={showLevelTest} onClose={() => (showLevelTest = false)} />
  {/if}

  {#if showWordGames}
    <WordGamesModal bind:showModal={showWordGames} onClose={() => (showWordGames = false)} />
  {/if}

  {#if showFlashcards}
    <FlashcardsModal bind:showModal={showFlashcards} onClose={() => (showFlashcards = false)} />
  {/if}

  {#if showDailyQuiz}
    <DailyQuizModal bind:showModal={showDailyQuiz} onClose={() => (showDailyQuiz = false)} />
  {/if}

  {#if showSpeakingModal}
    <SpeakingModal
      {isRecording}
      {isProcessing}
      {isAiSpeaking}
      messages={speakingMessages}
      onClose={closeSpeakingModal}
      onToggleRecording={toggleRecording}
      {startVisualization}
      {stopVisualization}
      {stopAiSpeech}
      bind:visualizerCanvas
    />
  {/if}

  {#if showGrammarModal}
    <GrammarModal
      {selectedLevel}
      {selectedTopic}
      onClose={() => (showGrammarModal = false)}
      onSelectLevel={selectGrammarLevel}
      onSelectTopic={selectGrammarTopic}
    />
  {/if}

  {#if showWritingModal}
    <WritingModal
      {selectedTopic}
      {writingContent}
      onClose={() => (showWritingModal = false)}
      onSelectTopic={selectWritingTopic}
      onSubmit={handleWritingSubmit}
    />
  {/if}

  <Toaster
    richColors
    expand={false}
    closeButton
    theme={isDarkMode ? 'dark' : 'light'}
    toastOptions={{
      style:
        '--width: 140px; --background: var(--primary-500); --color: white; --border-radius: 12px; --padding: 8px 12px;'
    }}
  />
</div>

<style>
  :global(body) {
    font-family:
      'Inter',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(h1, h2, h3, h4, h5, h6) {
    font-family:
      'Inter',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      sans-serif;
  }
</style>
