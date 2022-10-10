import React, { useEffect } from "react";
import Cell from "../cell/Cell.component";
import styles from './Board.module.css';

// TODO: Add a handler for first click to generate the board.
//       Generate the board
//       Execute the mouse click event on the cell that was clicked.
// TODO: Console output the cells coordinates when we click on a cell.

// const handleFirstClick = (event: any) => {
//     // remove event listener
//     // generate the board
//     // allow cell to process click
//     generateBoard(event);
// }

/**
 * Should be called after the user clicks a cell for the first time
 * @param event 
 */
const generateBoard = (row: number, column: number) => {
    // Take in the cell that was clicked so that we do not place a mine in that cell.
    // Randomly place 10 mines
    // Generate the numbers around the mines.
    console.log('generate board');
    
}

// maybe use a HashMap if the 2-dimensional array thing doesn't pan out
let boardArray: string[][] = [
                                ['x',    '2',    '1'],
                                ['2',    'x',    '1'],
                                ['1',    '1',    '1']
                            ];

const Board = () => {
    let gameStarted = false;

    /**
     * Should be called after every cell is clicked.
     * @param row 
     * @param column 
     */
    const checkBoardState = (row: number, column: number) => {
        console.log(`checkboardstate ${row} x ${column}`);
        console.log(`checkboardstate/generated: ${gameStarted}`);
        if (gameStarted) {
            console.log(`checking cell ${row} x ${column}`);
            // reveal the cell
            // if (boardArray[row][column] === 'x') {
            //     console.log('lose');
            // } else {
            //     console.log('win');
            // }
        } else {
            gameStarted = true;
            // generate board
            generateBoard(row, column);
            checkBoardState(row, column);
        }
    }

    useEffect(() => {

    })

    return (
        <div className={styles.board}>{
            Array.from({ length: 3 }, (_, row) => (
                <div key={`${row}`} className={styles.row}>{
                Array.from({ length: 3}, (_, column) => (
                    <Cell 
                        handleClick={checkBoardState}
                        key={`${row * 3 + column}`}
                        type='number'
                        displayText={boardArray[row][column]}
                        x={column}
                        y={row}
                    />
                ))}</div>
            ))
        }</div>
    );
}

export default Board;
