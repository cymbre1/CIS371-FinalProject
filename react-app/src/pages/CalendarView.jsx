import React from "react";

/* Base */
function Base(props) {
    return <>
        <Menu data={props.data}></Menu>
        <div id="container">
            <CalendarGrid indices={[...Array(7 * 6).keys()]} />
        </div>
    </>
}

/* Left Menu */
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



/* Calendar */
function CalendarGrid(props) {
    const cells = props.indices.map((i) =>
        <CalendarCell id={i}></CalendarCell>
    );
    return <div id="grid">
        {cells}
    </div>
}

function CalendarCell(props) {
    return <div id={`cell-${props.id}`} class="cell">
        {props.id}
    </div>
}

export {
    CalendarGrid,
    Base
}


