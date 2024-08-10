import './App.css';
import {Routes, Route} from 'react-router-dom';
import Todo from './components/Todo';

function App() {
  return (
    <>
    <Routes>
    <Route path={'/'} element={<Todo/>}></Route>
    </Routes>
    </>
  );
}

export default App;
