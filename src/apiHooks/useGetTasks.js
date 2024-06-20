import { useState, useEffect } from "react";
import { endpoints } from "../api/config";
export const useGetTasks = (refreshPageFlag) => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const getTasks = async () => {
			try {
				const response = await fetch(endpoints.todos);
				const data = await response.json();
				setTasks(data.sort((a, b) => b.id - a.id));
			} catch (err) {
				console.error(err);
			}
		}
		getTasks()
	}, [refreshPageFlag]);

	return tasks
}