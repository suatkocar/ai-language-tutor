<script lang="ts">
  import { fade } from 'svelte/transition';
  
  export let suggestions: string[];
  export let onSuggestionClick: (suggestion: string) => void;
</script>

<div class="suggestions mb-4">
  {#each suggestions as suggestion}
    <button
      class="suggestion-chip"
      on:click={() => onSuggestionClick(suggestion)}
      in:fade={{ duration: 200 }}
    >
      {suggestion}
    </button>
  {/each}
</div>

<style>
  .suggestions {
    @apply flex flex-wrap gap-2 justify-center max-w-4xl mx-auto px-2 py-3;
  }

  .suggestion-chip {
    @apply px-3 py-1.5 text-sm bg-white dark:bg-gray-800 rounded-full 
           border border-gray-200 dark:border-gray-700 
           hover:bg-gray-100 dark:hover:bg-gray-700 
           transition-colors shadow-sm hover:shadow;
  }
</style>
