import Styles from "./TasksList.module.css";
import { Task } from "../Task/Task";
import { Preloader } from "../Preloader/Preloader";
import { useGetTasks } from "../../apiHooks/useGetTasks";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
export const TasksList = (props) => {
	const [valueInput, setValueInput] = useState("");
	const [isSorted, setIsSorted] = useState(false);
	const [filteredArray, setFilteredArray] = useState([]);

	const tasks = useGetTasks(props.refreshPageFlag)

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
		<div className={Styles["tasks-container"]}>
			<h1 className={Styles["tasks-container__title"]}>Задачи</h1>
			{tasks ? (
				<>
					<input
						type="search"
						value={valueInput}
						onChange={onChange}
						className={Styles["tasks-container__search"]}
						placeholder="Поиск задач"
					/>
					<label className={Styles.sort}>
						<input
							type="checkbox"
							checked={isSorted}
							onChange={clickSort}
						/>
						<span
							className={Styles["tasks-container__sort-checkbox"]}
						></span>
						Сортировать по алфавиту
					</label>
					<ul className={Styles["tasks-container__tasks"]}>
						{filteredArray.map((data) => (
							<Task key={data.id} {...data} refreshPage={props.refreshPage} />
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
}