import React, { useEffect, useState } from "react";
import Cell from "../cell/Cell.component";
import styles from './Board.module.css';



/**
 * Should be called after the user clicks a cell for the first time
 * @param event 
 */
const generateBoard = (row: number, column: number) => {

    console.log('generate board');
    
}

// maybe use a HashMap if the 2-dimensional array thing doesn't pan out
let boardArray: string[][] = [
                                ['x', '1', '0', '0', '0'],
                                ['1', '2', '2', '2', '1'],
                                ['0', '2', 'x', 'x', '2'],
                                ['1', '2', '3', '3', 'x'],
                                ['1', 'x', '1', '1', '1']
                            ];

const BoardState = React.createContext(boardArray);



const Board = () => {
    const [board, setBoard] = useState(boardArray);
    const [cell, setCell] = useState(boardArray[0][1]);

    /**
     * Should be called after every cell is clicked.
     * @param row 
     * @param column 
     */
    const checkBoardState = (row: number, column: number) => {
        boardArray[0][1] = (parseInt(boardArray[0][1]) + 1).toString();
        setBoard([...boardArray]);
        //setCell((parseInt(boardArray[0][1]) + 1).toString());
        
        // if (boardArray[row][column] === 'x') {
        //     // lost
        // } else {
            
        // }
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

    useEffect(() => {

    })

    return (
        <div className={styles.board}>{initializeBoard()}</div>
    );
}

export default Board;
