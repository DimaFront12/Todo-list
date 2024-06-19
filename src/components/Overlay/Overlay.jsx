import Styles from "./Overlay.module.css";
import PropTypes from "prop-types";
export const Overlay = (props) => {
	return (
		<div
			className={`${Styles["overlay"]} ${
				props.isOpened && Styles["overlay_is-opened"]
			}`}
			onClick={props.closePopup}
		></div>
	);
};

Overlay.propTypes = {
	isOpened: PropTypes.bool,
	closePopup: PropTypes.func,
};
