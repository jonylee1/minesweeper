import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Board from '../components/board/Board.component'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Board />
      </div>
    </div>
  )
}

export default Home
