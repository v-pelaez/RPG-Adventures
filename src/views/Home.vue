<script setup lang="ts">
import { ref, onMounted } from "vue";
import GameCarouselComponent from "../components/GameCarouselComponent.vue";
import GameChartComponent from "../components/GameChartComponent.vue";
import GameListComponent from "../components/GameListComponent.vue";

const rpgs = ref([]);
const games = ref([]);

onMounted(async () => {
  try {
    const response1 = await fetch("/data/rpgs.json");
    rpgs.value = await response1.json();
    const response2 = await fetch("/data/games.json");
    games.value = await response2.json();
  } catch (error) {
    console.error("Error:", error);
  }
});
</script>

<template>
  <div class="background-galaxy">
  <div class="container mx-auto px-4 py-6 md:py-12">
    <p class="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-white leading-tight break-words">
      {{ $t("home.title") }}
    </p>
  </div>
  <GameCarouselComponent :rpgs="rpgs" />
</div>

  <div class="container mx-auto my-12 px-4 ">
    <div class="background-galaxy rounded-xl overflow-hidden">
      
      <div class="cristal grid grid-cols-1 md:grid-cols-2 gap-8  rounded-xl shadow-xl overflow-hidden">
      <div class="p-6 md:p-10 flex flex-col h-[500px] md:h-auto min-h-[450px]">
        <GameChartComponent :games="games" />
      </div>

      <div class="p-6 md:p-10 flex flex-col justify-center ">
        <GameListComponent :games="games" />
      </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Mantenemos solo lo esencial que no es fácilmente sustituible por Tailwind */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

</style>