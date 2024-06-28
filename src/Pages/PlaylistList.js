import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue, update, remove } from 'firebase/database';
import { useAuth } from '../AuthContext';
import AddPlaylist from './AddPlaylist';
import './PlaylistLists.css';

const PlaylistList = () => {
    const { user, loading: authLoading } = useAuth(); // Access user and loading state from AuthContext
    const [playlists, setPlaylists] = useState([]);
    const [playlistLoading, setPlaylistLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const playlistsRef = ref(db, `users/${user.uid}/playlists`);
            onValue(playlistsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const playlistsArray = Object.keys(data).map(key => ({
                        id: key,
                        name: data[key].name,
                        link: data[key].link,
                    }));
                    setPlaylists(playlistsArray);
                } else {
                    setPlaylists([]);
                }
                setPlaylistLoading(false); // Set playlist loading to false when data is fetched
            });
        } else {
            setPlaylistLoading(false); // Set playlist loading to false when user is not authenticated
        }
    }, [user]);

    const handleVisitPlaylist = (playlist) => {
        if (user) {
            // Update last visited playlist ID in Realtime Database
            const userRef = ref(db, `users/${user.uid}`);
            update(userRef, { lastVisitedPlaylist: playlist.id });

            // Redirect to playlist link
            window.location.href = `/playlist`;
        } else {
            alert("Please log in to view playlists.");
            // Optionally, redirect to login page if not already implemented
        }
    };

    const handleDeletePlaylist = (playlistId) => {
        if (user) {
            // Remove playlist from Realtime Database
            const playlistRef = ref(db, `users/${user.uid}/playlists/${playlistId}`);
            remove(playlistRef)
                .then(() => {
                    console.log(`Playlist ${playlistId} deleted successfully.`);
                })
                .catch((error) => {
                    console.error(`Error deleting playlist: ${error.message}`);
                });
        }
    };

    if (authLoading || playlistLoading) {
        return <p className="loader">Loading...</p>; // Display loader while either authentication or playlist loading is in progress
    }

    return (
        <div className="playlist-list">
            <AddPlaylist />
            {user ? (
                <div className="playlist-table">
                    {playlists.map((playlist) => (
                        <div key={playlist.id} className="playlist-row">
                            <div className="playlist-cell">
                                <h3>{playlist.name}</h3>
                                <p>
                                    <a
                                        href="#"
                                        onClick={() => handleVisitPlaylist(playlist)}
                                        className="visit-btn"
                                    >
                                        Visit Playlist
                                    </a>
                                    <button
                                        onClick={() => handleDeletePlaylist(playlist.id)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="login-bar">
                    <p>Please log in to view your playlists.</p>
                    {/* Insert login button or link here */}
                </div>
            )}
        </div>
    );
};

export default PlaylistList;
