<script lang="ts">
  import { fade, scale, fly } from "svelte/transition";
  import confetti from "canvas-confetti";

  export let showModal: boolean = false;
  export let onClose: () => void;

  let currentGame = "menu";
  let score = 0;
  let gameData: any = null;

  const games = [
    {
      id: "wordscramble",
      title: "Word Scramble",
      icon: "🔤",
      description: "Unscramble the letters to find the word",
    },
    {
      id: "wordchain",
      title: "Word Chain",
      icon: "⛓️",
      description: "Connect words using the last letter",
    },
    {
      id: "synonyms",
      title: "Synonym Match",
      icon: "🎯",
      description: "Match words with similar meanings",
    },
  ];

  // Word Scramble Game Data
  const wordScrambleData = [
    {
      word: "bonjour",
      hint: "A common greeting",
      scrambled: "jorubno",
    },
    {
      word: "merci",
      hint: "Expression of gratitude",
      scrambled: "cimer",
    },
  ];

  // Word Chain Game Data
  const wordChainData = [
    ["chat", "table", "école", "enfant"],
    ["maison", "nuit", "train", "neige"],
  ];

  // Synonym Match Game Data
  const synonymMatchData = [
    {
      pairs: [
        { word: "joli", match: "beau" },
        { word: "content", match: "heureux" },
        { word: "rapide", match: "vite" },
      ],
    },
  ];

  function startGame(gameId: string) {
    currentGame = gameId;
    score = 0;

    switch (gameId) {
      case "wordscramble":
        gameData = {
          currentWord: 0,
          words: [...wordScrambleData],
          userInput: "",
        };
        break;
      case "wordchain":
        gameData = {
          chain: [...wordChainData[0]],
          currentWord: 0,
          userInput: "",
        };
        break;
      case "synonyms":
        gameData = {
          pairs: [...synonymMatchData[0].pairs],
          selected: null,
          matched: new Set(),
        };
        break;
    }
  }

  function checkWordScramble() {
    if (
      gameData.userInput.toLowerCase() ===
      gameData.words[gameData.currentWord].word
    ) {
      score += 10;
      showSuccess();
      if (gameData.currentWord < gameData.words.length - 1) {
        gameData.currentWord++;
        gameData.userInput = "";
      } else {
        endGame();
      }
    }
  }

  function checkWordChain() {
    const currentWord = gameData.chain[gameData.currentWord];
    const userWord = gameData.userInput.toLowerCase();

    if (userWord.charAt(0) === currentWord.charAt(currentWord.length - 1)) {
      score += 10;
      showSuccess();
      if (gameData.currentWord < gameData.chain.length - 1) {
        gameData.currentWord++;
        gameData.userInput = "";
      } else {
        endGame();
      }
    }
  }

  function handleSynonymClick(word: string) {
    if (!gameData.selected) {
      gameData.selected = word;
    } else {
      const pair = gameData.pairs.find(
        (p: any) =>
          (p.word === word && p.match === gameData.selected) ||
          (p.match === word && p.word === gameData.selected)
      );

      if (pair) {
        gameData.matched.add(pair.word);
        gameData.matched.add(pair.match);
        score += 10;
        showSuccess();

        if (gameData.matched.size === gameData.pairs.length * 2) {
          endGame();
        }
      }

      gameData.selected = null;
    }
  }

  function showSuccess() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  function endGame() {
    setTimeout(() => {
      currentGame = "menu";
    }, 1500);
  }

  function backToMenu() {
    currentGame = "menu";
  }
</script>

<div class="modal-backdrop" transition:fade on:click|self={onClose}>
  <div class="modal-container" transition:scale>
    <div class="modal-content">
      <button class="close-button" on:click={onClose}>×</button>

      {#if currentGame === "menu"}
        <h2 class="text-xl font-semibold mb-6 text-center">Word Games</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each games as game}
            <button class="game-card" on:click={() => startGame(game.id)}>
              <div class="text-3xl mb-2">{game.icon}</div>
              <h3 class="text-lg font-medium mb-1">{game.title}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {game.description}
              </p>
            </button>
          {/each}
        </div>
      {:else if currentGame === "wordscramble"}
        <div class="game-container">
          <h3 class="text-xl font-semibold mb-6 text-center">Word Scramble</h3>

          <div class="text-center mb-8">
            <div class="text-2xl font-bold mb-2">
              {gameData.words[gameData.currentWord].scrambled}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Hint: {gameData.words[gameData.currentWord].hint}
            </div>
          </div>

          <div class="flex gap-2">
            <input
              type="text"
              bind:value={gameData.userInput}
              placeholder="Type your answer..."
              class="flex-1 input-field"
            />
            <button
              class="check-button"
              on:click={checkWordScramble}
              disabled={!gameData.userInput.trim()}
            >
              Check
            </button>
          </div>
        </div>
      {:else if currentGame === "wordchain"}
        <div class="game-container">
          <h3 class="text-xl font-semibold mb-6 text-center">Word Chain</h3>

          <div class="text-center mb-8">
            <div class="text-2xl font-bold mb-2">
              {gameData.chain[gameData.currentWord]}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Use the last letter to start your word
            </div>
          </div>

          <div class="flex gap-2">
            <input
              type="text"
              bind:value={gameData.userInput}
              placeholder="Type your word..."
              class="flex-1 input-field"
            />
            <button
              class="check-button"
              on:click={checkWordChain}
              disabled={!gameData.userInput.trim()}
            >
              Check
            </button>
          </div>
        </div>
      {:else if currentGame === "synonyms"}
        <div class="game-container">
          <h3 class="text-xl font-semibold mb-6 text-center">Synonym Match</h3>

          <div class="grid grid-cols-2 gap-4">
            {#each gameData.pairs as pair}
              <button
                class="synonym-card"
                class:selected={gameData.selected === pair.word}
                class:matched={gameData.matched.has(pair.word)}
                on:click={() => handleSynonymClick(pair.word)}
                disabled={gameData.matched.has(pair.word)}
              >
                {pair.word}
              </button>
              <button
                class="synonym-card"
                class:selected={gameData.selected === pair.match}
                class:matched={gameData.matched.has(pair.match)}
                on:click={() => handleSynonymClick(pair.match)}
                disabled={gameData.matched.has(pair.match)}
              >
                {pair.match}
              </button>
            {/each}
          </div>
        </div>
      {/if}

      <div class="flex justify-between items-center mt-8">
        {#if currentGame !== "menu"}
          <button class="nav-button" on:click={backToMenu}>
            Back to Menu
          </button>
          <div class="score">Score: {score}</div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .modal-backdrop {
    @apply fixed inset-0 bg-black/50 flex items-center justify-center z-50;
  }

  .modal-container {
    @apply bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 relative;
  }

  .modal-content {
    @apply p-8;
  }

  .close-button {
    @apply absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-gray-700 
           dark:text-gray-400 dark:hover:text-gray-200 transition-colors;
  }

  .game-card {
    @apply p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm
           hover:shadow-md transition-shadow text-center
           border border-gray-200 dark:border-gray-600;
  }

  .game-container {
    @apply max-w-2xl mx-auto;
  }

  .input-field {
    @apply px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
           bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
           focus:ring-2 focus:ring-primary-500 focus:border-transparent;
  }

  .check-button {
    @apply px-4 py-2 bg-primary-500 text-white rounded-lg
           hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed
           transition-colors;
  }

  .nav-button {
    @apply px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
           hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors;
  }

  .score {
    @apply text-lg font-medium text-primary-600 dark:text-primary-400;
  }

  .synonym-card {
    @apply p-4 bg-white dark:bg-gray-700 rounded-lg text-center
           border-2 border-gray-200 dark:border-gray-600
           hover:border-primary-500 dark:hover:border-primary-400
           disabled:opacity-50 disabled:cursor-not-allowed
           transition-colors;
  }

  .synonym-card.selected {
    @apply border-primary-500 dark:border-primary-400
           bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20;
  }

  .synonym-card.matched {
    @apply border-green-500 dark:border-green-400
           bg-green-50 dark:bg-green-900 dark:bg-opacity-20
           text-green-700 dark:text-green-300;
  }
</style>
