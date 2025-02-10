<script lang="ts">
  import { fly } from 'svelte/transition';
  
  export let wordsLearned: number;
  export let practiceTime: number;
  export let wordOfTheDay = {
    word: "Bonjour",
    pronunciation: "/bɔ̃.ʒuʁ/",
    meaning: "Hello, Good morning",
    example: "Bonjour! Comment allez-vous?",
  };
  export let tips = [
    "Practice tip: Try to use new words in different contexts to better remember them.",
    "Listening tip: Watch movies with subtitles in your target language.",
    "Speaking tip: Record yourself speaking and listen back to improve pronunciation.",
    "Writing tip: Keep a daily journal in the language you're learning.",
    "Grammar tip: Focus on the most common tenses first.",
    "Vocabulary tip: Learn words in related groups or themes.",
    "Culture tip: Understanding cultural context helps language learning.",
    "Study tip: Regular short practice sessions are better than long irregular ones.",
    "Immersion tip: Change your phone's language settings to practice daily.",
    "Reading tip: Start with children's books and gradually increase difficulty.",
    "Memory tip: Create memorable associations with new words.",
    "Conversation tip: Don't be afraid to make mistakes while speaking.",
    "Motivation tip: Set realistic goals and track your progress.",
    "Practice tip: Use language learning apps during your commute.",
    "Social tip: Join language exchange communities online.",
    "Pronunciation tip: Learn the phonetic alphabet for better accuracy.",
    "Writing tip: Practice writing short stories using new vocabulary.",
    "Study tip: Review learned material before going to sleep.",
    "Speaking tip: Talk to yourself in the target language while alone.",
    "Learning tip: Teach others what you've learned to reinforce knowledge."
  ];
  export let onStartDailyQuiz: () => void;
  export let onStartFlashcards: () => void;
  export let onStartWordGames: () => void;
</script>

<div
  transition:fly={{ x: 300, duration: 600 }}
  class="fixed top-14 right-0 w-48 md:w-64 sm:w-48 h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto z-30"
>
  <!-- Daily Stats -->
  <div class="p-4 border-b border-gray-200 dark:border-gray-700">
    <h3 class="text-sm font-semibold mb-4 text-gray-800 dark:text-white">
      Daily Progress
    </h3>
    <div class="space-y-4">
      <!-- Words Learned -->
      <div class="relative pt-1">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xs font-semibold inline-block text-primary-600">
              Words Learned
            </span>
          </div>
          <div class="text-right">
            <span class="text-xs font-semibold inline-block text-primary-600">
              {Math.round(wordsLearned)}%
            </span>
          </div>
        </div>
        <div class="overflow-hidden h-2 mb-1 text-xs flex rounded bg-primary-200">
          <div
            style="width:{Math.round(wordsLearned)}%"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
          />
        </div>
      </div>

      <!-- Practice Time -->
      <div class="relative pt-1">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xs font-semibold inline-block text-green-600">
              Practice Time
            </span>
          </div>
          <div class="text-right">
            <span class="text-xs font-semibold inline-block text-green-600">
              {Math.round(practiceTime)}%
            </span>
          </div>
        </div>
        <div class="overflow-hidden h-2 mb-1 text-xs flex rounded bg-green-200">
          <div
            style="width:{Math.round(practiceTime)}%"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Word of the Day -->
  <div class="p-4 border-b border-gray-200 dark:border-gray-700">
    <h3 class="text-sm font-semibold mb-3 text-gray-800 dark:text-white">
      Word of the Day
    </h3>
    <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
      <div class="text-lg font-medium text-primary-600 dark:text-primary-400 mb-1">
        {wordOfTheDay.word}
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-300 mb-2">
        {wordOfTheDay.pronunciation} - {wordOfTheDay.meaning}
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-400 italic">
        "{wordOfTheDay.example}"
      </div>
    </div>
  </div>

  <!-- Quick Practice -->
  <div class="p-4 border-b border-gray-200 dark:border-gray-700">
    <h3 class="text-sm font-semibold mb-3 text-gray-800 dark:text-white">
      Quick Practice
    </h3>
    <div class="space-y-2">
      <button
        class="w-full p-2 text-left rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        on:click={onStartDailyQuiz}
      >
        <span class="text-sm">🎯 Daily Puzzle</span>
      </button>
      <button
        class="w-full p-2 text-left rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        on:click={onStartFlashcards}
      >
        <span class="text-sm">🎴 Flashcards</span>
      </button>
      <button
        class="w-full p-2 text-left rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        on:click={onStartWordGames}
      >
        <span class="text-sm">🎮 Word Games</span>
      </button>
    </div>
  </div>

  <!-- Learning Tips -->
  <div class="p-4">
    <h3 class="text-sm font-semibold mb-3 text-gray-800 dark:text-white">
      Learning Tips
    </h3>
    <div class="tips-container">
      <div class="tips-wrapper">
        {#each [...tips, ...tips] as tip}
          <div class="tip-item">
            <div class="text-sm text-yellow-800 dark:text-yellow-200">
              💡 {tip}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .tips-container {
    height: 480px;
    overflow: hidden;
    position: relative;
    mask-image: linear-gradient(
      to bottom,
      transparent,
      black 5%,
      black 95%,
      transparent
    );
  }

  .tips-wrapper {
    animation: scroll 60s linear infinite;
    will-change: transform;
  }

  .tip-item {
    @apply bg-yellow-50/80 dark:bg-yellow-900/20 rounded-lg p-3 mb-2;
    min-height: 70px;
    opacity: 0.9;
    transition: all 0.3s ease;
  }

  .tip-item:hover {
    opacity: 1;
    transform: scale(1.02);
  }

  @keyframes scroll {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }

  .tips-wrapper:hover {
    animation-play-state: paused;
  }
</style>
