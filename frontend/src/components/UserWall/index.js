import "./UserWall.css"
import WallHeader from "./WallHeader";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import { getUser} from "../../store/user";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import IntroContainer from "./IntroContainer";
import FriendsContainer from "./FriendsContainer";
import NewPostContainer from "../NewPostContainer";
import UserWallPostContainer from "./UserWallPostContainer";

const UserWall = () => {
    // retrieve user based on :userId from params
    const { userId } = useParams();
    const user = useSelector(state => state["user"][userId]);

    const dispatch = useDispatch();
    useEffect(() => {
        const dispatchUser = async () => {
            await dispatch(getUser(userId));
        }
        
        dispatchUser();
    }, [dispatch])

    return (
        <>
            {user && (
                <WallHeader user={user} />
            )}
            {user && (
                <div id="wall-bottom-half">
                    <div id="wall-bottom-left-half">
                        <IntroContainer />
                        <FriendsContainer />
                    </div>
                    <div id="wall-bottom-right-half">
                        <NewPostContainer />
                        <UserWallPostContainer />
                    </div>
                </div>
            )}
        </>
    )
}

export default UserWall;