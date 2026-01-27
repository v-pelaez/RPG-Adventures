import { createI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";

export const i18n = createI18n({
  legacy: false, // Debe ser false para Composition API
  globalInjection: true, // Permite usar $t en cualquier componente sin importar si usa Composition API o Options API
  locale: localStorage.getItem('language') || window.navigator.language.substring(0, 2) || "en", // Detecta el idioma del navegador
  fallbackLocale: "en", // Idioma por defecto si no se encuentra traducción
  availableLocales: ["es", "en"], // Idiomas disponibles
  messages: messages, // Carga los mensajes de traducción
});

