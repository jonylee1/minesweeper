import React from "react";
import styles from './Cell.module.css';

enum CELL_TYPE {
    NUMBER,
    MINE
}

type CellProps = {
    type: string;
    displayText: string;
    x: number;
    y: number;
}

const Cell: React.FunctionComponent<CellProps> = (props) => {
    const [visible, setVisible] = React.useState(false)

    const handleClick = (event: any) => {
        setVisible(!visible);
        event.currentTarget.disabled = true;
        event.currentTarget.classList.add(styles.clicked);
    }

    const handleRightClick = (event: any) => {
        console.log('right-click captured');
        event.preventDefault();
    }

    return (
        <button className={styles.cell} onClick={handleClick} onContextMenu={handleRightClick}>{visible ? props.displayText : ''}</button>
    )
}

export default Cell;
