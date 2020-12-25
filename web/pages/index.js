import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}></main>

      <footer className={styles.footer}>
        <a
          href='https://www.gffny.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by gffny.com
        </a>
      </footer>
    </div>
  )
}
