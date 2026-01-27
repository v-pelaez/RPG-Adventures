import { i18n } from '../plugins/i18n'

const changeLanguage = () => {
  i18n.global.locale.value =  i18n.global.locale.value === 'es' ? 'en' : 'es'
  localStorage.setItem('language', i18n.global.locale.value)
}

export function useLanguage() {
  return { changeLanguage }
}
