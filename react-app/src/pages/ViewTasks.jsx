import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import React from 'react'
import {CreateTaskModal} from './CreateTask'

function TaskViewBase(props) {
    return <>
        <Menu data={props.data}></Menu>
        <TaskList id="tasklist" data={props.data}></TaskList>
    </>
}

function Menu(props) {
    return <div id="menu">
        <MenuUserHeader user={props.data.user}></MenuUserHeader>
        <hr></hr>
        <MenuButton text="All Tasks"></MenuButton>
        <hr></hr>
        <MenuButton text="Calendar"></MenuButton>
        <hr></hr>
        <MenuButton text="Create a Task"></MenuButton>
        <hr></hr>
        <MenuButton text="My Household"></MenuButton>
        <hr></hr>
        <MenuButton text="Admin Settings"></MenuButton>
    </div>
}

function MenuUserHeader(props) {
    return <div id="menu-header">
        <img id="menu-user-image" src={props.user.pfpref}></img>
        <div id="menu-user-name">{props.user.name}</div>
    </div>
}

function MenuButton(props) {
    return <div className="menu-button">
        {props.text}
    </div>
}

function TaskList(props) {
    const [showModal, setShowModal] = React.useState();
    var addTaskButton = () => {
        setShowModal(!showModal);
        console.log()
    }

    const tasks = props.data.tasks.map((i, index) =>
        <Task task={i} users={props.data.users} />
    );

    tasks.unshift(<div id="top-bar"><div class='title'>Tasks</div><button class="add-task-button" onClick={addTaskButton}><FontAwesomeIcon icon={faPlus} size="xl" inverse/></button></div>)
    tasks.unshift(<CreateTaskModal showModal={showModal} setShowModal={setShowModal}/>)

    return <div className="tasks">{tasks}</div>
}

function Task(props) {
    return <div class="task">
            <div class="task-info" id="task-name">
                <div class="task-title">{props.task.name}</div>
                <div class="assignee-info">
                    <img id="task-user-image" src={props.users[props.task.assignee - 1].pfpref}></img>
                    <div class="image-words">{props.users[props.task.assignee - 1].name}</div>
                </div>
            </div>
            <div class="task-stats">
                <div class="taskText">Duration: {props.task.duration}</div>
                <div class="taskText">Frequency: {props.task.frequency}</div>
                <div class="taskText">Time: {props.task.desiredTime}</div>
            </div>
            <div class="task-operations">
                <div class="created-by-info">
                    <div class="image-words">Created By</div>
                    <img id="task-user-image" src={props.users[props.task.assigner - 1].pfpref}></img>
                </div>
                <div>
                    <button class="crud-button"><FontAwesomeIcon icon={faTrash} size="xl" inverse/>  </button>
                    <button class="crud-button"><FontAwesomeIcon icon={faEdit} size="xl" inverse/></button>
                </div>
            </div>
        </div>
}

export {
    TaskViewBase
}