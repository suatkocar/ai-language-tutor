<script lang="ts">
  import { fade, scale, fly } from "svelte/transition";
  import { onMount } from "svelte";
  import confetti from "canvas-confetti";
  import {
    frenchQuestions,
    type TestQuestion,
    determineLevel,
    getFeedback,
  } from "$lib/data/frenchTest";
  import { proficiencyLevel } from "$lib/stores";

  export let showModal: boolean = false;
  export let onClose: () => void;

  let currentQuestionIndex = 0;
  let answers: string[] = [];
  let showFeedback = false;
  let determinedLevel: "Beginner" | "Intermediate" | "Advanced" = "Beginner";
  let feedbackMessage = "";
  let correctAnswers = 0;
  let showAnswer = false;
  let explanationText = "";
  let shuffledOptions: string[][] = [];

  $: currentQuestion = frenchQuestions[currentQuestionIndex];
  $: isLastQuestion = currentQuestionIndex === frenchQuestions.length - 1;
  $: isFirstQuestion = currentQuestionIndex === 0;

  function handleAnswer(answer: string) {
    if (showAnswer) return; // Prevent multiple answers
    answers[currentQuestionIndex] = answer;
    showAnswer = true;

    if (answer === currentQuestion.correctAnswer) {
      correctAnswers++;
      explanationText = currentQuestion.explanation || "Correct! Well done!";
    } else {
      explanationText =
        currentQuestion.explanation ||
        `The correct answer is "${currentQuestion.correctAnswer}". Keep practicing!`;
    }
  }

  function previousQuestion() {
    if (!isFirstQuestion) {
      currentQuestionIndex--;
      showAnswer = true;
      explanationText =
        answers[currentQuestionIndex] === currentQuestion.correctAnswer
          ? currentQuestion.explanation || "Correct! Well done!"
          : currentQuestion.explanation ||
            `The correct answer is "${currentQuestion.correctAnswer}". Keep practicing!`;
    }
  }

  function nextQuestion() {
    if (isLastQuestion) {
      finishTest();
    } else {
      currentQuestionIndex++;
      showAnswer = false;
      explanationText = "";
    }
  }

  function finishTest() {
    determinedLevel = determineLevel(correctAnswers);
    feedbackMessage = getFeedback(determinedLevel);
    showFeedback = true;
  }

  function confirmLevel() {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    $proficiencyLevel = determinedLevel;
    onClose();
  }

  function resetTest() {
    currentQuestionIndex = 0;
    answers = [];
    showFeedback = false;
    correctAnswers = 0;
    showAnswer = false;
    explanationText = "";
    initializeShuffledOptions();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      onClose();
    }
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function shuffleArray<T>(array: T[]): T[] {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function initializeShuffledOptions() {
    shuffledOptions = frenchQuestions.map((q) => shuffleArray([...q.options]));
  }

  onMount(() => {
    document.addEventListener("keydown", handleKeydown);
    initializeShuffledOptions();
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });

  $: if (showModal) {
    initializeShuffledOptions();
  }
</script>

{#if showModal}
  <div class="modal-backdrop" transition:fade on:click={handleBackdropClick}>
    <div class="modal-container" transition:scale>
      <div class="modal-content">
        <button class="close-button" on:click={onClose}>×</button>

        {#if !showFeedback}
          <div class="question-container">
            <div class="progress-bar">
              <div
                class="progress-fill"
                style="width: {((currentQuestionIndex + 1) /
                  frenchQuestions.length) *
                  100}%"
              ></div>
            </div>

            <h2 class="text-xl font-semibold mb-6">
              Question {currentQuestionIndex + 1} of {frenchQuestions.length}
            </h2>

            <div class="question-content">
              <p class="text-lg mb-6">{currentQuestion.question}</p>
              {#if currentQuestion.context}
                <div class="context-box mb-4">
                  {currentQuestion.context}
                </div>
              {/if}
            </div>

            <div class="options-grid">
              {#each shuffledOptions[currentQuestionIndex] as option}
                <button
                  class="option-button
                    {answers[currentQuestionIndex] === option ? 'selected' : ''}
                    {showAnswer && option === currentQuestion.correctAnswer
                    ? 'correct'
                    : ''}
                    {showAnswer &&
                  answers[currentQuestionIndex] === option &&
                  option !== currentQuestion.correctAnswer
                    ? 'incorrect'
                    : ''}"
                  on:click={() => handleAnswer(option)}
                  disabled={showAnswer}
                >
                  {option}
                </button>
              {/each}
            </div>

            {#if showAnswer}
              <div
                class="explanation-box"
                class:correct={answers[currentQuestionIndex] ===
                  currentQuestion.correctAnswer}
              >
                {explanationText}
              </div>

              <div class="navigation-buttons">
                <button
                  class="nav-button"
                  on:click={previousQuestion}
                  disabled={isFirstQuestion}
                >
                  Previous
                </button>
                <button class="nav-button primary" on:click={nextQuestion}>
                  {isLastQuestion ? "Finish Test" : "Next Question"}
                </button>
              </div>
            {/if}
          </div>
        {:else}
          <div class="feedback-container">
            <h2 class="text-2xl font-semibold mb-4">Test Complete!</h2>
            <p class="text-lg mb-6">
              Based on your answers, your French level is:
            </p>
            <div class="level-badge">{determinedLevel}</div>
            <p class="score-text">
              Score: {correctAnswers} out of {frenchQuestions.length}
            </p>
            <p class="feedback-message">{feedbackMessage}</p>
            <div class="button-group">
              <button class="secondary-button" on:click={resetTest}
                >Retake Test</button
              >
              <button class="primary-button" on:click={confirmLevel}
                >Confirm Level</button
              >
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    @apply fixed inset-0 bg-black/50 flex items-center justify-center z-50;
  }

  .modal-container {
    @apply bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-3xl w-full mx-4 relative;
  }

  .modal-content {
    @apply p-8;
  }

  .close-button {
    @apply absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-gray-700 
           dark:text-gray-400 dark:hover:text-gray-200 transition-colors;
  }

  .progress-bar {
    @apply w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden;
  }

  .progress-fill {
    @apply h-full bg-primary-500 transition-all duration-300;
  }

  .question-container {
    @apply text-center;
  }

  .question-content {
    @apply mb-8;
  }

  .context-box {
    @apply bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-300;
  }

  .options-grid {
    @apply grid grid-cols-1 gap-4 max-w-xl mx-auto mb-6;
  }

  .option-button {
    @apply px-6 py-4 rounded-lg border border-gray-200 dark:border-gray-700 
           hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
           text-left text-gray-800 dark:text-gray-200 relative;
  }

  .option-button.selected {
    @apply border-primary-500;
  }

  .option-button.correct {
    @apply bg-green-50 dark:bg-green-900 dark:bg-opacity-20 border-green-500 text-green-700 dark:text-green-300;
  }

  .option-button.incorrect {
    @apply bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border-red-500 text-red-700 dark:text-red-300;
  }

  .explanation-box {
    @apply mt-6 p-4 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 
           text-gray-600 dark:text-gray-300 max-w-xl mx-auto;
  }

  .explanation-box.correct {
    @apply bg-green-50 dark:bg-green-900 dark:bg-opacity-20 text-green-700 dark:text-green-300;
  }

  .navigation-buttons {
    @apply flex justify-center gap-4 mt-6;
  }

  .nav-button {
    @apply px-6 py-2 rounded-lg border border-gray-200 dark:border-gray-700
           hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
           disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .nav-button.primary {
    @apply bg-primary-500 text-white border-transparent
           hover:bg-primary-600 dark:hover:bg-primary-600;
  }

  .feedback-container {
    @apply text-center;
  }

  .level-badge {
    @apply inline-block px-6 py-2 rounded-full bg-primary-500 text-white font-semibold mb-4;
  }

  .score-text {
    @apply text-lg font-medium text-gray-700 dark:text-gray-300 mb-4;
  }

  .feedback-message {
    @apply text-gray-600 dark:text-gray-300 mb-8;
  }

  .button-group {
    @apply flex gap-4 justify-center;
  }

  .primary-button {
    @apply px-6 py-2 rounded-lg bg-primary-500 text-white 
           hover:bg-primary-600 transition-colors;
  }

  .secondary-button {
    @apply px-6 py-2 rounded-lg border border-gray-200 dark:border-gray-700
           hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors;
  }

  :global(.level-selector) {
    transition: all 0.3s ease;
  }

  :global(.level-selector.highlight) {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(var(--color-primary-500), 0.5);
    border-color: rgb(var(--color-primary-500));
  }
</style>
