import NewPost from "./NewPost";
import "./NewPostContainer.css"
import { useState } from "react";
import { Modal } from '../../context/Modal';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function NewPostContainer(user) {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
            <div id="NewStatusOuterBox">
                <div id="NewStatusButton" onClick={() => setShowModal(true)}>
                    <img src="../../img/default_profile_pic.png"/><span>What's on your mind, {user["user"]?.first_name}?</span>
                </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <NewPost user={user}/>
                    </Modal>
                )}
            </div>
        </>
    )
}

export default NewPostContainer;