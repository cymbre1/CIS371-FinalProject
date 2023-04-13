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

const apiUrl = 'http://localhost:3001'

function App() {

  const userData = {
     user: {
      id: 1,
      name: "Chase Kinard",
      pfpref: "pfp/chase-kinard.png"
    },
    
    users: [
      {
        id: 1,
        name: "Chase Kinard",
        pfpref: "pfp/chase-kinard.png"
      },
      {
        id: 2,
        name: "Cymbre Spoehr",
        pfpref: "pfp/cymbre-spoehr.jpg"
      }
    ],
  
    tasks: [
      { name: "Clean out the fridge", id: 1, assigner: 1, assignee: 2, duration: 60, frequency: "weekly", desiredTime: "7:00, Monday" },
      { name: "Sweep the basement", id: 2, assigner: 2, assignee: 1, duration: 30, frequency: "biweekly", desiredTime: "any" },
      { name: "Organize the garage", id: 3, assigner: 2, assignee: 1, duration: 30, frequency: "biweekly", desiredTime: "any" }
    ]
  };

  let fetchUsers = () => {
    console.log("BLAHHH")
    fetch(`${apiUrl}/viewTasks?timeout=1000`).then(response => {
      console.log("HELLO")
      console.log(response)
    }).then(data => {
      console.log("And the JSON");
      console.log(data);

      userData.tasks = data
  
      // data.forEach((color) => color.color = intToColor(color.color))   
      // console.log("Color data after fixing up the hex values:")
      // console.log(data)

      // setMessage(undefined)
      // setColors(data)
      // setLoading(false)
    }).catch (problem => {
      // setLoading(false)
      // setMessage("Unable to load colors from the server.")
    });
  }

  // console.log("AFTER")

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
      <Route path="/" element={<PageLayout data={userData} modals={ modals }/>}>
        <Route path="calendar" element={<Base data={ userData } />}></Route>
        <Route path="taskView" element={<TaskViewBase data={ userData } createTaskModal={ modals.createTaskModal }/>}></Route>
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
