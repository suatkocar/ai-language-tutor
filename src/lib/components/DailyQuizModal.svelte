<script lang="ts">
  import { fade, scale, fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { spring } from "svelte/motion";
  import confetti from "canvas-confetti";

  export let showModal: boolean = false;
  export let onClose: () => void;

  let currentQuestion = 0;
  let score = 0;
  let draggedLetter: string | null = null;
  let isCorrect = false;
  let showFeedback = false;
  let isQuizComplete = false;

  const questions = [
    {
      word: "Bonjour",
      hint: "Good morning/Hello",
      letters: shuffleArray(["B", "O", "N", "J", "O", "U", "R"]),
      slots: ["", "", "", "", "", "", ""],
      solution: ["B", "O", "N", "J", "O", "U", "R"],
    },
    {
      word: "Merci",
      hint: "Thank you",
      letters: shuffleArray(["M", "E", "R", "C", "I"]),
      slots: ["", "", "", "", ""],
      solution: ["M", "E", "R", "C", "I"],
    },
  ];

  let currentQuestionData = questions[0];

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function checkSlot(slot: string, index: number) {
    return slot === currentQuestionData.solution[index];
  }

  $: {
    currentQuestionData = questions[currentQuestion];
    const allCorrect = currentQuestionData?.slots.every(
      (slot, index) =>
        slot !== "" && slot === currentQuestionData.solution[index]
    );

    if (allCorrect && !showFeedback) {
      
      showFeedback = true;
      isCorrect = true;
      score++;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          currentQuestion++;
          showFeedback = false;
          isCorrect = false;
        } else {
          isQuizComplete = true;
          confetti({
            particleCount: 200,
            spread: 160,
            origin: { y: 0.6 },
          });
        }
      }, 2000);
    }
  }

  function handleDragStart(letter: string, index: number) {
    draggedLetter = letter;
  }

  function handleSlotClick(slotIndex: number) {
    if (currentQuestionData.slots[slotIndex] !== "") {
      currentQuestionData.slots[slotIndex] = "";
      showFeedback = false;
      isCorrect = false;
    }
  }

  function handleDrop(event: DragEvent, slotIndex: number) {
    event.preventDefault();
    if (draggedLetter && currentQuestionData.slots[slotIndex] === "") {
      currentQuestionData.slots[slotIndex] = draggedLetter;
      draggedLetter = null;
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function resetQuestion() {
    currentQuestionData.slots = new Array(currentQuestionData.word.length).fill(
      ""
    );
    currentQuestionData.letters = shuffleArray([
      ...currentQuestionData.solution,
    ]);
    showFeedback = false;
    isCorrect = false;
  }
</script>

<div class="modal-backdrop" transition:fade on:click|self={onClose}>
  <div class="modal-container" transition:scale>
    <div class="modal-content">
      <button class="close-button" on:click={onClose}>×</button>

      <h2 class="text-xl font-semibold mb-6 text-center">Daily Word Puzzle</h2>

      <div class="progress-bar mb-6">
        <div
          class="progress-fill"
          style="width: {((currentQuestion + 1) / questions.length) * 100}%"
        ></div>
      </div>

      <div class="text-center mb-8">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Drag and drop the letters to form the word: <br />
          <span class="font-medium text-primary-600"
            >{currentQuestionData.hint}</span
          >
        </p>
      </div>

      <!-- Letter slots -->
      <div class="flex justify-center gap-2 mb-8">
        {#each currentQuestionData.slots as slot, i (i)}
          <div
            class="letter-slot"
            on:dragover={handleDragOver}
            on:drop={(e) => handleDrop(e, i)}
            on:click={() => handleSlotClick(i)}
            class:filled={slot !== ""}
          >
            {#if slot}
              <div
                class="letter"
                class:correct={checkSlot(slot, i)}
                class:incorrect={!checkSlot(slot, i)}
                transition:fade
              >
                {slot}
              </div>
            {/if}
          </div>
        {/each}
      </div>

      <!-- Available letters -->
      <div class="flex justify-center gap-2 mb-8">
        {#each currentQuestionData.letters as letter, i}
          <div
            class="letter"
            draggable="true"
            on:dragstart={() => handleDragStart(letter, i)}
          >
            {letter}
          </div>
        {/each}
      </div>

      {#if showFeedback}
        <div class="feedback-message" class:correct={isCorrect} transition:fade>
          {#if isQuizComplete}
            <div class="final-message">
              <h3 class="text-xl font-bold mb-2">Congratulations! 🎉</h3>
              <p>
                You've completed the quiz with a score of {score}/{questions.length}!
              </p>
            </div>
          {:else}
            {isCorrect ? "Correct! Moving to next word... 🎉" : "Try again!"}
          {/if}
        </div>
      {/if}

      <div class="flex justify-between items-center mt-8">
        <button class="secondary-button" on:click={resetQuestion}>
          Reset
        </button>
        <div class="score">
          Score: {score}/{questions.length}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .modal-backdrop {
    @apply fixed inset-0 bg-black/50 flex items-center justify-center z-50;
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

  .letter-slot {
    @apply w-12 h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 
           rounded-lg flex items-center justify-center cursor-pointer
           hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors;
  }

  .letter-slot.filled {
    @apply border-solid border-primary-500 dark:border-primary-400;
  }

  .letter {
    @apply w-10 h-10 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300
           rounded-lg flex items-center justify-center font-bold cursor-move
           hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors;
  }

  .feedback-message {
    @apply text-center text-lg font-medium mt-4;
  }

  .feedback-message.correct {
    @apply text-green-600 dark:text-green-400;
  }

  .score {
    @apply text-lg font-medium text-primary-600 dark:text-primary-400;
  }

  .secondary-button {
    @apply px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
           hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors;
  }

  .letter.correct {
    @apply bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300
           border-green-500 dark:border-green-400;
  }

  .letter.incorrect {
    @apply bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300
           border-red-500 dark:border-red-400;
  }

  .final-message {
    @apply text-center bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-4 rounded-lg
           border border-green-200 dark:border-green-800;
  }
</style>
