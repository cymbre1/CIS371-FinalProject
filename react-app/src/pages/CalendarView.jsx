import React from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from "react";

/* Base */
function Base(props) {
    const [events, setEvents] = useState(props.data.tasks.map((task, index) => ({
        title: task.name, date: `2023-04-0${index}`
    })));
    // var tasks  = [];

    // for(var task in props.data.tasks) {
    //     events.push({title: props.data.tasks[task].name, date: `2023-04-0${task}`});
    // }

    return <>
        <Menu data={props.data}></Menu>
        <FullCalendar
        editable="true"
        plugins={[ dayGridPlugin, interactionPlugin ]}
        dateClick={(arg) => {
            console.log(arg)
            var hasEvent = false;
            var newEvents = []
            events.forEach((element) => {
                console.log(`${element.date} and ${arg.dateStr}`)
                if(element.date === arg.dateStr && element.title === `Busy`) {
                    console.log("EQUAL")
                    hasEvent = true;
                } else if(element.date === arg.dateStr && element.title !== `Busy`){ 
                    hasEvent = true;
                    newEvents.push(element);
                } else {
                    newEvents.push(element);
                }
            });
            if(!hasEvent) {
                setEvents([...events, { title: `Busy`, date: arg.dateStr }]);
            } else {
                setEvents(newEvents);
            }
        }}
        events={events}
        selectable="true"
        droppable={"true"}
        eventDrop={info => {
            console.log("Do something here to set the data of the task")
        }}   
         /> </>
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

