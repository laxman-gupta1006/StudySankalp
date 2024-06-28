import React from 'react';

const VideoPlayer = ({ videoId }) => {
    return (
        <div className="video-player" id="video-player">
            <iframe
                width="100%"
                height="auto"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default VideoPlayer;
