import styles from "./Task.module.css";
import PropTypes from "prop-types";
import { Overlay } from "../Overlay/Overlay";
import { Popup } from "../Popup/Popup";
import { TaskForm } from "../TaskForm/TaskForm";
import { useDeleteTask } from "../../apiHooks/useDeleteTask";
import { endpoints } from "../../api/config";
import { useState, useContext } from "react";
import { RefreshPageContext } from "../../context/refreshPageContext";
export const Task = (props) => {
	const [popupIsOpened, setPopupIsOpened] = useState(false);

	const { refreshPage } = useContext(RefreshPageContext)

	const { isDeleted, deleteTask } = useDeleteTask(refreshPage);

	const openPopup = () => {
		setPopupIsOpened(true);
	};

	const closeTargetPopup = (e) => {
		if (e.target === e.currentTarget)
		setPopupIsOpened(false);
	};

	const closePopup = () => {
		setPopupIsOpened(false);
	};

	const handleDeleteTask = () => {
		deleteTask(endpoints.todos, props.id);
	};

	return (
		<>
			<label className={styles.task}>
				<div className={styles["task__container"]}>
					<input type="checkbox" />
					<span className={styles["task__custom-checkbox"]}></span>
					<span className={styles["task__title"]}>{props.title}</span>
				</div>
				<div className={styles["task__buttons"]}>
					<button
						className={styles["task__button"]}
						onClick={openPopup}
					>
						Редактировать
					</button>
					<button
						className={styles["task__button"]}
						onClick={handleDeleteTask}
						disabled={isDeleted}
					>
						Удалить
					</button>
				</div>
			</label>
			{popupIsOpened && (
					<Overlay isOpened={popupIsOpened} closePopup={closeTargetPopup}>
					<Popup isOpened={popupIsOpened} сlosePopup={closePopup}>
						<TaskForm
							close={closePopup}
							operation="update"
							id={props.id}
							text={props.title}
						/>
					</Popup>
					</Overlay>
			)}
		</>
	);
};

Task.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
};
