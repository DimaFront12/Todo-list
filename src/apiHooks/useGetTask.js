import { useState, useEffect } from "react";
export const useGetTask = (refreshPageFlag, endpoint, id) => {
	const [task, setTasks] = useState(null);

	useEffect(() => {
		const getTasks = async () => {
			try {
				const response = await fetch(`${endpoint}/${id}`);
				const data = await response.json();
				setTasks(data)
			} catch (err) {
				console.error(err);
			}
		}
		getTasks()
	}, [refreshPageFlag, endpoint, id]);

	return task
}