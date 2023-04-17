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

const apiUrl = 'http://localhost:3002'

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
    console.log("Fetching tasks from database...");
    fetch(`${apiUrl}/viewTasks?timeout`).then(response => {
      console.log("  in fetchTasks##fetch.then...");
      console.log("  response", response);
      return response.json();
    }).then(data => {
      console.log("  in fetchTasks##fetch.then.then...");
      console.log("  data", data);
      setUserData(userData => ({ ...userData, tasks: data }))
    }).catch (problem => {
      console.log("  error fetching tasks...");
    });
  }

  let fetchUsers = () => {
    console.log("Fetching users from database...")
    fetch(`${apiUrl}/getUsers?timeout=1000`).then(response => {
      console.log("  in fetchUsers##fetch.then...")
      console.log("  response", response)
      return response.json();
    }).then(data => {
      console.log("  in fetchUsers##fetch.then.then...");
      console.log("  data", data);
      setUserData(userData => ({ ...userData, users: data }))
    }).catch (problem => {
      console.log("  error fetching users...")
    });
  }

  // copied from https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
  }


  const addNewTask = (taskName, taskDuration, taskFrequencyNum, taskFrequencyWord, estTimeNum, estTimeWord) => {
    const newTasks = [...userData.tasks];
  };

  const submit = e => {
      e.preventDefault();
      console.log("Submit!");
      console.log(taskName, taskDate, taskDuration, taskDurationMultiplier);
  }
  

  React.useEffect(fetchUsers, []);
  React.useEffect(fetchTasks, []);

  const modal = function (state, update, crud) { return { state: state, update: update, crud: crud }; };
  const modals = {
    createTaskModal: modal(...React.useState(), { addNewTask, submit }),
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
        <CreateTaskModal createTaskModal={props.modals.createTaskModal} />
        <Menu data={ props.data } modals={ props.modals }></Menu><Outlet />
    </LayoutContainer>
    </>
  )
}

export default App;
