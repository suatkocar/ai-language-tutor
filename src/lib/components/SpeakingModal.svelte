<script lang="ts">
  export let isRecording: boolean;
  export let isProcessing: boolean;
  export let isAiSpeaking: boolean;
  export let onClose: () => void;
  export let onToggleRecording: () => void;
  export let startVisualization: (stream: MediaStream) => void;
  export let stopVisualization: () => void;
  export let visualizerCanvas: HTMLCanvasElement;
</script>

<div
  class="speaking-modal fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
  on:mousedown={(e) => {
    if (e.target === e.currentTarget) onClose();
  }}
>
  <div class="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl p-6 shadow-xl">
    <div
      class="visualizer-container relative mb-6 {isRecording
        ? 'recording-active'
        : ''} {isAiSpeaking ? 'ai-speaking' : ''}"
    >
      <canvas bind:this={visualizerCanvas} class="visualizer-canvas" />
      {#if isRecording && !isAiSpeaking}
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="recording-indicator w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        </div>
      {/if}
    </div>

    <div class="flex justify-center">
      <button
        class="record-button {isRecording ? 'recording' : ''} {isProcessing
          ? 'processing'
          : ''} {isAiSpeaking ? 'ai-speaking' : ''}"
        on:click={onToggleRecording}
        disabled={isProcessing}
      >
        <div class="flex items-center gap-2">
          {#if isProcessing}
            <div class="loading-dots">
              <div class="dot" />
              <div class="dot" />
              <div class="dot" />
            </div>
          {:else if isAiSpeaking}
            <span>AI Speaking...</span>
          {:else if isRecording}
            <span>Recording...</span>
          {:else}
            <span>Tap to speak</span>
          {/if}
        </div>
      </button>
    </div>
  </div>
</div>

<style>
  .speaking-modal {
    animation: fadeIn 0.3s ease-out;
  }

  .visualizer-container {
    height: 120px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.02));
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;
  }

  .visualizer-container.recording-active {
    @apply border-2 border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900;
    @apply dark:bg-opacity-20;
    animation: pulse 2s infinite;
  }

  .visualizer-container.ai-speaking {
    @apply border-2 border-primary-500 dark:border-primary-500 bg-primary-50 dark:bg-primary-900;
    @apply dark:bg-opacity-20;
  }

  .visualizer-canvas {
    width: 100%;
    height: 100%;
    background: transparent;
  }

  .recording-indicator {
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
  }

  .message-bubble {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }

  .message-bubble:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }

  .record-button {
    @apply flex items-center gap-2 px-6 py-4 
           bg-gradient-to-r from-primary-500 to-primary-600
           hover:from-primary-600 hover:to-primary-700
           text-white rounded-full transition-all duration-300
           transform hover:scale-105 active:scale-95
           shadow-lg hover:shadow-xl
           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100;
    min-width: 180px;
    justify-content: center;
  }

  .record-button.recording {
    @apply from-red-500 to-red-600 hover:from-red-600 hover:to-red-700;
    animation: pulse 2s infinite;
  }

  .record-button.processing {
    @apply from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700;
  }

  .record-button.ai-speaking {
    @apply from-green-500 to-green-600 hover:from-green-600 hover:to-green-700;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
    }
    70% {
      box-shadow: 0 0 0 15px rgba(239, 68, 68, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .loading-dots {
    @apply flex gap-1 items-center justify-center;
  }

  .loading-dots .dot {
    @apply w-2 h-2 bg-current rounded-full;
    animation: bounce 1.4s infinite ease-in-out both;
  }

  .loading-dots .dot:nth-child(1) {
    animation-delay: -0.32s;
  }
  .loading-dots .dot:nth-child(2) {
    animation-delay: -0.16s;
  }
  .loading-dots .dot:nth-child(3) {
    animation-delay: 0s;
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
</style>
