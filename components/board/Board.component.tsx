import React from "react";
import Cell from "../cell/Cell.component";
import styles from './Board.module.css';


const Board = () => {
    return (
        <div className={styles.board}>{
            Array.from({ length: 9 }, (_, row) => (
                <div className={styles.row}>{
                Array.from({ length: 9}, (_, column) => (
                    <Cell key={`${row * 9 + column}`} type='number' displayText={(row * 9 + column).toString()} />
                ))}</div>
            ))
        }</div>
    );
}

export default Board;
