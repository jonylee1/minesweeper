import React from "react";
import Cell from "../cell/Cell.component";
import styles from './Board.module.css';


const Board = () => {
    return (
        <div className={styles.board}>{
            Array.from({ length: 9 }, () => (
                <div className={styles.row}>{
                Array.from({ length: 9}, (_, i) => (
                    <Cell type='number' displayText={i.toString()} />
                ))}</div>
            ))
        }</div>
    );
}

export default Board;
