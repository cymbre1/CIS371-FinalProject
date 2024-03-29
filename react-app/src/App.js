import './App.css';
import {BrowserRouter, Outlet, Route, Routes, useNavigate} from 'react-router-dom'
import { Base } from './pages/CalendarView';
import { TaskViewBase } from './pages/ViewTasks';
import {Menu} from './pages/Menu';
import {Login} from './pages/LoginView';
import {CreateAcct} from './pages/CreateAccountView';
import styled from 'styled-components';
import React from 'react';
import { CreateTaskModal } from './pages/CreateTask';
import { SettingsModal } from './pages/SettingsModal';

const apiUrl = 'http://ec2-3-17-192-117.us-east-2.compute.amazonaws.com'

function App() {
  const [userData, setUserData] = React.useState({
   users: [],
   tasks: []
  });

  const [user, setUser] = React.useState();

  let fetchTasks = () => {
    fetch(`${apiUrl}/viewTasks?timeout`)
      .then( response => response.json() )
      .then( data => {
        setUserData(userData => ({ ...userData, tasks: data }));
      } )
      .catch( err => console.error(err) );
  };

  let fetchUsers = () => {
    fetch( `${apiUrl}/getUsers?timeout=1000` )
      .then( response => response.json() )
      .then( data => setUserData( userData => ({ ...userData, users: data }) ) )
      .catch( err => console.error(err) );
  };

  const defaultTaskData = {
    id: undefined,
    title: undefined,
    date: undefined,
    duration: undefined,
    durationMultiplier: "1",
    assignedBy: 1,
    assignedTo: 2
  };
  const [taskData, setTaskData] = React.useState(defaultTaskData);

  function submit(event) {
    console.log("ASSIGNED TO ",  taskData.assignedTo)
    event.preventDefault();
    modals.createTaskModal.update(false);
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
        title: taskData.title,
        date: taskData.date,
        duration: taskData.duration * taskData.durationMultiplier,
        assignedBy: user,
        assignedTo: taskData.assignedTo
      }), // body data type must match "Content-Type" header
    })
      .then( response => response.json() )
      .then( data => {
        setUserData( userData => ({ ...userData, tasks: [ ...userData.tasks, data ] }) ) 
      } )
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
        title: taskData.title,
        date: taskData.date,
        duration: taskData.duration * taskData.durationMultiplier,
        assignedBy: user,
        assignedTo: taskData.assignedTo
      }), // body data type must match "Content-Type" header
    })
      .then( response => response.json() )
      .then( data => {
        setUserData( userData => ({ ...userData, tasks: userData.tasks.reduce((partial, item) => {
          return partial.concat(item.id === taskData.id ? data : item);
        }, []) }) ) 
      })
      .catch( err => console.error(err) );
      setTaskData(defaultTaskData);
  }

  function deleteTask(event, id) {
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
        title: "",
        date: "",
        duration: taskData.duration * taskData.durationMultiplier,
      }), // body data type must match "Content-Type" header
    })
      .then( response => response.json() )
      .then( data => setUserData( userData => ({ ...userData,  tasks: userData.tasks.reduce((partial, item) => {
        console.log("Hi");
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
  }

  function cancel(event) {
    event.preventDefault();
    setTaskData({ defaultTaskData });
    modals.createTaskModal.update(false);
  }

  React.useEffect(fetchUsers, []);
  React.useEffect(fetchTasks, []);

  const modal = function (state, update, crud) { return { state: state, update: update, crud: crud }; };
  const modals = {
    createTaskModal: modal(...React.useState(), { updateFormData, submit, cancel, onEdit }),
    settingsModal: modal(...React.useState(false))
  };

  return (
    <BrowserRouter basename="/CIS371-FinalProject">
    <Routes>
      <Route path="/login" element={<Login setUser={ setUser }></Login>}></Route>
      <Route path='/createAccount' element={<CreateAcct setUserData={setUserData} userData={userData} setUser={setUser} ></CreateAcct>}></Route>
      <Route path="/" element={<PageLayout data={userData} modals={ modals } taskData={taskData} user={user} userData={userData} setUserData={setUserData} />}>
        <Route path="calendar" element={<Base userData={ userData } setUserData={setUserData} onEdit={modals.createTaskModal.crud.onEdit} setTaskData={setTaskData} />}></Route>
        <Route path="taskView" element={<TaskViewBase data={ userData } createTaskModal={ modals.createTaskModal } taskData={taskData} setTaskData={setTaskData} deleteTask={deleteTask} user={user} />}></Route>
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
  const navigate = useNavigate()
  if(typeof props.user === 'undefined')
  {
    navigate("/login");
    return;
  }

  return (
    <>
      <LayoutContainer>
        <SettingsModal showModal={ props.modals.settingsModal.state } setShowModal={ props.modals.settingsModal.update } user={props.user} setUser={props.setUser} userData={props.userData} setUserData={props.setUserData}></SettingsModal>
        <CreateTaskModal createTaskModal={props.modals.createTaskModal} taskData={props.taskData} userData={props.userData} />
        <Menu data={ props.data } modals={ props.modals } user={ props.user }></Menu><Outlet />
    </LayoutContainer>
    </>
  )
}

export default App;
