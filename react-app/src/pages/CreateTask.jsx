// Code taken and modified from https://reactjsguru.com/how-to-make-popup-modal-in-react/

import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose, MdFaceRetouchingNatural } from 'react-icons/md';

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
        onCancel = props.createTaskModal.crud.cancel,
        onSubmit = props.createTaskModal.crud.submit,
        onChange = props.createTaskModal.crud.updateFormData,
        onEdit = props.createTaskModal.crud.onEdit;
    const modalRef = useRef();
    
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

    console.log(props.userData);

    let namesAsHTML = props.userData.users.map((value) => {
        console.log("VAL", value);
        return <option>{value.name}</option>;
    })

    return (
        <>
            {showModal ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <animated.div style={animation}>
                        <ModalWrapper showModal={showModal}>
                        <ModalContent>
                            <h1>Create a Task</h1>
                            <form>
                            <div>
                                <label for="name">Task Name: </label>
                                <input id="name" type="text" onChange={ e => onChange({ title: e.target.value })} value={props.taskData.title ?? ""}></input>
                            </div>
                            <div>
                                <label for="date">Date: </label>
                                <input id="date" type="date" onChange={ e => onChange({ date: e.target.value })} value={props.taskData.date ?? "yy-MM-dd"}></input>
                            </div>
                            <div>
                                <label for="duration">Duration: </label>
                                <input id="duration" type="number" onChange={ e => onChange({ duration: e.target.value }) } value={props.taskData.duration ?? ""}></input>
                                <select id="duration-multiplier" type="number" onChange={ e => onChange({ durationMultiplier: e.target.options[e.target.selectedIndex].value }) }>
                                    <option value="1" selected>Minutes</option>
                                    <option value="60">Hours</option>
                                </select>
                            </div>
                            <div>
                                <label for="assignTo">Assign To: </label>
                                <select id="assignTo" onChange={e => onChange({assignedTo: e.target.selectedIndex + 1})}>{namesAsHTML}</select>
                            </div>
                            <div>
                                <button  id="cancel" type="button" onClick={e => onCancel(e)}>Cancel</button>
                                <button id="create" type="submit" onClick={e => props.taskData.id === undefined ? onSubmit(e) : onEdit(e, props.taskData.id)} >Create Task</button>
                            </div>
                            </form>
                        </ModalContent>
                        <CloseModalButton
                            aria-label='Close modal'
                            onClick={e => onCancel(e)}
                        />
                        </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
        </>
    );
};