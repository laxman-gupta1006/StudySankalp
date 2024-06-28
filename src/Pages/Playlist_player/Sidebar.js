import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Ensure you have your Firebase setup correctly
import { ref, get, set } from 'firebase/database';

const Sidebar = ({ playlist, onVideoSelect, currentVideoIndex, user, playlistId }) => {
    const [totalCompleted, setTotalCompleted] = useState(0);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(true);

    // Calculate total completed videos whenever playlist or currentVideoIndex changes
    useEffect(() => {
        const completedCount = playlist.filter(video => video.completedOrNot).length;
        setTotalCompleted(completedCount);
    }, [playlist, currentVideoIndex]);

    // Fetch notes for the current video
    useEffect(() => {
        if (user && playlistId && playlist[currentVideoIndex]?.videoId) {
            const fetchNotes = async () => {
                try {
                    const notesRef = ref(db, `users/${user.uid}/playlists/${playlistId}/videos/${playlist[currentVideoIndex].videoId}/notes`);
                    const snapshot = await get(notesRef);
                    const notesData = snapshot.val();
                    if (notesData) {
                        setNotes(notesData);
                    } else {
                        setNotes('');
                    }
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching notes:', error);
                    setLoading(false);
                }
            };

            fetchNotes();
        }
    }, [user, playlistId, currentVideoIndex]);

    const saveNotes = async () => {
        if (user && playlistId && playlist[currentVideoIndex]?.videoId) {
            try {
                const notesRef = ref(db, `users/${user.uid}/playlists/${playlistId}/videos/${playlist[currentVideoIndex].videoId}/notes`);
                await set(notesRef, notes);
                alert('Notes saved successfully!');
            } catch (error) {
                console.error('Error saving notes:', error);
                alert('Failed to save notes. Please try again.');
            }
        }
    };

    const calculateProgress = () => {
        return Math.floor((totalCompleted / playlist.length) * 100);
    };

    return (
        <div className="sidebar">
            <h3>Playlist</h3>
            <div className="progress-info">
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}>
                        <div className="progress-text">{`${calculateProgress()}%`}</div>
                    </div>
                </div>
                <div className="progress-stats">
                    <span>{`${totalCompleted} / ${playlist.length} videos completed`}</span>
                </div>
            </div>
            <div className="playlist-items">
                {playlist.map((video, index) => (
                    <div
                        key={video.videoId}
                        className={`video-item ${index === currentVideoIndex ? 'current' : ''} ${video.completedOrNot ? 'completed' : ''}`}
                        onClick={() => onVideoSelect(index)}
                    >
                        <span>{video.title}</span>
                        {video.completedOrNot && <span className="completed-icon">✔️</span>}
                    </div>
                ))}
            </div>
            {/* <div className="notes-section">
                <h3>Notes for {playlist[currentVideoIndex]?.title}</h3>
                {loading ? (
                    <p>Loading notes...</p>
                ) : (
                    <>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Write your notes here..."
                        />
                        <button onClick={saveNotes}>Save Notes</button>
                    </>
                )}
            </div> */}
        </div>
    );
};

export default Sidebar;
