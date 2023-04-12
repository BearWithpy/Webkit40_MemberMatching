import React from "react"
import Modal from "react-modal"

Modal.setAppElement("#root")

function DemoModal({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2>Login</h2>
            <form>
                <label>
                    Email:
                    <input type="email" name="email" />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </Modal>
    )
}
export default DemoModal
