<script lang="ts">
  import { fly } from 'svelte/transition';
  import type { Conversation } from '$lib/types';

  export let activeCategory: string;
  export let conversations: Conversation[];
  export let currentConversation: Conversation | null;
  export let currentlySwipedId: string | null;
  export let onCategoryClick: (category: string) => void;
  export let onConversationClick: (conv: Conversation) => void;
  export let onDeleteConversation: (id: string) => void;
  export let startNewConversation: () => void;

  let touchStart = 0;
  let mouseStart = 0;
  let wheelTimeout: number | null = null;
  let wheelDelta = 0;

  function handleTouchStart(event: TouchEvent, id: string) {
    touchStart = event.touches[0].clientX;
  }

  function handleTouchMove(event: TouchEvent, id: string) {
    const touchEnd = event.touches[0].clientX;
    const diff = touchStart - touchEnd;
    handleSwipe(diff, id);
  }

  function handleMouseDown(event: MouseEvent, id: string) {
    mouseStart = event.clientX;
    const target = event.target as HTMLElement;
    target.style.cursor = "grabbing";
  }

  function handleMouseMove(event: MouseEvent, id: string) {
    if (mouseStart === 0) return;
    const mouseEnd = event.clientX;
    const diff = mouseStart - mouseEnd;
    handleSwipe(diff, id);
  }

  function handleMouseUp(event: MouseEvent, id: string) {
    mouseStart = 0;
    const target = event.target as HTMLElement;
    target.style.cursor = "default";
  }

  function handleTouchEnd(id: string) {
    touchStart = 0;
  }

  function handleWheel(event: WheelEvent, id: string) {
    event.preventDefault();

    wheelDelta += event.deltaX;

    if (wheelTimeout) {
      clearTimeout(wheelTimeout);
    }

    const wheelSensitivity = 5;
    if (Math.abs(wheelDelta) > wheelSensitivity) {
      currentlySwipedId = wheelDelta < 0 ? id : null;
    }

    wheelTimeout = window.setTimeout(() => {
      wheelDelta = 0;
    }, 30);
  }

  function handleSwipe(diff: number, id: string) {
    const swipeSensitivity = 0.3;
    const swipePosition = diff * 4;

    if (Math.abs(swipePosition) > swipeSensitivity) {
      currentlySwipedId = swipePosition < 0 ? id : null;
    }
  }
</script>

<div
  transition:fly={{ x: -300, duration: 600 }}
  class="fixed top-14 left-0 w-48 md:w-64 sm:w-48 h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto z-30"
>
  <!-- Categories -->
  <div class="p-4 border-b border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-sm font-medium dark:text-white">Categories</h2>
      <button
        class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        on:click={startNewConversation}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <div class="space-y-1">
      <button 
        class="category-button {activeCategory === 'chat' ? 'active' : ''}"
        on:click|preventDefault={() => onCategoryClick('chat')}
      >
        <span class="category-icon">💬</span>
        <span class="category-text">Chat Practice</span>
      </button>
      <button 
        class="category-button {activeCategory === 'speaking' ? 'active' : ''}"
        on:click|preventDefault={() => onCategoryClick('speaking')}
      >
        <span class="category-icon">🗣️</span>
        <span class="category-text">Speaking Practice</span>
        <span class="ml-auto text-xs text-primary-500 dark:text-primary-400">New!</span>
      </button>
      <button 
        class="category-button {activeCategory === 'grammar' ? 'active' : ''}"
        on:click|preventDefault={() => onCategoryClick('grammar')}
      >
        <span class="category-icon">📚</span>
        <span class="category-text">Grammar Exercises</span>
        <span class="ml-auto text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded-full">Beta</span>
      </button>
      <button 
        class="category-button {activeCategory === 'writing' ? 'active' : ''}"
        on:click|preventDefault={() => onCategoryClick('writing')}
      >
        <span class="category-icon">📝</span>
        <span class="category-text">Writing Workshop</span>
        <span class="ml-auto text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded-full">Beta</span>
      </button>
    </div>
  </div>

  <!-- Learning Journey -->
  <div class="p-4 border-b border-gray-200 dark:border-gray-700">
    <h2 class="text-sm font-medium dark:text-white mb-4">
      Learning Journey
    </h2>
    <div class="relative">
      <div
        class="absolute left-4 h-full w-0.5 bg-gray-200 dark:bg-gray-700"
      ></div>
      <div class="space-y-4">
        <div class="relative flex items-center">
          <div
            class="absolute left-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center"
          >
            <span class="text-xs">🎯</span>
          </div>
          <div class="ml-12">
            <div class="text-xs font-medium">Started Learning</div>
            <div class="text-xs text-gray-500">2 days ago</div>
          </div>
        </div>
        <div class="relative flex items-center">
          <div
            class="absolute left-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center"
          >
            <span class="text-xs">🏆</span>
          </div>
          <div class="ml-12">
            <div class="text-xs font-medium">First Conversation</div>
            <div class="text-xs text-gray-500">Yesterday</div>
          </div>
        </div>
        <div class="relative flex items-center">
          <div
            class="absolute left-0 w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center"
          >
            <span class="text-xs">⭐</span>
          </div>
          <div class="ml-12">
            <div class="text-xs font-medium">Level Test Completed</div>
            <div class="text-xs text-gray-500">Today</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Recent Conversations -->
  <div class="flex-1 overflow-y-auto p-4 h-[calc(100vh-16rem)] overscroll-contain">
    <h2 class="text-sm font-medium dark:text-white mb-4 sticky top-0 bg-white dark:bg-gray-800">
      Recent Conversations
    </h2>
    <div class="space-y-2 overflow-y-auto touch-pan-y">
      {#each conversations as conv}
        <div
          class="conversation-item relative {currentlySwipedId === conv.id ? 'swiped' : ''}"
          role="button"
          tabindex="0"
          on:touchstart={(e) => handleTouchStart(e, conv.id)}
          on:touchmove={(e) => handleTouchMove(e, conv.id)}
          on:touchend={() => handleTouchEnd(conv.id)}
          on:mousedown={(e) => handleMouseDown(e, conv.id)}
          on:mousemove={(e) => handleMouseMove(e, conv.id)}
          on:mouseup={(e) => handleMouseUp(e, conv.id)}
          on:mouseleave={() => { mouseStart = 0; }}
          on:wheel|preventDefault={(e) => handleWheel(e, conv.id)}
          on:keydown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onConversationClick(conv);
            }
          }}
        >
          <button
            class="w-full p-3 text-left rounded-lg transition-colors {currentConversation?.id === conv.id
              ? 'bg-primary-100 dark:bg-gray-700/60'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'}"
            on:click={() => onConversationClick(conv)}
          >
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center"
              >
                <span class="text-sm">💬</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">{conv.title}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(parseInt(conv.id)).toLocaleDateString()}
                </p>
              </div>
            </div>
          </button>
          <button
            class="delete-action"
            on:click|stopPropagation={() => onDeleteConversation(conv.id)}
            role="button"
            tabindex="0"
            on:keydown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onDeleteConversation(conv.id);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .category-button {
    @apply w-full px-3 py-2 text-left rounded-lg flex items-center gap-2 text-gray-700 dark:text-gray-300
           hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;
  }

  .category-button.active {
    @apply bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 text-primary-600 dark:text-primary-400;
  }

  .category-icon {
    @apply text-lg;
  }

  .category-text {
    @apply text-sm;
  }

  .conversation-item {
    @apply relative overflow-hidden;
    touch-action: pan-x pan-y;
    cursor: pointer;
    user-select: none;
  }

  .delete-action {
    @apply absolute top-0 right-0 h-full bg-red-500 flex items-center justify-center w-16 transform translate-x-full cursor-pointer hover:bg-red-600 transition-colors;
    -webkit-tap-highlight-color: transparent;
    transition: transform 0.05s ease-out;
  }

  .delete-action:hover {
    @apply bg-red-600;
  }

  .delete-action:active {
    @apply bg-red-700;
  }

  .conversation-item.swiped .delete-action {
    transform: translateX(0);
  }

  .conversation-item.swiped button:first-child {
    transform: translateX(-64px);
    transition: transform 0.05s ease-out;
  }

  .conversation-item button:first-child {
    transform: translateX(0);
    transition: transform 0.05s ease-out;
  }

  .conversation-item button:first-child p {
    @apply text-xs text-gray-800 dark:text-gray-200;
  }

  .conversation-item button:first-child p:last-child {
    @apply text-gray-500 dark:text-gray-400;
  }

  @media (min-width: 1024px) {
    .conversation-item button:first-child {
      @apply p-3;
    }

    .conversation-item button:first-child p {
      @apply text-sm;
    }

    .conversation-item button:first-child p:first-child {
      @apply text-base font-medium mb-1;
    }

    .delete-action {
      @apply w-20;
    }

    .conversation-item.swiped button:first-child {
      transform: translateX(-80px);
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .conversation-item button:first-child {
      @apply p-2;
    }

    .conversation-item button:first-child p {
      @apply text-sm;
    }
  }

  @media (max-width: 768px) {
    .conversation-item button:first-child {
      @apply p-1;
    }

    .conversation-item button:first-child p {
      @apply text-xs;
    }

    .delete-action {
      @apply w-8;
    }

    .conversation-item.swiped button:first-child {
      transform: translateX(-32px);
    }
  }

  /* Scrollbar'ı gizle ama işlevselliğini koru */
  :global(.overflow-y-auto) {
    -ms-overflow-style: none;  /* IE ve Edge için */
    scrollbar-width: none;     /* Firefox için */
    -webkit-overflow-scrolling: touch;
  }
  
  :global(.overflow-y-auto::-webkit-scrollbar) {
    display: none;  /* Chrome, Safari ve Opera için */
  }
</style>
