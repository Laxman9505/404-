import React from "react";
import "./Modal.css";
import CancelIcon from "@material-ui/icons/Cancel";
export default function Modal(props) {
  return (
    <React.Fragment>
      <div className="modal-overlay" />
      <div className={`${props.className} Modal`}>
        <CancelIcon className="closeIcon" onClick={props.closeModal} />
        {props.children}
      </div>
      "
    </React.Fragment>
  );
}
