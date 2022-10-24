import React, { useState } from "react";
import Cell from "../cell/Cell.component";
import styles from './Board.module.css';

export type CellState = {
    value: string;
    isRevealed: boolean;
    isDisabled: boolean;
}


// holds the mines and numbers in our board
let boardArray: CellState[][] = Array.from({ length: 9 }, () => (
                                    Array.from({ length: 9 }, () => (
                                        ({value: '0', isRevealed: false, isDisabled: false})
                                    ))
                                ));

const Board = () => {
    // TODO: learn how to explain React Hooks
    const [board, setBoard] = useState(boardArray);
    const [generated, setGenerated] = useState(false);
    const [minesToGenerate, setMinesToGenerate] = useState(10);
    const [totalCells, setTotalCells] = useState(81);
    const [gameEnded, setGameEnded] = useState(false);

    /**
     * Should be called after the user clicks a cell for the first time
     * @param event 
     */
    const generateBoard = (row: number, column: number) => {
        let mineCounter = 0;

        do {
            // randomly generate a row and column
            let randRow = Math.floor(Math.random() * 8);
            let randColumn = Math.floor(Math.random() * 8);
            if (!(randRow === row && randColumn === column) && boardArray[randRow][randColumn].value !== 'x') {
                // it is not the cell we clicked
                mineCounter++;
                boardArray[randRow][randColumn].value = 'x'
                // increment the counter of the cells around it
                for (var genRow = randRow - 1; genRow < randRow + 2; genRow++) {
                    for (var genColumn = randColumn - 1; genColumn < randColumn + 2; genColumn++) {
                        if ((genRow >= 0 && genRow < 9) && (genColumn >= 0 && genColumn < 9) && (boardArray[genRow][genColumn].value !== 'x')) {
                            boardArray[genRow][genColumn].value = (parseInt(boardArray[genRow][genColumn].value) + 1).toString();
                        }
                    }
                }
            }
        } while (mineCounter < minesToGenerate);
    }

    /**
     * Should be called after every cell is clicked.
     * @param row 
     * @param column 
     */
    const checkBoardState = (row: number, column: number) => {
        if (!generated) {
            generateBoard(row, column);
            boardArray[row][column].isRevealed = true;
            setBoard([...boardArray]);
            // if currentCell = 0, reveal surrounding cells
            if (boardArray[row][column].value === '0') {
                revealSurroundingCells(row, column);
            }
            setGenerated(true);
        } else {
            // check win/lose
            const cellValue = boardArray[row][column].value;
            boardArray[row][column].isRevealed = true;
            setBoard([...boardArray]);
            if (cellValue === 'x') {
                // lost
                setGameEnded(true);

                // disable the board
                for (let iterRow = 0; iterRow < 9; iterRow++) {
                    for (let iterColumn = 0; iterColumn < 9; iterColumn++) {
                        boardArray[iterRow][iterColumn].isDisabled = true;
                        // reveal the mines
                        if (boardArray[iterRow][iterColumn].value === 'x') {
                            boardArray[iterRow][iterColumn].isRevealed = true;
                        }
                    }
                }
            } else {
                // if currentCell = 0, reveal surrounding cells
                if (cellValue === '0') {
                    revealSurroundingCells(row, column);
                }

                // check if all non-mines are clicked
                let revealedCells = 0;
                for (let row = 0; row < 9; row++) {
                    for (let column = 0; column < 9; column++) {
                        if (boardArray[row][column].value !== 'x' && boardArray[row][column].isRevealed === true) {
                            revealedCells++;
                        }
                    }
                }

                if ((revealedCells + minesToGenerate) === totalCells) {
                    // win
                    alert('you won!');
                    setGameEnded(true);
                }
            }
        }
    }

    const revealSurroundingCells = (row: number, column: number) => {
        for (var genRow = row - 1; genRow < row + 2; genRow++) {
            for (var genColumn = column - 1; genColumn < column + 2; genColumn++) {
                // check that it is within the bounds and it is not already revealed
                if ((genRow >= 0 && genRow < 9) && (genColumn >= 0 && genColumn < 9) && (!boardArray[genRow][genColumn].isRevealed)) {
                    boardArray[genRow][genColumn].isRevealed = true;
                    if (boardArray[genRow][genColumn].value === '0') {
                        revealSurroundingCells(genRow, genColumn);
                    }
                }
            }
        }
    }

    const initializeBoard = () => {
        return Array.from({ length: 9 }, (_, row) => (
            <div key={`${row}`} className={styles.row}>{
            Array.from({ length: 9}, (_, column) => (
                <Cell 
                    handleClick={checkBoardState}
                    key={`${row * 9 + column}`}
                    type='number'
                    displayText={board[row][column].value}
                    row={row}
                    column={column}
                    revealed={board[row][column].isRevealed}
                    disabled={board[row][column].isDisabled}
                />
            ))}</div>
        ))
    }

    const resetBoard = () => {
        for (let row = 0; row < 9; row++) {
            for (let column = 0; column < 9; column++) {
                boardArray[row][column].value = '0';
                boardArray[row][column].isDisabled = false;
                boardArray[row][column].isRevealed = false;
                setBoard(boardArray);
                setGenerated(false);
                setGameEnded(false);
            }
        }
    }

    return (
        <div className={styles.board}>
            <div>{initializeBoard()}</div>
            <button style={{display: gameEnded ? 'block' : 'none' }} className={styles.button} onClick={resetBoard}>Reset Game</button>
        </div>
        
    );
}

export default Board;
