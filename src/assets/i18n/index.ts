import { createI18n } from 'vue-i18n'
import { en } from './en'
import { ru } from './ru'
import type { Language, LanguageTemplate } from './i18n.type'

const LOCALE_DEFAULT: Language = 'en'
const LOCALES: Record<Language, LanguageTemplate> = { en, ru }

export const LANGUAGES = {
  en: 'English',
  ru: 'Русский',
}

const locale = localStorage.getItem('locale')

export const i18n = createI18n<[LanguageTemplate], Language>({
  legacy: false,
  fallbackLocale: 'en',
  locale: locale ?? LOCALE_DEFAULT,
  messages: LOCALES,
})
