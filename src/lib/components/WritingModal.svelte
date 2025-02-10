<script lang="ts">
  export let onClose: () => void;
  export let selectedTopic: string;
  export let writingContent: string;
  export let onSelectTopic: (topic: string) => void;
  export let onSubmit: () => void;

  const topics = [
    { id: 'daily-journal', title: 'Daily Journal', icon: '📝' },
    { id: 'email-writing', title: 'Email Writing', icon: '✉️' },
    { id: 'business-writing', title: 'Business Writing', icon: '💼' },
    { id: 'creative-writing', title: 'Creative Writing', icon: '📖' }
  ];
</script>

<div class="modal-overlay" on:click={onClose}>
  <div class="modal-content" on:click|stopPropagation>
    <div class="modal-header">
      <h3 class="text-lg font-semibold">Writing Workshop</h3>
      <button class="modal-close" on:click={onClose}>×</button>
    </div>
    <div class="modal-body">
      <div class="p-4 space-y-4">
        <div class="writing-prompts">
          {#each topics as topic}
            <button 
              class="writing-prompt {selectedTopic === topic.title ? 'active' : ''}"
              on:click={() => onSelectTopic(topic.title)}
            >
              <span class="topic-icon">{topic.icon}</span>
              <span class="topic-text">{topic.title}</span>
            </button>
          {/each}
        </div>
        {#if selectedTopic}
          <div class="writing-area">
            <textarea
              bind:value={writingContent}
              placeholder="Start writing here..."
              class="writing-input"
              rows="6"
            ></textarea>
            <button 
              class="submit-writing-button"
              on:click={onSubmit}
              disabled={!writingContent.trim()}
            >
              Submit Writing
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
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

  .writing-prompts {
    @apply grid grid-cols-2 gap-2;
  }

  .writing-prompt {
    @apply flex flex-col items-center gap-2 p-4 
           bg-gray-50 dark:bg-gray-700/50 rounded-lg 
           hover:bg-gray-100 dark:hover:bg-gray-700 
           transition-all cursor-pointer;
  }

  .writing-prompt.active {
    @apply ring-2 ring-primary-500 transform scale-105;
  }

  .writing-area {
    @apply space-y-4;
  }

  .writing-input {
    @apply w-full p-4 bg-white dark:bg-gray-800 rounded-lg 
           border border-gray-200 dark:border-gray-700 
           focus:ring-2 focus:ring-primary-500 focus:border-transparent 
           resize-none;
  }

  .submit-writing-button {
    @apply w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 
           text-white rounded-lg transition-colors text-center font-medium
           disabled:opacity-50 disabled:cursor-not-allowed;
  }

  @keyframes modalSlideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
