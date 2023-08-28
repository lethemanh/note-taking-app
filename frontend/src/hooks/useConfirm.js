import { useContext } from 'react';
import ConfirmationContext from '../context/confirmation/confirmationContext';

let resolveCallback;
function useConfirm() {
  const { showConfirmation, hideConfirmation, changeText, isVisible, text } =
    useContext(ConfirmationContext);

  const onConfirm = () => {
    hideConfirmation();
    resolveCallback(true);
  };

  const onCancel = () => {
    hideConfirmation();
    resolveCallback(false);
  };

  const confirm = text => {
    showConfirmation();
    changeText(text);
    return new Promise((res, rej) => {
      resolveCallback = res;
    });
  };

  return { confirm, onConfirm, onCancel, isVisible, text };
}

export default useConfirm;
