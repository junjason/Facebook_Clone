import { useParams } from "react-router-dom/cjs/react-router-dom";
import "./IntroContainer.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { updateUserThunk } from "../../store/users";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/users";

function IntroContainer() {
    const { userId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.users[userId]) || {};
    const [bioTextField, setBioTextField] = useState("Add bio");
    const [isTextBoxVisible, setIsTextBoxVisible] = useState(false);
    const [bioValue, setBioValue] = useState(user?.bio || "");
    const [charCount, setCharCount] = useState(bioValue.length);
    const [isCurrentUsersWall, setIsCurrentUsersWall] = useState(false);

    // console.log(user);

    useEffect(() => {
        if (bioValue !== "") setBioTextField("Edit bio");
        else setBioTextField("Add bio");
    
        if (user?.id === sessionUser?.id) setIsCurrentUsersWall(true);
        else setIsCurrentUsersWall(false);
    
        if (!isCurrentUsersWall) setIsTextBoxVisible(false);
    }, [userId]);

    const openAndCloseBio = () => {
        setIsTextBoxVisible(!isTextBoxVisible);
    };

    const handleBioTextChange = (e) => {
        const newValue = e.target.value;
        setBioValue(newValue);
        setCharCount(newValue.length);
    };

    const dispatch = useDispatch();
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let userInfo = {
            ...user,
            bio: bioValue
        };

        setIsTextBoxVisible(!isTextBoxVisible);
        try {
            await dispatch(updateUserThunk(userId, userInfo));
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <>
            {sessionUser && user && (sessionUser.id === user.id || user?.friend_status === "True") && 
                <div id="intro-container">
                    <h2>Intro</h2>
                    {!isTextBoxVisible && <span>{user?.bio}</span>}
                    {!isTextBoxVisible && isCurrentUsersWall && (
                        <button onClick={openAndCloseBio} id="addEditBioBtn">{bioTextField}</button>
                    )}
                    {isTextBoxVisible && (
                        <>
                        <form onSubmit={handleFormSubmit} id="changeBioForm">
                            <textarea
                            className="bio-textarea"
                            rows="4"
                            cols="50"
                            placeholder="Describe who you are"
                            value={bioValue}
                            onChange={handleBioTextChange}
                            maxLength={101}
                            />
                            <div className="bio-buttons">
                                <span className="char-count">{101 - parseInt(charCount)} characters remaining</span>
                                <button type="button" className="cancel-button" onClick={openAndCloseBio}>Cancel</button>
                                <button type="submit" className="save-button">Save</button>
                            </div>
                        </form>
                        </>
                    )}
                    {user?.gender && (
                        <>
                            <span>
                                <i className="fa-solid fa-venus-mars"></i>&nbsp; Gender: {user.gender}
                            </span>
                        </>
                    )}
                    {user?.birthday && (
                        <>
                            <span>
                                <i className="fa-solid fa-cake-candles"></i>&nbsp; Birthday: {user.birthday}
                            </span>
                        </>
                    )}
                </div>
            }
        </>
    );
}

export default IntroContainer;
