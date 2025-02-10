<script lang="ts">
  export let isLeftSidebarOpen: boolean;
  export let isRightSidebarOpen: boolean;
  export let darkMode: boolean;
  export let onToggleLeftSidebar: () => void;
  export let onToggleRightSidebar: () => void;
  export let onToggleTheme: () => void;
</script>

<header class="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40 flex items-center justify-between px-4">
  <!-- Left Side -->
  <div class="flex items-center gap-4">
    <button
      class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      on:click={onToggleLeftSidebar}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-600 dark:text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {#if isLeftSidebarOpen}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 4h13v16H8m-5-8h3m-3-4h3m-3 8h3"
          />
        {:else}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 4h-13v16h13m5-8h-3m3-4h-3m3 8h-3"
          />
        {/if}
      </svg>
    </button>
  </div>

  <!-- Center -->
  <h1 class="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
    <div class="app-logo">
      <svg
        class="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    AI Language Tutor
  </h1>

  <!-- Right Side -->
  <div class="flex items-center gap-2">
    <!-- Right Sidebar Toggle -->
    <button
      class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      on:click={onToggleRightSidebar}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-600 dark:text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {#if isRightSidebarOpen}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4h13v16H4m5-8h3m-3-4h3m-3 8h3"
          />
        {:else}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 4h13v16H8m-5-8h3m-3-4h3m-3 8h3"
          />
        {/if}
      </svg>
    </button>
    <!-- Theme Toggle -->
    <button
      class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      on:click={onToggleTheme}
    >
      {#if darkMode}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      {/if}
    </button>
  </div>
</header>

<style>
  .app-logo {
    @apply w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 
           flex items-center justify-center text-white shadow-lg relative overflow-hidden;
  }

  .app-logo svg {
    @apply w-7 h-7;
  }

  button {
    @apply focus:outline-none;
  }

  @media (max-width: 640px) {
    h1 {
      @apply text-base;
    }
    
    .app-logo {
      @apply w-7 h-7;
    }
    
    .app-logo svg {
      @apply w-6 h-6;
    }
  }
</style>
