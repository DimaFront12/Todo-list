import { Header } from "./components/Header/Header";
import { TasksList } from "./components/TasksList/TaskList";
import { useState } from "react";
function App() {
	const [refreshPageFlag, setRefreshPageFlag] = useState(false);
	const refreshPage = () => setRefreshPageFlag(!refreshPageFlag);
	return (
		<>
			<Header refreshPage={refreshPage}/>
			<TasksList refreshPageFlag={refreshPageFlag} refreshPage={refreshPage}/>
		</>
	);
}

export default App;
