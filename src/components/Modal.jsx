import '../styles/modal.scss'

const Modal = ({ isOpen, closeModal, children }) => {
    if (!isOpen) {
        return null;
    }

    return <div className="modal">
        <div className="content">
            {children}
            <button className="btn btn-dark" onClick={closeModal}>Close</button>
        </div>
    </div>;
}

export default Modal;
