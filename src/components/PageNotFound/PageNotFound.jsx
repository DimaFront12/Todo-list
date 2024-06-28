import styles from "./PageNotFound.module.css";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
	return (
		<main className={styles.pageNotFound}>
			<div className={styles.container}>
				<h1 className={styles.title}>404: Not Found</h1>
				<p className={styles.text}>Данная страница не найдена :(</p>
				<p className={styles.text}>
					Чтобы найти нужную для вас страницу, перейдите обратно на{" "}
					<Link to="/" className={styles.link}>
						главную страницу
					</Link>{" "}
					сайта
				</p>
			</div>
		</main>
	);
};
