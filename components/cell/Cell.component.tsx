import React from "react";
import styles from './Cell.module.css';

type CellProps = {
    type: string;
    displayText: string;
}

const Cell: React.FunctionComponent<CellProps> = (props) => {
    const [hidden, setHidden] = React.useState(true)

    const toggleHidden = (event: any) => {
        setHidden(!hidden);
        event.currentTarget.disabled = true;
    }

    return (
        <button className={styles.cell} onClick={toggleHidden}>{hidden ? '' : props.displayText}</button>
    )
}

export default Cell;
