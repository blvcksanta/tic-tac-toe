import { computed, ref } from 'vue'

export function useGameSettings() {
  const currentPlayer = ref<'x' | 'o'>('x')

  const playingField = ref([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ])

  const mainDiagonal = computed(() => playingField.value.map((row, index) => row[index] ?? ''))

  const reverseDiagonal = computed(() =>
    playingField.value.map((row, index) => row.at(-(index + 1)) ?? ''),
  )

  const columns = computed(() => {
    const result: string[][] = []

    for (let i = 0; i < playingField.value.length; i++) {
      result.push(playingField.value.map((row) => row[i] ?? ''))
    }

    return result
  })

  const isXWin = computed(() => isWinner('x'))
  const isOWin = computed(() => isWinner('o'))
  const isDraw = computed(() => {
    return (
      !isXWin.value &&
      !isOWin.value &&
      playingField.value.every((row) => row.every((item) => !!item))
    )
  })

  function findMatchesInMatrix(matrix: string[][], target: 'x' | 'o') {
    return matrix.some((row) => row.every((elem) => elem === target))
  }

  function findMatchesInArray(arr: string[], target: 'x' | 'o') {
    return arr.every((elem) => elem === target)
  }

  function isWinner(target: 'x' | 'o') {
    return (
      findMatchesInMatrix(playingField.value, target) ||
      findMatchesInMatrix(columns.value, target) ||
      findMatchesInArray(mainDiagonal.value, target) ||
      findMatchesInArray(reverseDiagonal.value, target)
    )
  }
}
