import { useState } from "react"
export const useDeleteTask = (refreshPage) => {
	const [isDeleted, setIsDeleted] = useState(false)

	const deleteTask = async (endpoint, id) => {
		setIsDeleted(true)

		try {
			await fetch(`${endpoint}/${id}`, {
				method: "DELETE"
			})
			refreshPage()
		} catch (err) {
			console.error(err)
		} finally {
			setIsDeleted(false)
		}
	}

	return {
		isDeleted,
		deleteTask
	}
}