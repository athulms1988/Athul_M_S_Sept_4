import { Button, Modal } from "react-bootstrap";

const Dialog = ({dialogData, handleChange}) => {
    const handleClose = () => handleChange(false);
    const handleConfirm = () => handleChange(true);
    return (
        <>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete {dialogData.type}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete the {dialogData.type.toLowerCase()} <b> {dialogData.description} </b> ?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};
export default Dialog;

