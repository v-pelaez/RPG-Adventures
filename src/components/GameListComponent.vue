<script setup lang="ts">
import { computed } from "vue";
import type { Game } from "../types";
import { useGroupOthers } from "../composables/StatisticsComposable";

const props = defineProps<{
  games: Game[];
}>();

const chartData = computed(() => useGroupOthers(props.games));

const totalParties = computed(() => props.games.length);
const getCount = (label: string) =>
  chartData.value.datasets?.[0]?.data[chartData.value.labels.indexOf(label)] || 0;
</script>

<template>
  <div class="systems-section">
    <h2 class="title-systems text-xl md:text-3xl font-bold text-gray-900 mb-6 drop-shadow-lg text-orange-500">
      {{ $t("home.current_games") }}
    </h2>

    <ul class="system-list space-y-3 mb-6">
      <li 
        v-for="(label, index) in chartData.labels" 
        :key="label" 
        class="system-item flex items-center gap-3 p-3 md:p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 text-gray-800"
      >
        <span 
          class="w-4 h-4 md:w-5 md:h-5 rounded-full shadow-md flex-shrink-0" 
          :style="{ backgroundColor: chartData.datasets[0]?.backgroundColor?.[index % (chartData.datasets[0]?.backgroundColor?.length || 6)] || '#ccc' }"
        ></span>
        
        <div class="flex flex-1 items-baseline justify-between min-w-0 gap-2">
          <span class="font-semibold text-base md:text-lg truncate flex-1">
            {{ label }}
          </span>
          <div class="flex-shrink-0 flex items-baseline gap-1">
            <span class="text-xl md:text-2xl font-black text-blue-600">{{ getCount(label) }}</span>
            <span class="text-xs md:text-sm text-gray-600">{{ $t("home.adventures") }}</span>
          </div>
        </div>
      </li>
    </ul>
    
    <p class="total-text text-lg md:text-xl font-bold text-gray-900 bg-blue-50 px-6 py-4 rounded-2xl shadow-md border-2 border-blue-200 text-center">
      Total: {{ totalParties }} {{ $t("home.adventures") }}
    </p>
  </div>
</template>

<style scoped>
.systems-section {
  @apply max-w-4xl mx-auto p-4 md:p-6;
}
/* Evita que el texto largo rompa el layout */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
