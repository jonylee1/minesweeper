import React, { useCallback, useEffect, useState } from "react";
import Cell from "../cell/Cell.component";
import styles from './Board.module.css';

export type CellState = {
    value: string;
    isRevealed: boolean;
}


// holds the mines and numbers in our board
// TODO: replace string with CellState
// we need a way to track our win condition
// do we replace the array of strings with a strongly typed CellState?
// win condition can be checked by iterating through the array, counting which cells are not revealed, and checking it against the minesToGenerate
let boardArray: string[][] = [
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0']
];

const BoardState = React.createContext(boardArray);

const Board = () => {
    const [board, setBoard] = useState(boardArray);
    const [generated, setGenerated] = useState(false);
    const [minesToGenerate, setMinesToGenerate] = useState(5);

    /**
     * Should be called after the user clicks a cell for the first time
     * @param event 
     */
    const generateBoard = (row: number, column: number) => {
        let mineCounter = 0;

        do {
            // randomly generate a row and column
            let randRow = Math.floor(Math.random() * 4);
            let randColumn = Math.floor(Math.random() * 4);
            if (!(randRow === row && randColumn === column) && boardArray[randRow][randColumn] !== 'x') {
                // it is not the cell we clicked
                mineCounter++;
                boardArray[randRow][randColumn] = 'x'
                // increment the counter of the cells around it
                for (var genRow = randRow - 1; genRow < randRow + 2; genRow++) {
                    for (var genColumn = randColumn - 1; genColumn < randColumn + 2; genColumn++) {
                        if ((genRow >= 0 && genRow < 5) && (genColumn >= 0 && genColumn < 5) && (boardArray[genRow][genColumn] !== 'x')) {
                            boardArray[genRow][genColumn] = (parseInt(boardArray[genRow][genColumn]) + 1).toString();
                        }
                    }
                }
            }
        } while (mineCounter < minesToGenerate);
    }

    /**
     * Should be called after every cell is clicked.
     * @param row 
     * @param column 
     */
    const checkBoardState = (row: number, column: number) => {
        if (!generated) {
            generateBoard(row, column);
            setBoard([...boardArray]);
            setGenerated(true);
        } else {
            console.log('check win/loss scenario');
            const cellValue = boardArray[row][column];
            if (cellValue === 'x') {
                console.log('LOSE');
            } else {
                // add clicked cell to list of clicked cells
            }
            // if only mines remain unrevealed, win
            // if currentCell = 0, reveal surrounding cells
        }
        // TODO: execute a click function on an arbitrary cell for 0-cascade
    }

    const initializeBoard = () => {
        return Array.from({ length: 5 }, (_, row) => (
            <div key={`${row}`} className={styles.row}>{
            Array.from({ length: 5}, (_, column) => (
                <Cell 
                    handleClick={checkBoardState}
                    key={`${row * 5 + column}`}
                    type='number'
                    displayText={board[row][column]}
                    x={column}
                    y={row}
                />
            ))}</div>
        ))
    }

    return (
        <div className={styles.board}>{initializeBoard()}</div>
    );
}

export default Board;
