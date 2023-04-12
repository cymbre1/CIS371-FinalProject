// Code taken and modified from https://reactjsguru.com/how-to-make-popup-modal-in-react/

import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

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

const ModalWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: var(--color-BlackCoral);
  color: var(--color-WetPaper);
  position: relative;
  z-index: 10;
  border-radius: 10px;
  padding: 30px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  max-width: max-content;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    margin: 5px;
    background: var(--color-PrussianBlue);
    color: #fff;
    border: solid 1px white;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const CreateTaskModal = ({ showModal, setShowModal }) => {
    const modalRef = useRef();
  
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
  
    const closeModal = e => {
      if (modalRef.current === e.target) {
        setShowModal(false);
      }
    };

    const keyPress = useCallback(
        e => {
          if (e.key === 'Escape' && showModal) {
            setShowModal(false);
            console.log('I pressed');
          }
        },
        [setShowModal, showModal]
      );
    
      useEffect(
        () => {
          document.addEventListener('keydown', keyPress);
          return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    return (
        <>
          {showModal ? (
            <Background onClick={closeModal} ref={modalRef}>
              <animated.div style={animation}>
                <ModalWrapper showModal={showModal}>
                  <ModalContent>
                    <h1>Create a Task</h1>
                    <div>
                        <label for="taskname">Task Name: </label>
                        <input id="taskname" type="text"></input>
                    </div>
                    <div>
                        <label for="frequency-number">Frequency: </label>
                        <input id="frequency-number" type="number"></input>
                        <label for="frequency-repeating"> per </label>
                        <select id="frequency-repeating" type="number">
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                            <option value="Year">Year</option>
                        </select>
                    </div>
                    <div>
                        <label for="estimated-time">Estimated Time: </label>
                        <input id="estimated-time" type="number"></input>
                        <select id="time-type" type="number">
                            <option value="minutes">Minutes</option>
                            <option value="hours">Hours</option>
                        </select>
                    </div>
                    <div>
                        <button  id="cancel" onClick={() => setShowModal(prev => !prev)}>Cancel</button>
                        <button id="create" >Create Task</button>
                    </div>
                  </ModalContent>
                  <CloseModalButton
                    aria-label='Close modal'
                    onClick={() => setShowModal(prev => !prev)}
                  />
                </ModalWrapper>
              </animated.div>
            </Background>
          ) : null}
        </>
      );
    };