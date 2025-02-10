<script lang="ts">
  import type { Language, ProficiencyLevel } from '$lib/types/common';
  import { languages, levels, getExcludedLanguages } from '$lib/data';

  export let nativeLanguage: Language;
  export let selectedLanguage: Language;
  export let proficiencyLevel: ProficiencyLevel;
  export let onShowLevelTest: () => void;

  // Compute available languages
  $: availableTargetLanguages = [...languages]
    .filter((lang): lang is Language => {
      const excludedLanguages = getExcludedLanguages(nativeLanguage);
      return !excludedLanguages.includes(lang as Language);
    })
    .sort((a, b) => a.localeCompare(b));

  $: availableNativeLanguages = [...languages].sort((a, b) => a.localeCompare(b));

  function saveLanguagePreferences() {
    if (nativeLanguage && selectedLanguage) {
      localStorage.setItem('nativeLanguage', nativeLanguage);
      localStorage.setItem('targetLanguage', selectedLanguage);
    }
  }

  function loadLanguagePreferences() {
    const savedNativeLanguage = localStorage.getItem('nativeLanguage') as Language | null;
    const savedTargetLanguage = localStorage.getItem('targetLanguage') as Language | null;

    if (savedNativeLanguage && languages.includes(savedNativeLanguage)) {
      nativeLanguage = savedNativeLanguage;
    }

    if (savedTargetLanguage && languages.includes(savedTargetLanguage)) {
      selectedLanguage = savedTargetLanguage;
    }
  }
</script>

<div class="language-controls">
  <div class="selector-group">
    <label for="native-lang" class="selector-label">I speak</label>
    <select
      id="native-lang"
      bind:value={nativeLanguage}
      class="language-selector"
      on:change={saveLanguagePreferences}
    >
      {#each availableNativeLanguages as lang}
        <option value={lang}>{lang}</option>
      {/each}
    </select>
  </div>

  <div class="selector-group">
    <label for="target-lang" class="selector-label">I want to learn</label>
    <select
      id="target-lang"
      bind:value={selectedLanguage}
      class="language-selector"
      on:change={saveLanguagePreferences}
    >
      {#each availableTargetLanguages as language}
        <option value={language}>{language}</option>
      {/each}
    </select>
  </div>

  <div class="selector-group">
    <label for="level" class="selector-label">My level is</label>
    <select id="level" bind:value={proficiencyLevel} class="level-selector">
      {#each levels as level}
        <option value={level}>{level}</option>
      {/each}
    </select>
    {#if selectedLanguage === 'French'}
      <button
        class="text-sm text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 mt-2 flex items-center gap-1"
        on:click={onShowLevelTest}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
          />
        </svg>
        You have no idea? Take a quick test
      </button>
    {/if}
  </div>
</div>

<style>
  .language-controls {
    @apply flex flex-wrap justify-center gap-4;
  }

  .selector-group {
    @apply flex flex-col min-w-[150px] flex-1;
  }

  .selector-label {
    @apply text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium;
  }

  .language-selector,
  .level-selector {
    @apply px-3 py-2 bg-white dark:bg-gray-800 rounded-lg 
           border border-gray-200 dark:border-gray-700
           text-sm md:text-base
           focus:ring-2 focus:ring-primary-500 focus:border-transparent
           hover:border-primary-500 dark:hover:border-primary-400
           transition-all duration-200;
  }

  @media (max-width: 768px) {
    .language-controls {
      @apply flex-col items-stretch gap-2;
    }

    .selector-group {
      @apply w-full;
    }

    .language-selector,
    .level-selector {
      @apply w-full text-base py-2;
    }
  }
</style>
