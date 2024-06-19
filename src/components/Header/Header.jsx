import Styles from "./Header.module.css";
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

	const closePopup = () => {
		setPopupIsOpened(false);
	};

	return (
		<header className={Styles.header}>
			<div className={Styles["header__logo-container"]}>
				<img
					src="/public/logo.svg"
					alt="logo"
					className={Styles["header__logo"]}
				/>
				<a href="/" className={Styles["header__link"]}>
					Tasker
				</a>
			</div>
			<div className={Styles["header__nav-and-button"]}>
				<nav className={Styles["header__navigation"]}>
					<ul className={Styles["header__nav-list"]}>
						<li className={Styles["header__nav-item"]}>
							Доска
						</li>
						<li className={Styles["header__nav-item"]}>Сроки</li>
						<li className={Styles["header__nav-item"]}>Достижения</li>
					</ul>
				</nav>
				<button className={Styles["header__btn"]} onClick={openPopup}>
					Новая задача
				</button>
			</div>
			<Overlay isOpened={popupIsOpened} closePopup={closePopup} />
			<Popup isOpened={popupIsOpened} сlosePopup={closePopup}>
				<TaskForm
					close={closePopup}
					refreshPage={props.refreshPage}
					operation="add"
				/>
			</Popup>
		</header>
	);
};

Header.propTypes = {
	refreshPage: PropTypes.func,
	isAdded: PropTypes.bool,
};
