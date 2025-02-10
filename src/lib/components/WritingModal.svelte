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
  aria-labelledby="writing-modal-title"
>
  <div 
    class="modal-content bg-white rounded-lg p-6 max-w-2xl w-full mx-4"
    role="document"
  >
    <header class="modal-header flex justify-between items-center mb-4">
      <h2 id="writing-modal-title" class="text-lg font-semibold">Writing Workshop</h2>
      <button 
        class="modal-close text-gray-500 hover:text-gray-700" 
        on:click={onClose}
        aria-label="Close modal"
      >×</button>
    </header>
    <main class="modal-body space-y-4">
      <div class="writing-prompts grid grid-cols-2 gap-4" role="group" aria-label="Writing topics">
        {#each topics as topic}
          <button 
            class="writing-prompt p-4 rounded-lg border {selectedTopic === topic.title ? 'border-blue-500' : 'border-gray-200'}"
            on:click={() => onSelectTopic(topic.title)}
            aria-pressed={selectedTopic === topic.title}
          >
            <span class="topic-icon text-2xl" aria-hidden="true">{topic.icon}</span>
            <span class="topic-text block mt-2">{topic.title}</span>
          </button>
        {/each}
      </div>

      {#if selectedTopic}
        <div class="writing-area">
          <label for="writing-content" class="block text-sm font-medium text-gray-700 mb-2">
            Write your {selectedTopic.toLowerCase()} here:
          </label>
          <textarea
            id="writing-content"
            bind:value={writingContent}
            class="w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Start writing..."
            aria-label="Writing content area"
          ></textarea>
          <div class="mt-4 flex justify-end">
            <button
              class="submit-button px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              on:click={onSubmit}
              disabled={!writingContent}
              aria-disabled={!writingContent}
            >
              Submit
            </button>
          </div>
        </div>
      {/if}
    </main>
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
