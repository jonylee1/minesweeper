import React, { useCallback, useEffect, useState } from "react";
import Cell from "../cell/Cell.component";
import styles from './Board.module.css';

/**
 * Should be called after the user clicks a cell for the first time
 * @param event 
 */
const generateBoard = (row: number, column: number) => {
    // TODO: row and column are the clicked cell which we will use later
    for (var row = 0; row < 5; row++) {
        for (var column = 0; column < 5; column++) {
            if (boardArray[row][column] === 'x') {
                // increment the count in cells around this one
                for (var genRow = row - 1; genRow < row + 2; genRow++) {
                    for (var genColumn = column - 1; genColumn < column + 2; genColumn++) {
                        if ((genRow >= 0 && genRow < 5) && (genColumn >= 0 && genColumn < 5) && (boardArray[genRow][genColumn] !== 'x')) {
                            boardArray[genRow][genColumn] = (parseInt(boardArray[genRow][genColumn]) + 1).toString();
                        }
                    }
                }
            }
        }
    }
}



// maybe use a HashMap if the 2-dimensional array thing doesn't pan out
let boardArray: string[][] = [
    ['x', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', 'x', 'x', '0'],
    ['0', '0', '0', '0', 'x'],
    ['0', 'x', '0', '0', '0']
];
// let boardArray: string[][] = [
//                                 ['x', '1', '0', '0', '0'],
//                                 ['1', '2', '2', '2', '1'],
//                                 ['0', '2', 'x', 'x', '2'],
//                                 ['1', '2', '3', '3', 'x'],
//                                 ['1', 'x', '1', '1', '1']
//                             ];

const BoardState = React.createContext(boardArray);

const Board = () => {
    const [board, setBoard] = useState(boardArray);
    const [generated, setGenerated] = useState(false);

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
