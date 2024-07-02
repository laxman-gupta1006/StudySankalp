import React from 'react';

const VideoDetails = ({ title, description, onComplete, onNext }) => {
    return (
        <div className="video-details" id="video-details" >
            <h3>{title}</h3>
            <div>
            <button onClick={onComplete}>Complete</button>
            </div>
        </div>
    );
}

export default VideoDetails;
