import Styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/todos")
			.then((data) => data.json())
			.then((todos) => setTasks(todos))
			.catch((error) => console.error(error));
	}, []);

	return (
		<div className={Styles["tasks-container"]}>
			<h1 className={Styles["tasks-title"]}>Daily tasks</h1>
			<div className={Styles.tasks}>
				{tasks.map(({ id, title }) => (
					<label key={id}>
						<input type="checkbox"/>
						<span className={Styles["custom-checkbox"]}></span>
						{title}
					</label>
				))}
			</div>
		</div>
	);
}

export default App;
