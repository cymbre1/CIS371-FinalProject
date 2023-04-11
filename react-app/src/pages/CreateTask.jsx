import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 100%;
  right: 50%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
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
      transform: showModal ? `translateY(0%)` : `translateY(-100%)`
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
                  {/* <ModalImg src={require('./modal.jpg')} alt='camera' /> */}
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
                        <button>Cancel</button>
                        <button>Create Task</button>
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

// function CreateTaskModal() {

// }

// export {
//     CreateTaskModal
// }