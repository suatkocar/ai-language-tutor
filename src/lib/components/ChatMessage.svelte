<script lang="ts">
  import type { Message } from '$lib/types';
  import { fly } from 'svelte/transition';

  export let message: Message;
  export let previousMessage: Message | null = null;
  export let onCopy: (text: string) => Promise<void>;
  export let onRegenerate: (text: string) => Promise<void>;
</script>

<div class="message {message.role === 'user' ? 'user-message' : 'ai-message'}" in:fly={{ y: 20, duration: 300 }}>
  <img
    src={message.role === "user" ? "/avatars/user.svg" : "/avatars/assistant.svg"}
    alt={message.role === "user" ? "User Avatar" : "Assistant Avatar"}
    class="w-8 h-8 rounded-full flex-shrink-0"
  />
  <div class="message-content break-words">
    <p class="whitespace-pre-wrap">{message.content}</p>
    {#if message.role === "assistant"}
      <div class="message-actions">
        <button
          class="action-button"
          on:click={() => onCopy(message.content)}
          title="Copy to clipboard"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>
        {#if previousMessage?.role === "user"}
          <button
            class="action-button"
            on:click={() => onRegenerate(previousMessage.content)}
            title="Regenerate response"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
            </svg>
          </button>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .message {
    @apply flex gap-4 p-4 items-start w-full;
  }

  .user-message {
    background-color: var(--primary-500);
    margin-left: auto;
    margin-right: 1rem;
    max-width: 70%;
    border-radius: 24px;
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }

  .dark .user-message {
    background-color: var(--primary-500);
  }

  .user-message:hover {
    background-color: var(--primary-600);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }

  .ai-message {
    @apply mr-auto max-w-[85%] md:max-w-[70%] text-gray-800 dark:text-gray-200;
  }

  .message-content {
    @apply flex-1 min-w-0 leading-relaxed;
  }

  .message-actions {
    @apply flex gap-2 mt-2 justify-end opacity-0 transition-opacity duration-200;
  }

  .ai-message:hover .message-actions {
    @apply opacity-100;
  }

  .action-button {
    @apply p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300
           hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors;
  }
</style>
