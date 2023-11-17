import "./WallHeader.css"
import { useState } from "react";
import { Modal } from '../../context/Modal';
import EditProfileModal from "./EditProfileModal";

function WallHeader(user) {
    const [showModal, setShowModal] = useState(false);
    const [hasCoverPhoto, setHasCoverPhoto] = useState(false);
    const [coverPhotoPath, setCoverPhotoPath] = useState("../../img/cover_photo.png");
    const [profilePicturePath, setProfilePicturePath] = useState("../../img/default_profile_pic.png");

    const changeCoverPhoto = () => {

    }

    const openEditProfileModal = () => {

    }

    let changeCoverPhotoMsg = "Add cover photo";
    if (hasCoverPhoto) changeCoverPhotoMsg = "Change cover photo"

    return (
        <>
            <div id="profile-banner">
                <div id="cover-photo-banner">
                    <img src={coverPhotoPath} id="cover-photo"/>
                    <div id="outer-profile-pic">
                        <img src={profilePicturePath} id="profile-pic"/>
                    </div>
                    <div id="change-cover-photo-button" onClick={changeCoverPhoto}>
                        <i id="change-cover-photo-camera-icon"></i>
                        <span>{changeCoverPhotoMsg}</span>
                    </div>
                </div>
                <div id="profile-name-banner">
                    <h2>{user["user"].first_name}&nbsp;{user["user"].last_name}</h2>
                    <div id="edit-profile-link" onClick={() => setShowModal(true)}>
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/lYApul5-WxY.png"/><span>Edit Profile</span>
                    </div>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <EditProfileModal />
                        </Modal>
                    )}
                </div>
            </div>
        </>
    )
}

export default WallHeader;