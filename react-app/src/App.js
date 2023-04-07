import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Base } from './pages/CalendarView';
import { EmptyPlaceholder } from './pages/ViewTasks';

function App(props) {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/calendar" element={<Base data={ props.data } />}></Route>
      <Route path="/taskView" element={<EmptyPlaceholder data={props.data} />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
