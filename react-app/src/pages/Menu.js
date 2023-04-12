import React from 'react';
import {useNavigate} from 'react-router-dom'

function Menu(props) {
    const navigate = useNavigate();
    
    const calendar = () => {
        navigate("/calendar");
    }

    const tasks = () => {
        navigate("/taskView");
    }
    
    return <div id="menu">
        <MenuUserHeader user={props.data.user}></MenuUserHeader>
        <hr></hr>
        <MenuButton text="All Tasks" blah={tasks}></MenuButton>
        <hr></hr>
        <MenuButton text="Calendar" onClick={calendar} blah={calendar}></MenuButton>
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
        <img id="menu-user-image" src={props.user.pfpref} alt=""></img>
        <div id="menu-user-name">{props.user.name}</div>
    </div>
}

function MenuButton(props) {
    return (
    <button className='menu-button' onClick={props.blah}>
        {props.text}
    </button>
    )
}

export {
    Menu
}