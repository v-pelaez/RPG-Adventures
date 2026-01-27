<template>
  <footer class=" py-6 px-4 md:px-8 bg-gradient-to-r from-[#21113d]">
    <!-- Redes Sociales -->
    <div class="flex flex-wrap justify-center gap-6 mb-8 md:mb-12">
      <a
        href="https://www.facebook.com"
        target="_blank"
        class="group flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 hover:scale-110 text-gray-300 hover:text-white"
        aria-label="Facebook"
      >
        <i
          class="pi pi-facebook text-2xl md:text-3xl group-hover:-translate-y-1 transition-transform"
        ></i>
        <span class="text-xs md:text-sm font-medium opacity-90">Facebook</span>
      </a>

      <a
        href="https://twitter.com"
        target="_blank"
        class="group flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 hover:scale-110 text-gray-300 hover:text-white"
        aria-label="Twitter"
      >
        <i
          class="pi pi-twitter text-2xl md:text-3xl group-hover:-translate-y-1 transition-transform"
        ></i>
        <span class="text-xs md:text-sm font-medium opacity-90">Twitter</span>
      </a>

      <a
        href="https://www.instagram.com"
        target="_blank"
        class="group flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 hover:scale-110 text-gray-300 hover:text-white"
        aria-label="Instagram"
      >
        <i
          class="pi pi-instagram text-2xl md:text-3xl group-hover:-translate-y-1 transition-transform"
        ></i>
        <span class="text-xs md:text-sm font-medium opacity-90">Instagram</span>
      </a>

      <a
        href="https://github.com"
        target="_blank"
        class="group flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 hover:scale-110 text-gray-300 hover:text-white"
        aria-label="GitHub"
      >
        <i
          class="pi pi-github text-2xl md:text-3xl group-hover:-translate-y-1 transition-transform"
        ></i>
        <span class="text-xs md:text-sm font-medium opacity-90">GitHub</span>
      </a>
    </div>

    <!-- Legal -->
    <div class="border-t border-gray-700 pt-6 w-full text-center md:text-left">
      <h4 class="font-outfit text-lg md:text-xl font-bold text-gray-200 mb-3">
        {{ $t("footer.legal_title") }}
      </h4>
      <p class="text-sm md:text-base text-gray-300 leading-relaxed w-full">
        {{ $t("footer.legal_paragraph") }}
      </p>
    </div>
  </footer>
</template>
