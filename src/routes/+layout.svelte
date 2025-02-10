<script lang="ts">
  import "../app.css";
  import { darkMode } from '$lib/stores';
</script>

<div class="h-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
  <slot />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    @apply bg-gray-50 dark:bg-gray-900 transition-colors duration-200;
  }

  :global(html) {
    @apply bg-gray-50 dark:bg-gray-900 transition-colors duration-200;
  }
</style>
