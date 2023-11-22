import "./WallHeader.css";
import { useState } from "react";
import { Modal } from '../../context/Modal';
import EditProfileModal from "./EditProfileModal";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FriendButton from "./FriendButton";
import RemoveFriendButton from "./RemoveFriendButton";
import { useEffect } from "react";

function WallHeader() {
    const { userId } = useParams();
    const user = useSelector(state => state.users[userId]);
    const currentUser = useSelector(state => state.session.user);

    const [showModal, setShowModal] = useState(false);
    // const [hasCoverPhoto, setHasCoverPhoto] = useState(false);
    // const [coverPhotoPath, setCoverPhotoPath] = useState("../../img/cover_photo.png");
    // const [profilePicturePath, setProfilePicturePath] = useState("../../img/default_profile_pic.png");

    // const changeCoverPhoto = () => {
    //     // Implement the logic for changing cover photo
    // }

    // const openEditProfileModal = () => {
    //     // Implement the logic for opening the edit profile modal
    // }

    // let changeCoverPhotoMsg = "Add cover photo";
    // if (hasCoverPhoto) changeCoverPhotoMsg = "Change cover photo"

    // useEffect(() => {
    //     if (user?.profile_photo_url) {
    //         setProfilePicturePath(user?.profile_photo_url)
    //     }
    //     if (user?.cover_photo) {
    //         setCoverPhotoPath(user?.cover_photo)
    //     }
    // },[])

    const handleCPError = (event) => {
        // Replace the src attribute with the backup image URL
        event.target.src = process.env.PUBLIC_URL + "/img/default_cover_photo.png";
    };

    const handlePPError = (event) => {
        // Replace the src attribute with the backup image URL
        event.target.src =process.env.PUBLIC_URL + "/img/default_profile_pic.png";
    };

    return (
        <>
            <div id="profile-banner">
                <div id="cover-photo-banner">
                    <img src={user?.cover_photo_url} onError={handleCPError} id="cover-photo"/>
                    <div id="outer-profile-pic">
                        <img src={user?.profile_photo_url} onError={handlePPError} id="profile-pic"/>
                    </div>
                    {/* {currentUser && user && currentUser.id === user.id && (
                        <>
                            <div id="change-cover-photo-button" onClick={changeCoverPhoto}>
                                <i id="change-cover-photo-camera-icon"></i>
                                <span>{changeCoverPhotoMsg}</span>
                            </div>
                            <div id="edit-profile-link" onClick={() => setShowModal(true)}>
                                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/lYApul5-WxY.png"/><span>Edit Profile</span>
                            </div>
                        </>
                    )} */}
                    <FriendButton/>
                    <RemoveFriendButton />
                </div>
                <div id="profile-name-banner">
                    <h2>{user?.first_name}&nbsp;{user?.last_name}</h2>
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
