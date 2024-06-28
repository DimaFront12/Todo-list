import styles from "./TaskNotFound.module.css"
import { Link } from "react-router-dom"
export const TaskNotFound = () => {
	return (
		<main className={styles.pageNotFound}>
			<div className={styles.container}>
				<h1 className={styles.title}>404: Task not found</h1>
				<p className={styles.text}>Данная задача не найдена :(</p>
				<p className={styles.text}>Чтобы найти нужную для вас задачу, перейдите обратно на <Link to="/" className={styles.link}>главную страницу</Link> сайта</p>
			</div>
		</main>
	)
}