<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<div class="message ai-message" in:fade>
  <div class="loading-indicator">
    <div class="loading-dot" />
    <div class="loading-dot" />
    <div class="loading-dot" />
  </div>
</div>

<style>
  .loading-indicator {
    @apply flex gap-1;
  }

  .loading-dot {
    @apply w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce;
  }

  .loading-dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .loading-dot:nth-child(3) {
    animation-delay: 0.4s;
  }
</style>
