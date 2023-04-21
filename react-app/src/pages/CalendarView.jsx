import React from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from "react";

const apiUrl = 'http://localhost:3002'

/* Base */
function Base(props) {

    function onEdit(task, date) {
        // event.preventDefault();
        fetch(`${apiUrl}/editTask/${task.id}`, {
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
            id: task.id,
            title: task.title,
            date: date,
            duration: task.duration * task.durationMultiplier,
            assignedBy: task.assignedBy,
            assignedTo: task.assignedTo
          }), // body data type must match "Content-Type" header
        })
          .then( response => response.json() )
          .then( data => {
            props.setUserData( userData => ({ ...props.userData, tasks: props.userData.tasks.reduce((partial, item) => {
              return partial.concat(item.id === task.id ? data : item);
            }, []) }) ) 
          })
          .catch( err => console.error(err) );
      }

    console.log("EVENTS ", props.userData);

    return <>
        <FullCalendar
        editable="true"
        plugins={[ dayGridPlugin, interactionPlugin ]}
        events={props.userData.tasks}
        selectable="true"
        droppable={"true"}
        eventDrop={(date) => {
            let task = {};

            props.userData.tasks.forEach(e => {
                if(e.title === date.event.title) {
                    task = e;
                }
            });

            onEdit(task, date.event.startStr);
        }}   
         /> </>
}

/* Left Menu */
function MenuUserHeader(props) {
    return <div id="menu-header">
        <img id="menu-user-image" src={props.user.pfpref}></img> 
        <div id="menu-user-name">{props.user.title}</div>
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


