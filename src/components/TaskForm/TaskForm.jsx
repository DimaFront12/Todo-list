import styles from "./TaskForm.module.css";
import { useState, useEffect } from "react";
import { useAddTask } from "../../apiHooks/useAddTask";
import { useUpdateTask } from "../../apiHooks/useUpdateTask";
import { endpoints } from "../../api/config";
import PropTypes from "prop-types";

export const TaskForm = (props) => {
	const [todoData, setTodoData] = useState({
		title: "",
		completed: false,
	});
	const [message, setMessage] = useState({ status: null, text: null });

	const { isAdded, addTask } = useAddTask(props.refreshPage);
	const { isUpdated, updateTask } = useUpdateTask(props.refreshPage)

	const handleSubmit = (e) => {
		e.preventDefault();
		if (todoData.title) {
			props.operation === "add" && addTask(endpoints.todos, todoData);
			props.operation === "update" && updateTask(endpoints.todos, props.id, todoData)
			setMessage({ status: "success", text: `Задача ${props.operation === "add" ? "добавлена" : "обновлена"}!` });
		} else {
			setMessage({ status: "error", text: "Введите задачу!" });
		}
	};

	const onChange = (e) => {
		setTodoData({...todoData, [e.target.name]: e.target.value});
	};

	useEffect(() => {
		let timer;
		if (message.status === "success") {
			timer = setTimeout(() => {
				props.close();
				setMessage({ status: null, text: null });
			}, 1000);
		}
		return () => clearTimeout(timer);
	}, [message.status]);

	return (
		<form className={styles["form"]} onSubmit={handleSubmit}>
			<h2 className={styles["form__title"]}>Добавить задачу</h2>
			<div className={styles["form__fields"]}>
				<label className={styles["form__field"]}>
					<span className={styles["form__field-title"]}>Задача</span>
					<input
						onChange={onChange}
						className={styles["form__field-input"]}
						name="title"
						type="text"
						placeholder="Название задачи"
					/>
				</label>
			</div>
			{message.status && (
				<p className={styles["form__message"]}>{message.text}</p>
			)}
			<div className={styles["form__actions"]}>
				<button className={styles["form__reset"]} type="reset">
					Очистить
				</button>
				<button
					className={styles["form__submit"]}
					type="submit"
					disabled={isAdded && isUpdated}
				>
					Добавить задачу
				</button>
			</div>
		</form>
	);
};

TaskForm.propTypes = {
	close: PropTypes.func,
	refreshPage: PropTypes.func,
	operation: PropTypes.string,
	id: PropTypes.number,
};
