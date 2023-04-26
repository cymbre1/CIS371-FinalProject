// Code taken and modified from https://reactjsguru.com/how-to-make-popup-modal-in-react/
import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import {useNavigate} from 'react-router-dom';

const apiUrl = 'http://ec2-3-17-192-117.us-east-2.compute.amazonaws.com'

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

export const SettingsModal = ({ showModal, setShowModal, userData, setUserData, user, setUser  }) => {
    const navigate = useNavigate();

    const modalRef = useRef();
    const defaultUser = userData.users[user - 1];
    const [settings, setSettings] = React.useState(defaultUser);
    
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

    function onSubmitSettings(event) {
        setShowModal(false);
        event.preventDefault();
        fetch(`${apiUrl}/changeUser/${user}`, {
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
            name: settings.name,
            email: settings.email,
            password: settings.password
          }), // body data type must match "Content-Type" header
        })
          .then( response => response.json() )
          .then( data => {
            setUserData( userData => ({ ...userData, users: userData.users.reduce((partial, item) => {
                return partial.concat(item.id === user ? {name: data.name, email: data.email, password: data.password, pfpref: item.pfpref, id: item.id} : item);
            }, []) }) );
          })
    
          .catch( err => console.error(err) );
      }
    
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
                                    <input id="taskname" type="text" onChange={e => setSettings({...settings, name: e.target.value})} value={settings.name}></input>
                                </div>
                                <div>
                                    <label for="email">Email: </label>
                                    <input id="email" type="text" onChange={e => setSettings({...settings, email: e.target.value})} value={settings.email}></input>
                                </div>
                                <div>
                                    <label for="pfp">Password: </label>
                                    <input id="pfp" type="password" onChange={e => setSettings({...settings, password: e.target.value})} value={settings.password}></input>
                                </div>
                                <div>
                                    <button  id="cancel" onClick={ () => setShowModal(false) }>Cancel</button>
                                    <button id="update" onClick={e => onSubmitSettings(e)}>Update</button>
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