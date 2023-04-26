import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import React from 'react'

function TaskViewBase(props) {
    return <>
        <TaskList showModal={props.createTaskModal.state} setShowModal={props.createTaskModal.update} id="tasklist" data={props.data} setTaskData={props.setTaskData} deleteTask={props.deleteTask} user={props.user} ></TaskList>
    </>
}

function TaskList(props) {
    var addTaskButton = () => {
        props.setShowModal(true);
        // props.setTaskData(null);
    }

    const tasks = props.data.tasks.map((i, index) =>
        <Task task={i} users={props.data.users} setTaskData={props.setTaskData} setShowModal={props.setShowModal} deleteTask={props.deleteTask} user={props.user} />
    );

    tasks.unshift(<div id="top-bar"><div class='title'>Tasks</div><button class="add-task-button" onClick={addTaskButton}><FontAwesomeIcon icon={faPlus} size="xl" inverse/></button></div>)

    return <div className="tasks">{tasks}</div>
}

function Task(props) {
    const editTask = e => {
        console.log(props.task);
        props.setTaskData(props.task);
        props.setShowModal(true);
    }

    const deleteTask = e => {
        console.log("DELETE")
        props.setTaskData(props.task);
        props.deleteTask(e, props.task.id);
    }

    console.log("REF", props.task.assignedTo)

    return <div class="task">
            <div class="task-info" id="task-name">
                <div class="task-title">{props.task.title}</div>
                <div class="assignedBy-info">
                    <img id="task-user-image" src={props.users[props.task.assignedTo - 1].pfpref} alt=""></img>
                    <div class="image-words">{props.users[props.task.assignedTo - 1].name}</div>
                </div>
            </div>
            <div class="task-stats">
                <div class="taskText">{`Duration: ${props.task.duration}`}</div>
                <div class="taskText">{`Date: ${props.task.date}`}</div>
            </div>
            <div class="task-operations">
                <div class="created-by-info">
                    <div class="image-words">Created By</div>
                    <img id="task-user-image" src={props.users[props.task.assignedBy - 1].pfpref} alt=""></img>
                </div>
                <div>
                    <button class="crud-button" onClick={ e => deleteTask(e) }><FontAwesomeIcon icon={faTrash} size="xl" inverse/></button>
                    <button class="crud-button" onClick={ e => editTask(e) }><FontAwesomeIcon icon={faEdit} size="xl" inverse/></button>
                </div>
            </div>
        </div>
}

export {
    TaskViewBase
}