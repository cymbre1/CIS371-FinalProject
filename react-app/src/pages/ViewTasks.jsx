import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import React from 'react'

function TaskViewBase(props) {

    return <>
        <TaskList showModal={props.showModal} setShowModal={props.setShowModal} id="tasklist" data={props.data}></TaskList>
    </>
}

function TaskList(props) {
    var addTaskButton = () => {
        console.log(props.setShowModal)
        props.setShowModal(!props.showModal);
    }

    const tasks = props.data.tasks.map((i, index) =>
        <Task task={i} users={props.data.users} />
    );

    tasks.unshift(<div id="top-bar"><div class='title'>Tasks</div><button class="add-task-button" onClick={addTaskButton}><FontAwesomeIcon icon={faPlus} size="xl" inverse/></button></div>)

    return <div className="tasks">{tasks}</div>
}

function Task(props) {
    return <div class="task">
            <div class="task-info" id="task-name">
                <div class="task-title">{props.task.name}</div>
                <div class="assignee-info">
                    <img id="task-user-image" src={props.users[props.task.assignee - 1].pfpref} alt=""></img>
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
                    <img id="task-user-image" src={props.users[props.task.assigner - 1].pfpref} alt=""></img>
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