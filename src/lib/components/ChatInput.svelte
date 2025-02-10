<script lang="ts">
  export let handleSubmit: (message: string) => void;
  export let isLoading: boolean;

  let inputMessage = "";

  function onSubmit(event: Event) {
    event.preventDefault();
    const trimmedMessage = inputMessage.trim();
    if (trimmedMessage) {
      handleSubmit(trimmedMessage);
      inputMessage = "";
    }
  }
</script>

<div class="fixed bottom-12 left-0 right-0 px-4 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
  <form on:submit={onSubmit} class="max-w-4xl mx-auto">
    <div class="flex gap-2">
      <div class="flex-1 relative">
        <input
          type="text"
          bind:value={inputMessage}
          placeholder="Type your message..."
          class="w-full px-4 py-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base text-gray-900 dark:text-gray-100"
          on:keydown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !isLoading) {
              e.preventDefault();
              const trimmedMessage = inputMessage.trim();
              if (trimmedMessage) {
                handleSubmit(trimmedMessage);
                inputMessage = "";
              }
            }
          }}
        />
      </div>
      <button
        type="submit"
        class="px-2 bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 text-white rounded-lg hover:from-primary-500 hover:to-primary-700 dark:hover:from-primary-600 dark:hover:to-primary-800 disabled:opacity-50 disabled:hover:from-primary-400 disabled:hover:to-primary-600 transition-all flex items-center justify-center shadow-lg"
        disabled={isLoading || !inputMessage.trim()}
      >
        {#if isLoading}
          <span class="inline-block animate-spin">⟳</span>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        {/if}
      </button>
    </div>
  </form>
</div>
