import styles from "./TaskPage.module.css";
import { useState, useEffect } from "react";
import { useGetTask } from "../../apiHooks/useGetTask";
import { Preloader } from "../Preloader/Preloader";
import { useParams, useNavigate } from "react-router-dom";
import { endpoints } from "../../api/config";
import { Overlay } from "../Overlay/Overlay";
import { Popup } from "../Popup/Popup";
import { TaskForm } from "../TaskForm/TaskForm";
import { useDeleteTask } from "../../apiHooks/useDeleteTask";
import PropTypes from "prop-types";
export const TaskPage = (props) => {
	const navigate = useNavigate();
	const params = useParams();

	const task = useGetTask(props.refreshPageFlag, endpoints.todos, params.id);

	const [popupIsOpened, setPopupIsOpened] = useState(false);

	const { isDeleted, deleteTask } = useDeleteTask(props.refreshPage);

	useEffect(() => {
		let timeout = setTimeout(() => {
			if (!task.title) {
				navigate("/task-not-found", { replace: true });
			}
		}, 2500);

		return () => {
			clearTimeout(timeout)
		}
	}, [task, navigate]);

	const openPopup = () => {
		setPopupIsOpened(true);
	};

	const closeTargetPopup = (e) => {
		if (e.target === e.currentTarget) setPopupIsOpened(false);
	};

	const closePopup = () => {
		setPopupIsOpened(false);
	};

	const handleBack = () => {
		navigate(-1);
	};

	const handleDeleteTask = () => {
		deleteTask(endpoints.todos, params.id);
		navigate("/", { replace: true });
	};

	return (
		<main className={styles["task-container"]}>
			<div className={styles["task-container-inner"]}>
				<h1 className={styles["task-container__title"]}>Задача</h1>
				{task && task.title ? (
					<div className={styles["task-container__info"]}>
						<div className={styles["task-container__desc"]}>
							<p className={styles["task-container__text"]}>
								{task.title}
							</p>
						</div>
						<div className={styles["task-container__buttons"]}>
							<button
								className={styles["task-container__back"]}
								onClick={handleBack}
							>
								Назад
							</button>
							<button
								className={styles["task-container__update"]}
								onClick={openPopup}
							>
								Редактировать
							</button>
							<button
								className={styles["task-container__delete"]}
								onClick={handleDeleteTask}
								disabled={isDeleted}
							>
								Удалить
							</button>
						</div>
					</div>
				) : (
					<Preloader />
				)}
			</div>
			{popupIsOpened && (
				<Overlay isOpened={popupIsOpened} closePopup={closeTargetPopup}>
					<Popup isOpened={popupIsOpened} сlosePopup={closePopup}>
						<TaskForm
							close={closePopup}
							refreshPage={props.refreshPage}
							operation="update"
							id={params.id}
							text={task.title}
						/>
					</Popup>
				</Overlay>
			)}
		</main>
	);
};

TaskPage.propTypes = {
	refreshPageFlag: PropTypes.bool,
	refreshPage: PropTypes.func,
};
