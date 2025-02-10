<script lang="ts">
  import { fade, scale, fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import confetti from "canvas-confetti";
  import { onMount } from "svelte";

  export let showModal: boolean = false;
  export let onClose: () => void;

  let currentCardIndex = 0;
  let isFlipped = false;
  let userInput = "";
  let attempts = 3;
  let showFeedback = false;
  let isCorrect = false;
  let timeRemaining = 3;
  let timer: ReturnType<typeof setInterval>;
  let showFullDetails = false;

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  const flashcards = [
    {
      word: "Bonjour",
      pronunciation: "/bɔ̃.ʒuʁ/",
      meaning: "Hello/Good morning",
      example: "Bonjour! Comment allez-vous?",
    },
    {
      word: "Merci",
      pronunciation: "/mɛʁ.si/",
      meaning: "Thank you",
      example: "Merci beaucoup!",
    },
  ];

  $: currentCard = flashcards[currentCardIndex];

  function startTimer() {
    clearInterval(timer);
    timeRemaining = 3;
    isFlipped = false;
    showFullDetails = false;

    timer = setInterval(() => {
      timeRemaining -= 0.1;
      if (timeRemaining <= 0) {
        clearInterval(timer);
        isFlipped = true;
      }
    }, 100);
  }

  function resetCard() {
    isFlipped = false;
    userInput = "";
    attempts = 3;
    showFeedback = false;
    showFullDetails = false;
    startTimer();
  }

  function checkAnswer() {
    isCorrect = userInput.toLowerCase() === currentCard.word.toLowerCase();
    showFeedback = true;

    if (isCorrect) {
      showFullDetails = true;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        nextCard();
      }, 3000);
    } else {
      attempts--;
      if (attempts === 0) {
        showFullDetails = true;
        setTimeout(() => {
          nextCard();
        }, 3000);
      }
    }
  }

  function nextCard() {
    if (currentCardIndex < flashcards.length - 1) {
      currentCardIndex++;
      resetCard();
    } else {
      onClose();
    }
  }

  function previousCard() {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      resetCard();
    }
  }

  onMount(() => {
    startTimer();
    return () => clearInterval(timer);
  });
</script>

<div 
  class="modal-backdrop" 
  transition:fade 
  on:keydown={handleKeydown} 
  tabindex="-1" 
  role="dialog" 
  aria-modal="true" 
  aria-labelledby="flashcard-modal-title"
>
  <div 
    class="modal-container" 
    transition:scale 
    role="document"
  >
    <div class="modal-content">
      <button 
        class="close-button" 
        on:click={onClose} 
        aria-label="Close modal"
      >×</button>

      <h2 id="flashcard-modal-title" class="text-xl font-semibold mb-6 text-center">Flashcards</h2>

      <div class="progress-bar mb-6">
        <div
          class="progress-fill"
          style="width: {((currentCardIndex + 1) / flashcards.length) * 100}%"
        ></div>
      </div>

      <!-- Timer bar -->
      {#if !isFlipped}
        <div class="timer-bar mb-4">
          <div
            class="timer-fill"
            style="width: {(timeRemaining / 3) * 100}%"
          ></div>
        </div>
      {/if}

      <!-- Flashcard -->
      <div class="flashcard {isFlipped ? 'flipped' : ''}">
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <div class="text-2xl font-bold mb-2">{currentCard.word}</div>
          </div>
          <div class="flashcard-back">
            <div class="text-xl font-medium mb-2">{currentCard.meaning}</div>
            {#if showFullDetails}
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {currentCard.pronunciation}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 italic">
                "{currentCard.example}"
              </div>
            {/if}
          </div>
        </div>
      </div>

      <!-- Input Section -->
      <div class="mt-8">
        <div class="text-center mb-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Type the word you just saw:
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-500">
            {attempts} attempts remaining
          </p>
        </div>

        <div class="flex gap-2">
          <input
            type="text"
            bind:value={userInput}
            placeholder="Type here..."
            class="flex-1 input-field"
            disabled={!isFlipped || showFullDetails}
          />
          <button 
            class="check-button" 
            on:click={checkAnswer} 
            disabled={!userInput.trim() || !isFlipped || showFullDetails}
          >
            Check
          </button>
        </div>

        {#if showFeedback}
          <div
            class="feedback-message"
            class:correct={isCorrect}
            transition:fade
          >
            {#if isCorrect}
              Correct! 🎉
            {:else if attempts > 0}
              Try again! ({attempts} attempts left)
            {:else}
              The correct word was: {currentCard.word}
            {/if}
          </div>
        {/if}
      </div>

      <!-- Navigation -->
      <div class="flex justify-between mt-8">
        <button 
          class="nav-button" 
          on:click={previousCard} 
          disabled={currentCardIndex === 0}
        >
          Previous
        </button>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          {currentCardIndex + 1} / {flashcards.length}
        </div>
        <button 
          class="nav-button" 
          on:click={nextCard} 
          disabled={currentCardIndex === flashcards.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .modal-backdrop {
    @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50;
  }

  .modal-container {
    @apply bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 relative;
  }

  .modal-content {
    @apply p-8;
  }

  .close-button {
    @apply absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-gray-700 
           dark:text-gray-400 dark:hover:text-gray-200 transition-colors;
  }

  .progress-bar {
    @apply w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden;
  }

  .progress-fill {
    @apply h-full bg-primary-500 transition-all duration-300;
  }

  .flashcard {
    @apply w-full aspect-[3/2] perspective-1000 cursor-pointer;
  }

  .flashcard-inner {
    @apply relative w-full h-full transition-transform duration-500 transform-style-3d;
  }

  .flashcard.flipped .flashcard-inner {
    transform: rotateY(180deg);
  }

  .flashcard-front,
  .flashcard-back {
    @apply absolute inset-0 backface-hidden bg-white dark:bg-gray-700 rounded-xl p-6
           flex flex-col items-center justify-center text-center
           border-2 border-gray-200 dark:border-gray-600;
  }

  .flashcard-back {
    transform: rotateY(180deg);
  }

  .input-field {
    @apply px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
           bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
           focus:ring-2 focus:ring-primary-500 focus:border-transparent;
  }

  .check-button {
    @apply px-4 py-2 bg-primary-500 text-white rounded-lg
           hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed
           transition-colors;
  }

  .nav-button {
    @apply px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
           hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50
           disabled:cursor-not-allowed transition-colors;
  }

  .feedback-message {
    @apply text-center text-sm font-medium mt-4;
  }

  .feedback-message.correct {
    @apply text-green-600 dark:text-green-400;
  }

  :global(.perspective-1000) {
    perspective: 1000px;
  }

  :global(.transform-style-3d) {
    transform-style: preserve-3d;
  }

  :global(.backface-hidden) {
    backface-visibility: hidden;
  }

  .timer-bar {
    @apply w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden;
  }

  .timer-fill {
    @apply h-full bg-primary-500 transition-all duration-100;
  }
</style>
