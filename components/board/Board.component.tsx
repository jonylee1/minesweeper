import React from "react";
import Cell from "../cell/Cell.component";
import styles from './Board.module.css';

// TODO: Add a handler for first click to generate the board.
// TODO: Console output the cells coordinates when we click on a cell.

const firstClick = () => {
    console.log('you clicked me');
}

const Board = () => {
    return (
        <div className={styles.board} onClick={firstClick}>{
            Array.from({ length: 9 }, (_, row) => (
                <div key={`${row}`} className={styles.row}>{
                Array.from({ length: 9}, (_, column) => (
                    <Cell 
                        key={`${row * 9 + column}`}
                        type='number'
                        displayText={(row * 9 + column).toString()}
                        x={row}
                        y={column}
                    />
                ))}</div>
            ))
        }</div>
    );
}

export default Board;
