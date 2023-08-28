import React from 'react';
import useConfirm from '../hooks/useConfirm';

const ConfirmDialog = () => {
  const { onConfirm, onCancel, text, isVisible } = useConfirm();

  return (
    <>
      {isVisible && (
        <>
          <div class="modal-backdrop fade show"></div>

          <div className={`modal ${isVisible ? 'd-block' : ''}`} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <p>{text}</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onConfirm}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={onCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ConfirmDialog;
