import React from 'react';
import './style.css';

export const LikeButton = (props) => {
    return (
        <button className="like" onClick={() => props.incrementLikes(props.id)}>
            <i className="fas fa-thumbs-up"></i>
            <span className="like-count">{props.likes}</span>
        </button>
    )
}