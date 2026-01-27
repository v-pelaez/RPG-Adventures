<script setup lang="ts">
import GameCardComponent from "./GameCardComponent.vue";
import type { Rpg } from '../types';

defineProps<{
  rpgs: Rpg[];
}>();

const responsiveOptions = [
  { breakpoint: "1600px", numVisible: 3, numScroll: 3 },
  { breakpoint: "1400px", numVisible: 2, numScroll: 2 },
  { breakpoint: "1000px", numVisible: 1, numScroll: 1 },
];
</script>

<template>
  <Carousel
    v-if="rpgs.length"
    :value="rpgs"
    :numVisible="3"
    :numScroll="1"
    :responsiveOptions="responsiveOptions"
    :showIndicators="false"
    circular
    :autoplayInterval="6000"
  >
    <template #item="{ data }">
      <GameCardComponent :item="data" />
    </template>
  </Carousel>
  <p v-else class="text-center text-xl py-8">Cargando top juegos...</p>
</template>
