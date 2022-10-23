import React, { useEffect } from "react";
import styles from './Cell.module.css';

enum CELL_TYPE {
    NUMBER,
    MINE
}

type CellProps = {
    handleClick: (a: number, b: number) => void;
    type: 'number' | 'mine';
    displayText: string;
    revealed: boolean;
    disabled: boolean;
    row: number;
    column: number;
}

const Cell = (props: CellProps) => {

    // destructuring variables from props
    const {handleClick, type, displayText, revealed, disabled, row, column} = props;

    const localHandleClick = (event: any) => {
        console.log('clicked')
        handleClick(row, column);
    }

    const handleRightClick = (event: any) => {
        console.log('right-click captured');
        // TODO: cycle through flag and question mark
        event.preventDefault();
    }

    // useEffect(() => {
    //     console.log(`cell ${props.x} x ${props.y} use effect triggers`);
    // });

    return (
        <button className={`${styles.cell} ${revealed ? styles.clicked : null}`} disabled={revealed || disabled} onClick={localHandleClick} onContextMenu={handleRightClick}>
            {revealed ? displayText : ''}
        </button>
    )
}

export default Cell;
