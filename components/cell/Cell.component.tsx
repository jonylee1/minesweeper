import React, { useEffect, useState } from "react";
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
    const [statusMarker] = useState(['', '🚩', '❓']);
    const [status, setStatus] = useState(statusMarker[0]);
    const [statusIncrement, setStatusIncrement] = useState(0);

    // destructuring variables from props
    const {handleClick, type, displayText, revealed, disabled, row, column} = props;

    const localHandleClick = (event: any) => {
        event.preventDefault();
        if (status === statusMarker[1]) return;
        handleClick(row, column);
    }

    const handleRightClick = (event: any) => {
        event.preventDefault();
        setStatusIncrement((statusIncrement + 1) % 3);
    }

    useEffect(() => {
        setStatus(statusMarker[statusIncrement]);
        if (revealed || disabled) {
            setStatusIncrement(0);
        }
    },[disabled, revealed, statusMarker, statusIncrement]);

    return (
        <button className={`${styles.cell} ${revealed ? styles.clicked : null}`} disabled={revealed || disabled} onClick={localHandleClick} onContextMenu={handleRightClick}>
            {revealed ? displayText : status}
        </button>
    )
}

export default Cell;
