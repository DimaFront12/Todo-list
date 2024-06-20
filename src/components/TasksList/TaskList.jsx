import styles from "./TasksList.module.css";
import { Task } from "../Task/Task";
import { Preloader } from "../Preloader/Preloader";
import { useGetTasks } from "../../apiHooks/useGetTasks";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
export const TasksList = (props) => {
	const [valueInput, setValueInput] = useState("");
	const [isSorted, setIsSorted] = useState(false);
	const [filteredArray, setFilteredArray] = useState([]);

	const tasks = useGetTasks(props.refreshPageFlag);

	useEffect(() => {
		if (!tasks) {
			return;
		}

		const filteredTasks = tasks.filter((todo) =>
			todo.title.toLowerCase().includes(valueInput.toLowerCase().trim())
		);

		if (isSorted) {
			filteredTasks.sort((a, b) => {
				const textA = a.title.toLowerCase();
				const textB = b.title.toLowerCase();
				return textA < textB ? -1 : textA > textB ? 1 : 0;
			});
		}

		setFilteredArray(filteredTasks);
	}, [tasks, valueInput, isSorted]);

	const clickSort = () => {
		setIsSorted(!isSorted);
	};

	const onChange = (e) => {
		setValueInput(e.target.value);
	};

	return (
		<div className={styles["tasks-container"]}>
			<h1 className={styles["tasks-container__title"]}>Задачи</h1>
			{tasks.length > 0 ? (
				<>
					<input
						type="search"
						value={valueInput}
						onChange={onChange}
						className={styles["tasks-container__search"]}
						placeholder="Поиск задач"
					/>
					<label className={styles.sort}>
						<input
							type="checkbox"
							checked={isSorted}
							onChange={clickSort}
						/>
						<span
							className={styles["tasks-container__sort-checkbox"]}
						></span>
						Сортировать по алфавиту
					</label>
					<ul className={styles["tasks-container__tasks"]}>
						{filteredArray.map((data) => (
							<li key={data.id}>
								<Task
									{...data}
									refreshPage={props.refreshPage}
								/>
							</li>
						))}
					</ul>
				</>
			) : (
				<Preloader />
			)}
		</div>
	);
};

TasksList.propTypes = {
	refreshPageFlag: PropTypes.bool,
	setRefreshPageFlag: PropTypes.func,
	refreshPage: PropTypes.func,
};
