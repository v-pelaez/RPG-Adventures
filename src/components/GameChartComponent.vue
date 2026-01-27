<script setup lang="ts">
import Chart from "primevue/chart";
import SelectButton from "primevue/selectbutton";
import { computed, ref } from "vue";
import { useGroupOthers } from "../composables/StatisticsComposable";
import type { Game } from '../types';



const props = defineProps<{
  games: Game[];
}>();

const chartType = ref<'doughnut' | 'pie' | 'bar'>('doughnut');

const typeOptions = [
  { icon: 'pi pi-bullseye', value: 'doughnut' },
  { icon: 'pi pi-chart-pie', value: 'pie' },
  { icon: 'pi pi-chart-bar', value: 'bar' }
];

const chartData = computed(() => useGroupOthers(props.games));

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  color: '#FFFFFF',
  borderColor: 'transparent',
};

const chartOptions = computed(() => {
  if (chartType.value === 'bar') {
    return {
      ...commonOptions,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (tooltipItems: any) => tooltipItems[0].label
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#f0f0f0' },
          ticks: { precision: 0 }
        },
        x: {
          grid: { display: false },
          ticks: {
            maxRotation: 45,
            minRotation: 45,
            callback: function (this: any, value: any) {
              const label = this.getLabelForValue(value);
              return label.length > 12 ? label.substring(0, 10) + '...' : label;
            }
          }
        }
      }
    };
  }

  return {
    ...commonOptions,
    cutout: chartType.value === 'doughnut' ? '60%' : '0%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: { size: 12 }
        }
      }
    }
  };
});
</script>

<template>


  <div class="flex-grow min-h-[300px] w-full relative">
    <Chart :key="chartType" :type="chartType" :data="chartData" :options="chartOptions" class="w-full h-full" />
  </div>

  <div class="flex justify-center mt-6">
    <SelectButton v-model="chartType" :options="typeOptions" optionValue="value" :allowEmpty="false"
      class="custom-selectbutton">
      <template #option="slotProps">
        <i :class="slotProps.option.icon" class="text-lg"></i>
      </template>
    </SelectButton>
  </div>
</template>

<style scoped>
/* Mantenemos estos estilos :deep porque PrimeVue inyecta sus propias clases 
  y es más limpio manejarlos aquí que con clases de Tailwind extremadamente largas.
*/
:deep(.p-selectbutton .p-button) {
  @apply bg-transparent border-gray-200 text-gray-600 transition-colors duration-200;
}

:deep(.p-selectbutton .p-button.p-highlight) {
  @apply bg-purple-600 border-purple-600 text-white hover:bg-purple-700;
}

:deep(.p-selectbutton .p-button:not(.p-highlight):hover) {
  @apply bg-transparent text-gray-800;
}

/* Ajusta el tamaño de los iconos dentro del SelectButton */
:deep(.p-selectbutton .p-button .p-button-icon) {
  @apply text-lg;
}

/* Opcional: Si quieres que los botones sean más compactos ahora que solo hay iconos */
:deep(.p-selectbutton .p-button) {
  @apply px-3 py-2;
}
</style>