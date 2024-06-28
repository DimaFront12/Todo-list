import { Header } from "./components/Header/Header";
import { TasksList } from "./components/TasksList/TaskList";
import { TaskPage } from "./components/TaskPage/TaskPage";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import { TaskNotFound } from "./components/TaskNotFound/TaskNotFound";
import { useState } from "react";
import { Routes, Route, Navigate, useMatch } from "react-router-dom";
function App() {
	const [refreshPageFlag, setRefreshPageFlag] = useState(false);
	const refreshPage = () => setRefreshPageFlag(!refreshPageFlag);

	const taskNotFoundUrl = useMatch("/task-not-found")
	const pageNotFoundUrl = useMatch("/404")
	return (
		<>
			{ (!taskNotFoundUrl && !pageNotFoundUrl) && <Header refreshPage={refreshPage} /> }
			<Routes>
				<Route
					path="/"
					element={
						<TasksList
							refreshPageFlag={refreshPageFlag}
							refreshPage={refreshPage}
						/>
					}
				/>
				<Route path="/task/:id" element={<TaskPage refreshPage={refreshPage} refreshPageFlag={refreshPageFlag}/>}/>
				<Route path="/task-not-found" element={<TaskNotFound />} />
				<Route path="/404" element={<PageNotFound />} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</>
	);
}

export default App;
