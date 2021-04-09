import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.25 }) {
	const [ board, setBoard ] = useState(createBoard());

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	function createBoard() {
		let initialBoard = [];

		// TODO: create array-of-arrays of true/false values
		for (let r = 0; r < nrows; r++) {
			const row = [];
			for (let c = 0; c < ncols; c++) {
				row.push(Math.random() < chanceLightStartsOn);
			}
			initialBoard.push(row);
		}
		return initialBoard;
	}

	function hasWon() {
		// TODO: check the board in state to determine whether the player has won.
		for (let r = 0; r < nrows; r++) {
			for (let c = 0; c < ncols; c++) {
				if (board[r][c] === true) {
					return false;
				}
			}
		}
		return true;
	}

	function flipCellsAround(coord) {
		setBoard(oldBoard => {
			const [ y, x ] = coord.split('-').map(Number);

			const flipCell = (y, x, boardCopy) => {
				// if this coord is actually on board, flip it

				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					boardCopy[y][x] = !boardCopy[y][x];
				}
			};

			// TODO: Make a (deep) copy of the oldBoard
			let newBoard = Array.from(oldBoard);

			// TODO: in the copy, flip this cell and the cells around it
			flipCell(y, x, newBoard);
			flipCell(y + 1, x, newBoard);
			flipCell(y - 1, x, newBoard);
			flipCell(y, x + 1, newBoard);
			flipCell(y, x - 1, newBoard);

			// TODO: return the copy
			return newBoard;
		});
	}

	// if the game is won, just show a winning msg & render nothing else
	if (hasWon()) {
		return <div>You have won the game!</div>;
	}
	// TODO

	// make table board
	return (
		<div>
			{board.map((row, y) => (
				<div>
					{row.map((cell, x) => <Cell flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)} isLit={cell} />)}
				</div>
			))}
		</div>
	);

	// TODO
}

export default Board;
