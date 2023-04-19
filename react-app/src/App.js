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
    fetch(`${apiUrl}/viewTasks?timeout`)
      .then( response => response.json() )
      .then( data => {
        setUserData(userData => ({ ...userData, tasks: data }));
        console.log("fetchTasks: ", data);
      } )
      .catch( err => console.error(err) );
  };

  let fetchUsers = () => {
    fetch( `${apiUrl}/getUsers?timeout=1000` )
      .then( response => response.json() )
      .then( data => setUserData( userData => ({ ...userData, users: data }) ) )
      .catch( err => console.error(err) );
  };

  // copied from https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
  }

  
  
  const defaultTaskData = {
    id: undefined,
    name: undefined,
    date: undefined,
    duration: undefined,
    durationMultiplier: "1"
  };
  const [taskData, setTaskData] = React.useState(defaultTaskData);

  // const [editing, setEditing] = React.useState();
  
  function submit(event) {
    event.preventDefault();
    modals.createTaskModal.update(false);
    console.log("submit: ", taskData);
    fetch(`${apiUrl}/postTask`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        name: taskData.name,
        date: taskData.date,
        duration: taskData.duration * taskData.durationMultiplier
      }), // body data type must match "Content-Type" header
    })
      .then( response => response.json() )
      .then( data => setUserData( userData => ({ ...userData, tasks: [ ...userData.tasks, data ] }) ) )
      .catch( err => console.error(err) );
      setTaskData(defaultTaskData);
    }

  function onEdit(event) {
    event.preventDefault();
    modals.createTaskModal.update(false);
    fetch(`${apiUrl}/editTask/${taskData.id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        id: taskData.id,
        name: taskData.name,
        date: taskData.date,
        duration: taskData.duration * taskData.durationMultiplier,
        assignedBy: 1,
        assignedTo: 1
      }), // body data type must match "Content-Type" header
    })
      .then( response => response.json() )
      .then( data => setUserData( userData => ({ ...userData, tasks: userData.tasks.reduce((partial, item) => {
        console.log("partial", partial);
        return partial.concat(item.id === taskData.id ? data : item);
      }, []) }) ) )
      .catch( err => console.error(err) );
      setTaskData(defaultTaskData);
  }

  function deleteTask(event, id) {
    console.log("ID", id);
    event.preventDefault();
    fetch(`${apiUrl}/deleteTask/${id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        id: id,
        name: "",
        date: "",
        duration: taskData.duration * taskData.durationMultiplier,
        assignedBy: 1,
        assignedTo: 1
      }), // body data type must match "Content-Type" header
    })
      .then( response => response.json() )
      .then( data => setUserData( userData => ({ ...userData,  tasks: userData.tasks.reduce((partial, item) => {
        console.log("partial", partial);
        return item.id !== id ? partial.concat(item) : partial;
      }, []) }) ) )
      .catch( err => console.error(err) );
      setTaskData(defaultTaskData);
  }

  function updateFormData(formData) {
    setTaskData({
      ...taskData,
      ...formData
    });
    console.log("updateFormData: ", taskData);
  }

  function cancel(event) {
    event.preventDefault();
    setTaskData({ defaultTaskData });
    modals.createTaskModal.update(false);
    console.log("cancel: ", taskData);
    // setTaskData(defaultTaskData);
  }

  React.useEffect(fetchUsers, []);
  React.useEffect(fetchTasks, []);

  const modal = function (state, update, crud) { return { state: state, update: update, crud: crud }; };
  const modals = {
    createTaskModal: modal(...React.useState(), { updateFormData, submit, cancel, onEdit }),
    settingsModal: modal(...React.useState())
  };

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path='/createAccount' element={<CreateAcct></CreateAcct>}></Route>
      <Route path="/" element={<PageLayout data={userData} modals={ modals } taskData={taskData} />}>
        <Route path="calendar" element={<Base data={ userData } />}></Route>
        <Route path="taskView" element={<TaskViewBase data={ userData } createTaskModal={ modals.createTaskModal } taskData={taskData} setTaskData={setTaskData} deleteTask={deleteTask} />}></Route>
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
        <CreateTaskModal createTaskModal={props.modals.createTaskModal} taskData={props.taskData} />
        <Menu data={ props.data } modals={ props.modals }></Menu><Outlet />
    </LayoutContainer>
    </>
  )
}

export default App;
