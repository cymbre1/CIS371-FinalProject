// Code taken and modified from https://reactjsguru.com/how-to-make-popup-modal-in-react/

import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

/* Dim behind modal. */
const Background = styled.div`
background: rgba(0, 0, 0, 0.8);
position: absolute;
top: 0;
bottom: 0;
left: 0;
right: 0;
display: flex;
justify-content: center;
align-items: center;
z-index: 1;
`;

/* Modal background. */
const ModalWrapper = styled.div`
width: 100%;
max-width: max-content;
padding: 1.5em;
border: 1px outset var(--color-WetPaper);
border-radius: 0.5em;
background: var(--color-BlackCoral);
color: var(--color-WetPaper);
z-index: 10;
position: absolute;
transform: translate(-50%, -50%);
left: 50%;
`;

const ModalContent = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
line-height: 1.8;
div { 
    display: flex;
    width: 100%;
    align-items: center;
}
div > label {
    flex: 3;
    align-text: left;
}
div > input {
    flex: 5;
}
button {
    flex: 1;
    padding: 1em;
    margin: 1.5em 0.5em 0.5em;
    background: var(--color-PrussianBlue);
    color: var(--color-WetPaper);
    border: 1px inset var(--color-WetPaper);
    border-radius: 0.5em;
}
button:hover { filter: brightness(85%); }
button:active { border 1px outset var(--color-WetPaper) }
`;

const CloseModalButton = styled(MdClose)`
cursor: pointer;
position: absolute;
top: 1em;
right: 1em;
width: 2em;
height: 2em;
padding: 0;
z-index: 10;
`;

export const CreateTaskModal = (props) => {
    const showModal = props.createTaskModal.state,
        setShowModal = props.createTaskModal.update,
        onNewTask = props.createTaskModal.crud.addNewTask;
    console.log("In CreateTask##CreateTaskModal...");
    console.log("  onNewTask", onNewTask);
    const modalRef = useRef();
    const [taskName, setTaskName] = React.useState();
    const [taskDuration, setTaskDuration] = React.useState();
    const [taskFrequencyNum, setTaskFrequencyNum] = React.useState();
    const [taskFrequencyWord, setTaskFrequencyWord] = React.useState();
    const [estTimeNum, setEstTimeNum] = React.useState();
    const [estTimeWord, setEstTimeWord] = React.useState();


    
    /* Animate page open. */
    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
        position: 'fixed',
        left: 0,
        right: 0
    });
    
    /* Escape modal on background click? */
    const closeModal = function (e) {
        if (modalRef.current === e.target) { setShowModal(false); }
    };
    
    /* Escape modal on ESC keypress. */
    const keyPress = useCallback(
        function (e) {
            if (e.key === 'Escape' && showModal) { setShowModal(false); }
        },
        [setShowModal, showModal]
    );
    useEffect(
        function() {
            document.addEventListener('keydown', keyPress);
            return function() { document.removeEventListener('keydown', keyPress); }
        },
        [keyPress]
    );

    const submit = e => {
        e.preventDefault();
        console.log("Submit!");
        console.log(taskName, taskDuration, taskFrequencyNum, taskFrequencyWord, estTimeNum, estTimeWord);
        onNewTask();
        setShowModal(false);
        // onNewTask(taskName, taskDuration, taskFrequencyNum, taskFrequencyWord, estTimeNum, estTimeWord);
        // setTitle("");
        // setColor("#000000");
    }

    return (
        <>
            {showModal ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <animated.div style={animation}>
                        <ModalWrapper showModal={showModal}>
                        <ModalContent>
                            <h1>Create a Task</h1>
                            <form onSubmit={submit}>
                            <div>
                                <label for="taskname">Task Name: </label>
                                <input id="taskname" type="text" onChange={ e => setTaskName(e.target.value) }></input>
                            </div>
                            <div>
                                <label for="frequency-number">Frequency: </label>
                                <input id="frequency-number" type="number" onChange={ e => setTaskFrequencyNum(e.target.value) }></input>
                                <label for="frequency-repeating"> per </label>
                                <select id="frequency-repeating" type="number">
                                    <option value="week">Week</option>
                                    <option value="month">Month</option>
                                    <option value="year">Year</option>
                                </select>
                            </div>
                            <div>
                                <label for="estimated-time">Estimated Time: </label>
                                <input id="estimated-time" type="number" onChange={ e => setEstTimeNum(e.target.value) }></input>
                                <select id="time-type" type="number">
                                    <option value="minutes">Minutes</option>
                                    <option value="hours">Hours</option>
                                </select>
                            </div>
                            <div>
                                <button  id="cancel" onClick={() => setShowModal(false)}>Cancel</button>
                                <button id="create" >Create Task</button>
                            </div>
                            </form>
                        </ModalContent>
                        <CloseModalButton
                            aria-label='Close modal'
                            onClick={() => setShowModal(false)}
                        />
                        </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
        </>
    );
};