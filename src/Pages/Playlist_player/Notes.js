import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { ref, get, set } from 'firebase/database';

const Notes = ({ user, videoId, playlistId }) => {
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            if (user && playlistId && videoId) {
                try {
                    const notesRef = ref(db, `users/${user.uid}/playlists/${playlistId}/videos/${videoId}/notes`);
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
            }
        };

        fetchNotes();
    }, [user, playlistId, videoId]);

    const saveNotes = async () => {
        if (user && playlistId && videoId) {
            try {
                const notesRef = ref(db, `users/${user.uid}/playlists/${playlistId}/videos/${videoId}/notes`);
                await set(notesRef, notes);
                alert('Notes saved successfully!');
            } catch (error) {
                console.error('Error saving notes:', error);
                alert('Failed to save notes. Please try again.');
            }
        }
    };

    return (
        <div className="notes-section">
            <div className='notes_save'>
            <h3>Notes for the current video</h3>
            <button onClick={saveNotes}>Save Notes</button></div>
            {loading ? (
                <p>Loading notes...</p>
            ) : (
                <>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Write your notes here..."
                    />
                    
                </>
            )}
        </div>
    );
};

export default Notes;
