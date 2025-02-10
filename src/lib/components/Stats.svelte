<script lang="ts">
  export let streak: number;
  export let messagesToday: number;
  export let dailyGoal: number;
</script>

<div class="stats-bar">
  <div class="stat">
    <span class="stat-label">Streak</span>
    <span class="stat-value">🔥 {streak} days</span>
  </div>
  <div class="stat">
    <span class="stat-label">Today's Progress</span>
    <div class="progress-bar">
      <div class="progress-fill" style="width: {(messagesToday / dailyGoal) * 100}%" />
    </div>
    <span class="stat-value">{messagesToday}/{dailyGoal}</span>
  </div>
</div>

<style>
  .stats-bar {
    @apply flex justify-center gap-8 mb-4;
  }

  .stat {
    @apply flex flex-col items-center;
  }

  .stat-label {
    @apply text-sm text-gray-600 dark:text-gray-400;
  }

  .stat-value {
    @apply font-medium dark:text-white;
  }

  .progress-bar {
    @apply w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden;
  }

  .progress-fill {
    @apply h-full bg-primary-500;
  }
</style>
