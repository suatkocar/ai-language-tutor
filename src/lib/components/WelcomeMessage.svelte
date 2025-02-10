<script lang="ts">
  import { fade, fly, scale } from "svelte/transition";
  import {
    selectedLanguage,
    nativeLanguage,
    proficiencyLevel,
  } from "../stores";
  import { welcomeMessages } from "../constants";
  import type { ProficiencyLevel } from "../types";

  let currentMessage = "";

  $: {
    const welcomeMessage =
      welcomeMessages[$nativeLanguage as keyof typeof welcomeMessages] ||
      welcomeMessages["English (UK)"];
    if (welcomeMessage) {
      currentMessage = welcomeMessage($selectedLanguage, $proficiencyLevel);
    } else {
      currentMessage = `Welcome to your ${$selectedLanguage} lesson! I'm your personal tutor for ${$proficiencyLevel} level. What would you like to learn today?`;
    }
  }

  const levels: ProficiencyLevel[] = ["Beginner", "Intermediate", "Advanced"];
</script>

<div class="welcome-message" in:scale={{ duration: 300, start: 0.95 }}>
  <p class="text-lg font-medium">
    {currentMessage}
  </p>
  <div class="proficiency-levels mt-2 flex gap-2">
    {#each levels as level}
      <button
        class="px-3 py-1 rounded-full text-sm transition-all duration-300 {level ===
        $proficiencyLevel
          ? 'bg-primary-500 text-white'
          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}"
        on:click={() => proficiencyLevel.set(level)}
      >
        {level}
      </button>
    {/each}
  </div>
</div>

<style>
  .welcome-message {
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: var(--surface-color, white);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .proficiency-levels {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  :global(.dark) .welcome-message {
    --surface-color: rgb(31, 41, 55);
  }
</style>
