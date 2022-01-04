import "./styles.css";
import Form from './components/Form';
import List from './components/List';
import {GlobalProvider} from "./context/GlobalState"

const App = () => {
 
  return (
    <GlobalProvider>
      <div className="App">
        <Form />
        <List />
      </div>
    </GlobalProvider>
  );
};

export default App;