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
  const [userData, setUserData] = React.useState({
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

   tasks: []
  });


  let fetchTasks = () => {
    console.log("BLAHHH")
    fetch(`${apiUrl}/viewTasks?timeout`).then(response => {
      console.log("HELLO")
      console.log(response)
      return response.json();
    }).then(data => {
      console.log("And the JSON");
      console.log(data);
      setUserData(userData => ({ ...userData, tasks: data }))
    }).catch (problem => {
      console.log("OH NO")
    });
  }

  let fetchUsers = () => {
    console.log("BLAHHH")
    fetch(`${apiUrl}/getUsers?timeout=1000`).then(response => {
      console.log("HELLO")
      console.log(response)
      return response.json();
    }).then(data => {
      console.log("And the JSON");
      console.log(data);
      setUserData(userData => ({ ...userData, users: data }))
    }).catch (problem => {
      console.log("OH NO")
    });
  }

  // copied from https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
  }


  const addNewTask = (taskName, taskDuration, taskFrequencyNum, taskFrequencyWord, estTimeNum, estTimeWord) => {
    
    // clone the array of current colors
    const newTasks = [...userData.tasks]
    // add new color to the beginning of the list
    // newTasks.unshift({
    //   id: uuidv4(),
    //   rating: 0,
    //   taskName,
    //   taskDuration
    // })
    // console.log(newColors[0].id)
    // setColors(newColors)
  }

  React.useEffect(fetchUsers, []);
  React.useEffect(fetchTasks, []);

  console.log("AFTER")

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
