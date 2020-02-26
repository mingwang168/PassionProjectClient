import React from 'react';
import Modal from 'react-modal';
let dayNumber;

const ModalChangeSchedule = (props) => {

    return (
        <Modal ClassName="modal"
            isOpen={props.open}
            onRequestClose={() => { props.handleChangeSchedule(false) }}
            contentLabel="Confirm Removing all things to do">
            <p className="modalTittle">Change Your Schedule To</p>
            <label className="modalLable">Word number to learn per day : &nbsp;</label>
            <input style={{width:50}}type="text" id="dayNumber" required></input>
            <p>{props.err}</p>
            <br/>
            <div className="modalbtn">
            <button className="btn-warning modalbtn" onClick={() => { dayNumber=document.getElementById('dayNumber').value;props.handleChangeSchedule(true,dayNumber) }}>Submit</button>
            <button className="btn-warning modalbtn" onClick={() => { props.handleChangeSchedule(false,dayNumber) }}>Cancel</button>
            </div>
        </Modal>
    );
}

Modal.setAppElement('#root');

export default ModalChangeSchedule;