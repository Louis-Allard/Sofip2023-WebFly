import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../reducers';
import '../scss/_deletemodal.scss';

const DeleteModal = (props) => {
    const dispatch = useDispatch();

    const setModalClosed = () => {
        dispatch(setModal(false));
    };

    return (
        <Modal className="deletemodal" isOpen={useSelector((state) => state.Reducers.modalOpen)}>
            <p>{props.text}</p>
            <div>
                <button className="yes">Oui</button>
                <button className="no" onClick={setModalClosed}>Non</button>
            </div>
        </Modal>
    );
}

export default DeleteModal;