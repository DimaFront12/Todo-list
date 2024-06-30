import { RefreshPageContext } from "./context/refreshPageContext"
import { Header } from "./components/Header/Header";
import { TasksList } from "./components/TasksList/TaskList";
import { useState } from "react";
function App() {
	const [refreshPageFlag, setRefreshPageFlag] = useState(false);
	const refreshPage = () => setRefreshPageFlag(!refreshPageFlag);
	return (
		<RefreshPageContext.Provider value={{refreshPageFlag, refreshPage}}>
			<Header/>
			<TasksList refreshPageFlag={refreshPageFlag} refreshPage={refreshPage}/>
		</RefreshPageContext.Provider>
	);
}

export default App;
