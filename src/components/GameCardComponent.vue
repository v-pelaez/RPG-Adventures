<script setup lang="ts">

interface GameItem {
  top: number
  title: string
  description: Record<string, string>
  image: string
  since: string | number
}

const props = defineProps<{
  item: GameItem
}>()

</script>

<template>
  <div
    class="cristal shadow-lg rounded-xl m-4 gap-8 p-6 hover:shadow-xl transition-shadow w-full max-w-sm mx-auto"
  >
    <div class="relative mb-4 flex align-center">
      <img
        :src="item.image"
        :alt="item.title"
        class="w-full h-100 max-h-[430px] object-cover rounded-lg shadow-md"
      />
      <p class="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
        #{{ item.top }}
      </p>
    </div>
    <h3 class="text-xl font-bold mb-3 text-white-800">{{ item.title }}</h3>
    <p class="text-white-600 mb-4 leading-relaxed line-clamp-3">
      {{ item.description[$i18n.locale] || item.description.en || "" }}
    </p>
    <div class="flex justify-between items-center text-sm text-white-500 mb-4">
      <span>{{ item.since }}</span>
    </div>
  </div>
</template>



