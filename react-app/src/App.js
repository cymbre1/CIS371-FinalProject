import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom'
import { Base } from './pages/CalendarView';
import { TaskViewBase } from './pages/ViewTasks';
import {Menu} from './pages/Menu';
import {Login} from './pages/LoginView';
import {CreateAcct} from './pages/CreateAccountView';
import styled from 'styled-components';
import React from 'react';
import { CreateTaskModal } from './pages/CreateTask';

function App(props) {
  const [showModal, setShowModal] = React.useState();

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path='/createAccount' element={<CreateAcct></CreateAcct>}></Route>
      <Route path="/" element={<PageLayout data={props.data} showModal={showModal} setShowModal={setShowModal}/>}>
        <Route path="calendar" element={<Base data={ props.data } />}></Route>
        <Route path="taskView" element={<TaskViewBase data={props.data} showModal={showModal} setShowModal={setShowModal} />}></Route>
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
        <CreateTaskModal showModal={props.showModal} setShowModal={props.setShowModal}/>
        <Menu data={props.data} showModal={props.showModal} setShowModal={props.setShowModal}></Menu><Outlet />
    </LayoutContainer>
    </>
  )
}

export default App;
