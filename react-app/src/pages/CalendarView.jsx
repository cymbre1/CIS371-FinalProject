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
        <FullCalendar
        editable="true"
        plugins={[ dayGridPlugin, interactionPlugin ]}
        dateClick={(arg) => {
            console.log(arg)
            var hasEvent = false;
            var newEvents = []
            events.forEach((element) => {
                if(element.date === arg.dateStr && element.title === `Busy`) {
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
        eventDrop={(date) => {
            console.log(date.event)
            // info.event.setDates
            console.log("Do something here to set the data of the task")
        }}   
        // eventChange={(blah) => {console.log(blah.event)}}
         /> </>
}

/* Left Menu */
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


