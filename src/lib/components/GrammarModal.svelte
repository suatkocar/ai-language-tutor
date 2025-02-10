<script lang="ts">
  export let onClose: () => void;
  export let selectedLevel: string;
  export let selectedTopic: string;
  export let onSelectLevel: (level: string) => void;
  export let onSelectTopic: (topic: string) => void;

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  // Handle initial focus when modal opens
  import { onMount } from 'svelte';
  let modalContainer: HTMLElement;

  onMount(() => {
    if (modalContainer) {
      const firstButton = modalContainer.querySelector('button');
      if (firstButton) firstButton.focus();
    }
  });
</script>

<div 
  class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  on:keydown={handleKeydown}
  bind:this={modalContainer}
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <div 
    class="modal-content bg-white rounded-lg p-6 max-w-2xl w-full mx-4"
    role="document"
  >
    <header class="modal-header flex justify-between items-center mb-4">
      <h2 id="modal-title" class="text-lg font-semibold">Grammar Exercises</h2>
      <button 
        class="modal-close text-gray-500 hover:text-gray-700" 
        on:click={onClose}
        aria-label="Close modal"
      >×</button>
    </header>
    <main class="modal-body">
      <div class="p-4 space-y-4">
        <div class="exercise-levels" role="group" aria-label="Difficulty levels">
          <button 
            class="level-button beginner {selectedLevel === 'Beginner' ? 'active' : ''}"
            on:click={() => onSelectLevel('Beginner')}
            aria-pressed={selectedLevel === 'Beginner'}
          >
            <span class="level-icon" aria-hidden="true">🌱</span>
            <span class="level-text">Beginner</span>
          </button>
          <button 
            class="level-button intermediate {selectedLevel === 'Intermediate' ? 'active' : ''}"
            on:click={() => onSelectLevel('Intermediate')}
            aria-pressed={selectedLevel === 'Intermediate'}
          >
            <span class="level-icon" aria-hidden="true">🌿</span>
            <span class="level-text">Intermediate</span>
          </button>
          <button 
            class="level-button advanced {selectedLevel === 'Advanced' ? 'active' : ''}"
            on:click={() => onSelectLevel('Advanced')}
            aria-pressed={selectedLevel === 'Advanced'}
          >
            <span class="level-icon" aria-hidden="true">🌳</span>
            <span class="level-text">Advanced</span>
          </button>
        </div>
        <div class="grammar-topics" role="group" aria-label="Grammar topics">
          <button 
            class="grammar-topic {selectedTopic === 'Present Tense' ? 'active' : ''}"
            on:click={() => onSelectTopic('Present Tense')}
            aria-pressed={selectedTopic === 'Present Tense'}
          >
            <span class="topic-icon" aria-hidden="true">🕒</span>
            <span class="topic-text">Present Tense</span>
          </button>
          <button 
            class="grammar-topic {selectedTopic === 'Past Tense' ? 'active' : ''}"
            on:click={() => onSelectTopic('Past Tense')}
            aria-pressed={selectedTopic === 'Past Tense'}
          >
            <span class="topic-icon" aria-hidden="true">⏰</span>
            <span class="topic-text">Past Tense</span>
          </button>
          <button 
            class="grammar-topic {selectedTopic === 'Future Tense' ? 'active' : ''}"
            on:click={() => onSelectTopic('Future Tense')}
            aria-pressed={selectedTopic === 'Future Tense'}
          >
            <span class="topic-icon" aria-hidden="true">📅</span>
            <span class="topic-text">Future Tense</span>
          </button>
          <button 
            class="grammar-topic {selectedTopic === 'Conditionals' ? 'active' : ''}"
            on:click={() => onSelectTopic('Conditionals')}
            aria-pressed={selectedTopic === 'Conditionals'}
          >
            <span class="topic-icon" aria-hidden="true">🔄</span>
            <span class="topic-text">Conditionals</span>
          </button>
        </div>
        {#if selectedLevel && selectedTopic}
          <button class="start-exercise-button">
            Start Exercise
          </button>
        {/if}
      </div>
    </main>
  </div>
</div>

<style>
  /* Existing modal styles */
  .modal-overlay {
    @apply fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50;
  }

  .modal-content {
    @apply bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4 transform transition-all;
    animation: modalSlideUp 0.3s ease-out;
  }

  .modal-header {
    @apply flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700;
  }

  .modal-close {
    @apply text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors;
  }

  /* Grammar exercise specific styles */
  .exercise-levels {
    @apply flex gap-2 mb-4;
  }

  .level-button {
    @apply flex-1 flex flex-col items-center gap-2 p-4 rounded-lg transition-all cursor-pointer;
  }

  .level-button.active {
    @apply ring-2 ring-primary-500 transform scale-105;
  }

  .level-button.beginner {
    @apply bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30;
  }

  .level-button.intermediate {
    @apply bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30;
  }

  .level-button.advanced {
    @apply bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30;
  }

  .grammar-topics {
    @apply grid grid-cols-2 gap-2;
  }

  .grammar-topic {
    @apply flex flex-col items-center gap-2 p-4 
           bg-gray-50 dark:bg-gray-700/50 rounded-lg 
           hover:bg-gray-100 dark:hover:bg-gray-700 
           transition-all cursor-pointer;
  }

  .grammar-topic.active {
    @apply ring-2 ring-primary-500 transform scale-105;
  }

  .start-exercise-button {
    @apply w-full py-3 px-4 mt-4 bg-primary-500 hover:bg-primary-600 
           text-white rounded-lg transition-colors text-center font-medium;
  }
</style>
