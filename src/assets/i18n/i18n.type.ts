export interface LanguageTemplate {
  title: string
  gameModes: {
    one: string
    two: string
    online: string
  }
  winnerText: {
    x: string
    o: string
    draw: string
  }
  localeButton: string
}

export type Language = 'en' | 'ru'
