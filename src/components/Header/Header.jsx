import styles from "./Header.module.css";
import { Overlay } from "../Overlay/Overlay";
import { Popup } from "../Popup/Popup";
import { TaskForm } from "../TaskForm/TaskForm";
import { useState } from "react";
import PropTypes from "prop-types";

export const Header = (props) => {
	const [popupIsOpened, setPopupIsOpened] = useState(false);

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

	return (
		<header className={styles.header}>
			<div className={styles["header__logo-container"]}>
				<img
					src="/public/logo.svg"
					alt="logo"
					className={styles["header__logo"]}
				/>
				<a href="/" className={styles["header__link"]}>
					Tasker
				</a>
			</div>
			<div className={styles["header__nav-and-button"]}>
				<nav className={styles["header__navigation"]}>
					<ul className={styles["header__nav-list"]}>
						<li className={styles["header__nav-item"]}>Доска</li>
						<li className={styles["header__nav-item"]}>Сроки</li>
						<li className={styles["header__nav-item"]}>
							Достижения
						</li>
					</ul>
				</nav>
				<button className={styles["header__btn"]} onClick={openPopup}>
					Новая задача
				</button>
			</div>
			{popupIsOpened && (
					<Overlay isOpened={popupIsOpened} closePopup={closeTargetPopup}>
					<Popup isOpened={popupIsOpened} сlosePopup={closePopup}>
						<TaskForm
							close={closePopup}
							refreshPage={props.refreshPage}
							operation="add"
						/>
					</Popup>
					</Overlay>
			)}
		</header>
	);
};

Header.propTypes = {
	refreshPage: PropTypes.func,
	isAdded: PropTypes.bool,
};
