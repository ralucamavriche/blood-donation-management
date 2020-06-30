import React from "react";
const optionsAlert = {
  success:{
    className:'alert alert-success alert-dismissable',
    type:'Well done!'
  },
  warning:{
    className:'alert alert-warning alert-dismissable',
    type:'Warning!'
  },
  info:{
    className:'alert alert-info alert-dismissable',
    type:'Warning!'
  },
  danger:{
    className:'alert alert-danger alert-dismissable',
    type:'Oh snap!'
  },

}
export default function Alert(props) {
  const optionAlert = optionsAlert[props.style] 
  return props.text ? (
    <>
          <div className="alert-group customAlertFixed">
            <div className={optionAlert.className}>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-hidden="true"
                onClick={props.handleClose}
              >
                ×
              </button>
              <strong>{optionAlert.type}</strong> {props.text || ""}
            </div>
          </div>
    </>
  ) : null;
}
