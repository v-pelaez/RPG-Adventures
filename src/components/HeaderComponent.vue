<script setup lang="ts">
import { ref } from "vue";
import { useLanguage } from "../composables/LanguageComposable";
import { useRoute } from "vue-router";
import { routesNames } from "../router/index";

const { name: urlName } = useRoute();
const { changeLanguage } = useLanguage();

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <header class="sticky top-0 z-[1000] w-full bg-gradient-to-r from-[#21113d] to-black shadow-lg">
    <div class="flex items-center justify-between px-5 py-3">
      <RouterLink to="/" class="flex gap-3 sm:gap-5" @click="isMenuOpen = false">
        <img class="h-[40px] md:h-[50px]" src="/dado.png" alt="Logo" />
        <h1 class="m-0 self-center text-xl md:text-2xl font-bold text-white leading-tight">
          RPG Adventures
        </h1>
      </RouterLink>

      <button 
        @click="toggleMenu" 
        class="lg:hidden text-white p-2 focus:outline-none hover:bg-white/10 rounded-lg transition-colors"
      >
        <i :class="['pi text-xl transition-transform duration-300', isMenuOpen ? 'pi-times rotate-90' : 'pi-bars']"></i>
      </button>

      <nav class="hidden lg:block">
        <ul class="flex list-none gap-6 p-0 m-0">
          <li :class="[urlName === routesNames.home ? 'text-yellow-400' : 'text-white']" class="font-bold hover:text-yellow-200 transition-colors">
            <RouterLink to="/">{{ $t("menu.home") }}</RouterLink>
          </li>
          <li :class="[urlName === routesNames.games ? 'text-yellow-400' : 'text-white']" class="font-bold hover:text-yellow-200 transition-colors">
            <RouterLink to="/games">{{ $t("menu.games") }}</RouterLink>
          </li>
          <li>
            <button @click="changeLanguage" class="flex items-center gap-2 font-bold text-white hover:text-yellow-200 cursor-pointer">
              <span :class="$t('menu.flag')"></span> {{ $t("menu.lang") }}
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <div 
      :class="[
        'lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#21113d] border-t border-white/10',
        isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
      ]"
    >
      <ul class="flex flex-col list-none p-4 m-0 gap-4">
        <li @click="isMenuOpen = false">
          <RouterLink 
            to="/" 
            :class="['block p-2 rounded-md font-bold', urlName === routesNames.home ? 'bg-yellow-400 text-black' : 'text-white hover:bg-white/5']"
          >
            <i class="pi pi-home mr-2"></i>{{ $t("menu.home") }}
          </RouterLink>
        </li>
        <li @click="isMenuOpen = false">
          <RouterLink 
            to="/games" 
            :class="['block p-2 rounded-md font-bold', urlName === routesNames.games ? 'bg-yellow-400 text-black' : 'text-white hover:bg-white/5']"
          >
            <i class="pi pi-map mr-2"></i>{{ $t("menu.games") }}
          </RouterLink>
        </li>
        <li class="pt-2 border-t border-white/10">
          <button 
            @click="() => { changeLanguage(); isMenuOpen = false; }"
            class="w-full text-left p-2 font-bold text-white flex items-center gap-2 hover:bg-white/5 rounded-md"
          >
            <span :class="$t('menu.flag')"></span> {{ $t("menu.lang") }}
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>
