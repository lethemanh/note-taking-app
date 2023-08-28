import { useState } from 'react';
import ConfirmationContext from './confirmationContext';

const ConfirmationState = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');

  const showConfirmation = () => {
    setIsVisible(true);
  };

  const hideConfirmation = () => {
    setIsVisible(false);
  };

  const changeText = payload => {
    setText(payload);
  };

  return (
    <ConfirmationContext.Provider
      value={{
        isVisible,
        text,
        showConfirmation,
        hideConfirmation,
        changeText,
      }}
    >
      {' '}
      {
        props.children // i.e this will be available to all children of it
      }
    </ConfirmationContext.Provider>
  );
};
export default ConfirmationState;
