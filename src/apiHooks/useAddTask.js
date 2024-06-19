import { useState } from "react"
export const useAddTask = (refreshPage) => {
	const [isAdded, setIsAdded] = useState(false)

	const addTask = async (endpoint, data) => {
		setIsAdded(true)

		try {
			await fetch(`${endpoint}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			})
			refreshPage()
		} catch (err) {
			console.error(err)
		} finally {
			setIsAdded(false)
		}
	}

	return {
		isAdded,
		addTask
	}
}