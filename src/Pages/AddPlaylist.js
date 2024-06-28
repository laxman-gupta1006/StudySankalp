import React, { useState } from 'react';
import { db } from '../firebase';
import { ref, push, set, get, query, orderByChild, equalTo } from 'firebase/database';
import { useAuth } from '../AuthContext';
import './Addplaylists.css';
const AddPlaylist = () => {
    const { user } = useAuth();
    const [playlistName, setPlaylistName] = useState('');
    const [playlistLink, setPlaylistLink] = useState('');

    // Function to extract the playlistId from the playlistLink
    const getPlaylistIdFromLink = (link) => {
        const urlParams = new URLSearchParams(new URL(link).search);
        return urlParams.get('list');
    };

    const addPlaylist = async () => {
        if (playlistName && playlistLink && user) {
            const playlistId = getPlaylistIdFromLink(playlistLink);

            if (!playlistId) {
                alert("Invalid playlist link.");
                return;
            }

            try {
                // Check for duplicate playlists
                const playlistsRef = ref(db, `users/${user.uid}/playlists`);
                const playlistQuery = query(playlistsRef, orderByChild('playlistId'), equalTo(playlistId));
                const snapshot = await get(playlistQuery);

                if (snapshot.exists()) {
                    alert("This playlist already exists.");
                    return;
                }

                // Add the new playlist
                const newPlaylistRef = push(playlistsRef);
                await set(newPlaylistRef, {
                    name: playlistName,
                    link: playlistLink,
                    playlistId: playlistId, // Store the extracted playlistId
                });

                alert("Playlist added!");
                setPlaylistName('');
                setPlaylistLink('');
                console.log("Playlist key:", newPlaylistRef.key); // Optional: Print the new playlist key
            } catch (error) {
                alert("Error adding playlist: " + error.message);
                console.error("Error adding playlist:", error);
            }
        } else {
            alert("Please enter both playlist name and link.");
        }
    };

    return (
        <div className="add-playlist">
            <h2>Add a New Playlist</h2>
            {user ? (
                <>
                    <input
                        type="text"
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        placeholder="Enter playlist name"
                    />
                    <input
                        type="text"
                        value={playlistLink}
                        onChange={(e) => setPlaylistLink(e.target.value)}
                        placeholder="Enter playlist link"
                    />
                    <button onClick={addPlaylist}>Add Playlist</button>
                </>
            ) : (
                <p>Please log in to add a playlist.</p>
            )}
        </div>
    );
};

export default AddPlaylist;
