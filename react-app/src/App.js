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
import { SettingsModal } from './pages/SettingsModal';

function App(props) {

  const modal = function (state, update) { return { state: state, update: update }; };
  const modals = {
    createTaskModal: modal(...React.useState()),
    settingsModal: modal(...React.useState())
  };

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path='/createAccount' element={<CreateAcct></CreateAcct>}></Route>
      <Route path="/" element={<PageLayout data={props.data} modals={ modals }/>}>
        <Route path="calendar" element={<Base data={ props.data } />}></Route>
        <Route path="taskView" element={<TaskViewBase data={ props.data } createTaskModal={ modals.createTaskModal }/>}></Route>
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
        <SettingsModal showModal={ props.modals.settingsModal.state } setShowModal={ props.modals.settingsModal.update }></SettingsModal>
        <CreateTaskModal showModal={ props.modals.createTaskModal.state } setShowModal={ props.modals.createTaskModal.update }/>
        <Menu data={ props.data } modals={ props.modals }></Menu><Outlet />
    </LayoutContainer>
    </>
  )
}

export default App;
