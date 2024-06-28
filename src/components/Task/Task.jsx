import styles from "./Task.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export const Task = (props) => {
	return (
		<>
			<label className={styles.task}>
				<div className={styles["task__container"]}>
					<input type="checkbox" />
					<span className={styles["task__custom-checkbox"]}></span>
					<Link className={styles["task__title"]} to={`/task/${props.id}`}>
						<span>
							{props.title}
						</span>
					</Link>
				</div>
			</label>
		</>
	);
};

Task.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	refreshPage: PropTypes.func,
};
