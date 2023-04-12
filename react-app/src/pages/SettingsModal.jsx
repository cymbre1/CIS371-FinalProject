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

export const SettingsModal = ({ showModal, setShowModal }) => {
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
            
    return (
        <>
            {showModal ? (
                <Background onClick={ closeModal } ref={ modalRef }>
                    <animated.div style={ animation }>
                        <ModalWrapper showModal={ showModal }>
                            <ModalContent>
                                <h1>Update Profile</h1>
                                <div>
                                    <label for="name">Full Name: </label>
                                    <input id="taskname" type="text"></input>
                                </div>
                                <div>
                                    <label for="email">Email: </label>
                                    <input id="email" type="text"></input>
                                </div>
                                <div>
                                    <label for="pfp">Profile Image: </label>
                                    <input id="pfp" type="file"></input>
                                </div>
                                <div>
                                    <button  id="cancel" onClick={ () => setShowModal(false) }>Cancel</button>
                                    <button id="update" >Update</button>
                                </div>
                            </ModalContent>
                            <CloseModalButton
                                aria-label='Close modal'
                                onClick={ () => setShowModal(false) }
                            />
                        </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
        </>
    );
};