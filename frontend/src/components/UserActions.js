import React from 'react';
import { likeWrap, followUser } from '../utils/api';

function UserActions({ wrapId, userId }) {
    const handleLike = async () => {
        await likeWrap(wrapId);
        alert('Toggled like status!');
    };

    const handleFollow = async () => {
        await followUser(userId);
        alert('Toggled follow status!');
    };

    return (
        <div>
            <button onClick={handleLike}>Like/Unlike</button>
            <button onClick={handleFollow}>Follow/Unfollow</button>
        </div>
    );
}

export default UserActions;
