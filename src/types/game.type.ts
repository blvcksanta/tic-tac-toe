export type Player = 'x' | 'o'
export type Cell = Player | ''

export interface Coord {
  row: number
  col: number
}

export interface Line {
  cells: Cell[]
  coords: Coord[]
}
