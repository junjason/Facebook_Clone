import NewPost from "./NewPost";
import "./NewPostContainer.css"
import { useState } from "react";
import { Modal } from '../../context/Modal';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function NewPostContainer() {
    const { userId } = useParams();
    const user = useSelector(state => state.users[userId]);
    const currentUser = useSelector(state => state.session.user);

    const isFriend = currentUser && user && currentUser.friend_ids.includes(user.id);

    const [showModal, setShowModal] = useState(false);
    const placeholder = isFriend ? `Write something to ${user?.first_name}...` : `What's on your mind, ${user?.first_name}?`;
    
    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
            {currentUser && user && (currentUser.id === user.id || user?.friend_status === "True") && 
                <div id="NewStatusOuterBox">
                    <div id="NewStatusButton" onClick={() => setShowModal(true)}>
                        {user?.profile_photo_url && <img src={user?.profile_photo_url} alt={user?.first_name} />}
                        <span>{placeholder}</span>
                    </div>
                    {showModal && (
                        <Modal onClose={closeModal}>
                            <NewPost closeModal={closeModal} />
                        </Modal>
                    )}
                </div>
            }
        </>
    )
}

export default NewPostContainer;
