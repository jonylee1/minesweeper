import React, { useEffect } from "react";
import styles from './Cell.module.css';

enum CELL_TYPE {
    NUMBER,
    MINE
}

type CellProps = {
    handleClick: (a: number, b: number) => void;
    type: string;
    displayText: string;
    x: number;
    y: number;
    
}

const Cell = (props: CellProps) => {
    const [visible, setVisible] = React.useState(false)


    const localHandleClick = (event: any) => {
        console.log(`localHandleClick for cell ${props.x} x ${props.y}`);
        setVisible(!visible);
        event.currentTarget.disabled = true;
        event.currentTarget.classList.add(styles.clicked);
        props.handleClick(props.x, props.y);
    }

    const handleRightClick = (event: any) => {
        console.log('right-click captured');
        event.preventDefault();
    }

    // useEffect(() => {
    //     console.log(`cell ${props.x} x ${props.y} use effect triggers`);
    // });

    return (
        <button className={styles.cell} onClick={localHandleClick} onContextMenu={handleRightClick}>{visible ? props.displayText : ''}</button>
    )
}

export default Cell;
