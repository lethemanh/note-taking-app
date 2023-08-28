import React from 'react';

function Alert(props) {
  const capitalize = word => {
    if (word === 'danger') {
      word = 'error';
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div
      style={
        {
          height: '50px',
        } /* to prevent layout shift when alert is shown we ahve added a div element */
      }
    >
      {
        // to prevent error ="cannot read property of null " we need to use "props.alert &&" the end operator will ensure that 2nd argument that is div wala is read only when prop.alert!= false
        props.alert && (
          <div
            className={`alert alert-${props.alert.type} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
          </div>
        )
      }
    </div>
  );
}
export default Alert;
