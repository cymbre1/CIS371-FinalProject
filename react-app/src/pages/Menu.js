import React from 'react';
import { useNavigate } from 'react-router-dom'

function Menu(props) {
    const navigate = useNavigate();
    
    const calendar = () => {
        navigate("/calendar");
    }

    const tasks = () => {
        navigate("/taskView");
    }
    

    const createTaskModal = () => {
        props.modals.createTaskModal.update(true);
    }

    return <div id="menu">
        <MenuUserHeader user={ props.data.user } settingsModal={ props.modals.settingsModal }></MenuUserHeader>
        <hr></hr>
        <MenuButton text="All Tasks" click={ tasks }></MenuButton>
        <hr></hr>
        <MenuButton text="Calendar" click={ calendar }></MenuButton>
        <hr></hr>
        <MenuButton text="Create a Task" click={ createTaskModal }></MenuButton>
        <hr></hr>
        <MenuButton text="My Household"></MenuButton>
        <hr></hr>
    </div>
}

function MenuUserHeader(props) {
    const settingsModal = () => {
        props.settingsModal.update(true);
    }
    return <div id="menu-header">
        <img id="menu-user-image" src={ props.user.pfpref } alt=""></img>
        <div id="menu-user-name">{props.user.name}</div>
        <MenuSettingsButton text="⚙" click={ settingsModal }></MenuSettingsButton>
    </div>
}

function MenuButton(props) {
    return (
    <button className='menu-button' onClick={ props.click } >
        { props.text }
    </button>
    )
}

function MenuSettingsButton(props) {
    return (
    <button id='menu-settings-button' className='menu-button' onClick={ props.click } >
        { props.text }
    </button>
    )
}

export {
    Menu
}