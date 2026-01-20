import { computed, ref } from 'vue'

export function useGameSettings() {
  const firstPlayer = ref<'x' | 'o'>('x')
  const currentPlayer = ref<'x' | 'o'>(firstPlayer.value)

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
    const matrix: string[][] = []

    for (let i = 0; i < playingField.value.length; i++) {
      matrix.push(playingField.value.map((row) => row[i] ?? ''))
    }

    return matrix
  })

  const isXWin = computed(() => isWinner('x'))
  const isOWin = computed(() => isWinner('o'))
  const isDraw = computed(() => playingField.value.every((row) => row.every((item) => !!item)))
  const isGameEnd = computed(() => isXWin.value || isOWin.value || isDraw.value)

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

  function reset() {
    currentPlayer.value = firstPlayer.value
    playingField.value = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]
  }

  function changeFirstPlayer() {
    firstPlayer.value = firstPlayer.value === 'x' ? 'o' : 'x'
    reset()
  }

  function changeCurrentPlayer() {
    currentPlayer.value = currentPlayer.value === 'x' ? 'o' : 'x'
  }

  return {
    currentPlayer,
    firstPlayer,
    playingField,
    mainDiagonal,
    reverseDiagonal,
    columns,
    isXWin,
    isOWin,
    isDraw,
    isGameEnd,
    reset,
    changeFirstPlayer,
    changeCurrentPlayer,
  }
}
