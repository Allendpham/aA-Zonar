import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './userMenuModal.css';

const ModalContexts = React.createContext();

export function ModalsProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContexts.Provider value={value}>
        {children}
      </ModalContexts.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modals({ onClose, children }) {
  const modalNode = useContext(ModalContexts);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal-userMenu">
      <div id="modal-background-userMenu" onClick={onClose} />
      <div id="modal-userMenu">
        {children}
      </div>
    </div>,
    modalNode
  );
}
