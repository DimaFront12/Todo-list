import styles from "./Overlay.module.css";
import PropTypes from "prop-types";
export const Overlay = (props) => {
	return (
		<div
			className={`${styles["overlay"]} ${
				props.isOpened && styles["overlay_is-opened"]
			}`}
			onClick={props.closePopup}
		>
			{props.children}
		</div>
	);
};

Overlay.propTypes = {
	isOpened: PropTypes.bool,
	closePopup: PropTypes.func,
	children: PropTypes.element,
};
