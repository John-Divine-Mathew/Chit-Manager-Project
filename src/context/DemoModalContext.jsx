import React, { createContext, useContext, useState } from 'react';
import BookDemoModal from '../components/BookDemoModal';

// oxlint-disable-next-line react/only-export-components
export const DemoModalContext = createContext();

export const DemoModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDemoModal = () => setIsOpen(true);
  const closeDemoModal = () => setIsOpen(false);

  return (
    <DemoModalContext.Provider value={{ isOpen, openDemoModal, closeDemoModal }}>
      {children}
      <BookDemoModal isOpen={isOpen} onClose={closeDemoModal} />
    </DemoModalContext.Provider>
  );
};

// oxlint-disable-next-line react/only-export-components
export const useDemoModal = () => {
  const context = useContext(DemoModalContext);
  if (!context) {
    throw new Error('useDemoModal must be used within a DemoModalProvider');
  }
  return context;
};

export default DemoModalContext;
