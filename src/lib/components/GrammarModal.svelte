<script lang="ts">
  export let onClose: () => void;
  export let selectedLevel: string;
  export let selectedTopic: string;
  export let onSelectLevel: (level: string) => void;
  export let onSelectTopic: (topic: string) => void;
</script>

<div class="modal-overlay" on:click={onClose}>
  <div class="modal-content" on:click|stopPropagation>
    <div class="modal-header">
      <h3 class="text-lg font-semibold">Grammar Exercises</h3>
      <button class="modal-close" on:click={onClose}>×</button>
    </div>
    <div class="modal-body">
      <div class="p-4 space-y-4">
        <div class="exercise-levels">
          <button 
            class="level-button beginner {selectedLevel === 'Beginner' ? 'active' : ''}"
            on:click={() => onSelectLevel('Beginner')}
          >
            <span class="level-icon">🌱</span>
            <span class="level-text">Beginner</span>
          </button>
          <button 
            class="level-button intermediate {selectedLevel === 'Intermediate' ? 'active' : ''}"
            on:click={() => onSelectLevel('Intermediate')}
          >
            <span class="level-icon">🌿</span>
            <span class="level-text">Intermediate</span>
          </button>
          <button 
            class="level-button advanced {selectedLevel === 'Advanced' ? 'active' : ''}"
            on:click={() => onSelectLevel('Advanced')}
          >
            <span class="level-icon">🌳</span>
            <span class="level-text">Advanced</span>
          </button>
        </div>
        <div class="grammar-topics">
          <button 
            class="grammar-topic {selectedTopic === 'Present Tense' ? 'active' : ''}"
            on:click={() => onSelectTopic('Present Tense')}
          >
            <span class="topic-icon">🕒</span>
            <span class="topic-text">Present Tense</span>
          </button>
          <button 
            class="grammar-topic {selectedTopic === 'Past Tense' ? 'active' : ''}"
            on:click={() => onSelectTopic('Past Tense')}
          >
            <span class="topic-icon">⏰</span>
            <span class="topic-text">Past Tense</span>
          </button>
          <button 
            class="grammar-topic {selectedTopic === 'Future Tense' ? 'active' : ''}"
            on:click={() => onSelectTopic('Future Tense')}
          >
            <span class="topic-icon">📅</span>
            <span class="topic-text">Future Tense</span>
          </button>
          <button 
            class="grammar-topic {selectedTopic === 'Conditionals' ? 'active' : ''}"
            on:click={() => onSelectTopic('Conditionals')}
          >
            <span class="topic-icon">🔄</span>
            <span class="topic-text">Conditionals</span>
          </button>
        </div>
        {#if selectedLevel && selectedTopic}
          <button class="start-exercise-button">
            Start Exercise
          </button>
        {/if}
      </div>
    </div>
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
