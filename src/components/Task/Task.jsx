import Styles from "./Task.module.css";
import PropTypes from "prop-types";
import { Overlay } from "../Overlay/Overlay";
import { Popup } from "../Popup/Popup";
import { TaskForm } from "../TaskForm/TaskForm";
import { useDeleteTask } from "../../apiHooks/useDeleteTask";
import { endpoints } from "../../api/config";
import { useState } from "react";
export const Task = (props) => {
	const [popupIsOpened, setPopupIsOpened] = useState(false);

	const { isDeleted, deleteTask } = useDeleteTask(props.refreshPage);

	const openPopup = () => {
		setPopupIsOpened(true);
	};

	const closePopup = () => {
		setPopupIsOpened(false);
	};


	const handleDeleteTask = () => {
		deleteTask(endpoints.todos, props.id);
	};

	return (
		<>
			<label className={Styles.task}>
				<div className={Styles["task__container"]}>
					<input type="checkbox" />
					<span className={Styles["task__custom-checkbox"]}></span>
					<span className={Styles["task__title"]}>{props.title}</span>
				</div>
				<div className={Styles["task__buttons"]}>
					<button className={Styles["task__button"]} onClick={openPopup}>
						Редактировать
					</button>
					<button
						className={Styles["task__button"]}
						onClick={handleDeleteTask}
						disabled={isDeleted}
					>
						Удалить
					</button>
				</div>
			</label>
			<Overlay isOpened={popupIsOpened} closePopup={closePopup} />
			<Popup isOpened={popupIsOpened} сlosePopup={closePopup}>
				<TaskForm
					close={closePopup}
					refreshPage={props.refreshPage}
					operation="update"
					id={props.id}
				/>
			</Popup>
		</>
	);
};

Task.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	refreshPage: PropTypes.func,
};
