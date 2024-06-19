import { useState } from "react"
export const useUpdateTask = (refreshPage) => {
	const [isUpdated, setIsUpdated] = useState(false)

	const updateTask = async (endpoint, id, data) => {
		setIsUpdated(true)

		try {
			await fetch(`${endpoint}/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			})
			refreshPage()
		} catch (err) {
			console.error(err)
		} finally {
			setIsUpdated(false)
		}
	}

	return {
		isUpdated,
		updateTask
	}
}