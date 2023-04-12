import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom'
import { Base } from './pages/CalendarView';
import { TaskViewBase } from './pages/ViewTasks';
import {Menu} from './pages/Menu'
import styled from 'styled-components';

function App(props) {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<PageLayout data={props.data}/>}>
        <Route path="calendar" element={<Base data={ props.data } />}></Route>
        <Route path="taskView" element={<TaskViewBase data={props.data} />}></Route>
      </Route> 
    </Routes>
    </BrowserRouter>
  );
}

const LayoutContainer = styled.div `
  display: flex;
  flex-grow: 1;
`

function PageLayout(props) {
  return (
    <>
    <LayoutContainer>
        <Menu data={props.data}></Menu><Outlet />
    </LayoutContainer>
    </>
  )
}

export default App;
