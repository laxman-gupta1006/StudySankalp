import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import VideoPlayer from './VideoPlayer';
import VideoDetails from './VideoDetails';
import Notes from './Notes';
import { useAuth } from '../../AuthContext'; // Assuming you have an AuthContext for user authentication
import { db } from '../../firebase'; // Assuming you have set up Firebase in your project
import { ref, get, set } from 'firebase/database'; // Importing the correct functions

const APIKEY = "AIzaSyCfIfylULyWXEHPbU7G1v1em-JvhGR-6fU";

const PlaylistPlayer = () => {
    const [lastVisitedPlaylist, setLastVisitedPlaylist] = useState('');
    const [playlist, setPlaylist] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const { user } = useAuth(); // Assuming useAuth provides the authenticated user
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    useEffect(() => {
        setLoading(true);

        if (!user) {
            console.warn('User not authenticated.');
            setLoading(false);
            setIsLoggedIn(false); // User is not logged in
            return;
        }

        setIsLoggedIn(true); // User is logged in

        const fetchLastVisitedPlaylist = async () => {
            try {
                const playlistsRef = ref(db, `users/${user.uid}/lastVisitedPlaylist`);
                const snapshot = await get(playlistsRef);
                const lastVisitedPlaylistId = snapshot.val();

                if (lastVisitedPlaylistId) {
                    setLastVisitedPlaylist(lastVisitedPlaylistId);
                    fetchPlaylistFromDatabase(lastVisitedPlaylistId);
                } else {
                    console.log('No last visited playlist found.');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error reading last visited playlist:', error);
                setLoading(false);
            }
        };

        const delay = 1000; // 1 second delay
        const timeoutId = setTimeout(fetchLastVisitedPlaylist, delay);

        return () => clearTimeout(timeoutId);
    }, [user]);

    const fetchPlaylistFromDatabase = async (playlistId) => {
        try {
            const playlistRef = ref(db, `users/${user.uid}/playlists/${playlistId}`);
            const snapshot = await get(playlistRef);
            const playlistData = snapshot.val();

            if (playlistData) {
                const progress = playlistData.progress || [];
                const videos = await fetchYouTubePlaylist(playlistData.link);
                const playlistWithProgress = videos.map((video, index) => ({
                    ...video,
                    completedOrNot: progress[index]?.completedOrNot || false,
                    index: index,
                }));
                setPlaylist(playlistWithProgress);

                const lastPlayedIndex = progress.findIndex(video => video.completedOrNot === false);
                setCurrentVideoIndex(lastPlayedIndex !== -1 ? lastPlayedIndex : 0);

                setLoading(false);
            } else {
                console.log('Playlist not found in the database.');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching playlist from database:', error);
            setLoading(false);
        }
    };

    const fetchYouTubePlaylist = async (playlistLink) => {
        try {
            const playlistId = playlistLink.split("list=")[1];
            let apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${APIKEY}`;
            let videos = [];
            let nextPageToken = '';

            do {
                const response = await fetch(apiUrl + (nextPageToken ? `&pageToken=${nextPageToken}` : ''));
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const newVideos = data.items.map(item => ({
                    title: item.snippet.title,
                    videoId: item.snippet.resourceId.videoId,
                    completedOrNot: false,
                }));
                videos = [...videos, ...newVideos];
                nextPageToken = data.nextPageToken;
            } while (nextPageToken);

            return videos;
        } catch (error) {
            throw new Error('Failed to fetch playlist videos');
        }
    };

    const loadVideo = (index) => {
        setCurrentVideoIndex(index);
    };

    const markComplete = async () => {
        if (!user || !lastVisitedPlaylist || currentVideoIndex < 0 || currentVideoIndex >= playlist.length) return;

        const updatedPlaylist = [...playlist];
        updatedPlaylist[currentVideoIndex].completedOrNot = true;

        setPlaylist(updatedPlaylist);

        try {
            const playlistRef = ref(db, `users/${user.uid}/playlists/${lastVisitedPlaylist}/progress`);
            const progress = updatedPlaylist.map(video => ({
                completedOrNot: video.completedOrNot,
                index: video.index,
            }));
            await set(playlistRef, progress);
            loadNextVideo();
        } catch (error) {
            console.error('Error marking video as complete:', error);
        }
    };

    const loadNextVideo = () => {
        if (currentVideoIndex < playlist.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1);
        } else {
            alert('You have reached the end of the playlist.');
        }
    };

    if (!isLoggedIn) {
        return <p>Please log in to view the playlist.</p>;
    }

    if (loading) {
        return <p>Loading playlist...</p>;
    }

    return (
        <>
            {playlist.length > 0 ? (
                <div className='container_videoplayer'>
                    <Sidebar playlist={playlist} onVideoSelect={loadVideo} currentVideoIndex={currentVideoIndex} />
                    <div className="main-content">
                    <VideoDetails
                            title={playlist[currentVideoIndex]?.title}
                            description="Video description..."
                            onComplete={markComplete}
                            onNext={loadNextVideo}
                        />
                        <div className="ad-container">
                            {/* Insert Google Ads code here */}
                            <ins className="adsbygoogle"
                                style={{ display: 'block' }}
                                data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
                                data-ad-slot="xxxxxxxxxx"
                                data-ad-format="auto"
                                data-full-width-responsive="true"></ins>
                        </div>
                        <VideoPlayer videoId={playlist[currentVideoIndex]?.videoId} />
                        <Notes
                            user={user}
                            videoId={playlist[currentVideoIndex]?.videoId}
                            playlistId={lastVisitedPlaylist}
                        />
                    </div>
                </div>
            ) : (
                <div className="no-playlist">
                    <p>No playlist found.</p>
                    <button onClick={() => { window.location.href="/all_playlist" }}>Choose / Add Playlist</button>
                </div>
            )}
        </>
    );
};

export default PlaylistPlayer;
