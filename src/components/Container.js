import React from 'react';
import { BrowserRouter as Router, Route,Routes, Switch } from 'react-router-dom';
import PlaylistPlayer from '../Pages/Playlist_player/PlaylistPlayer';
import AboutUs from '../Pages/AboutUs';
// import AddPlaylist from '../Pages/AddPlaylist';
import PlaylistList from '../Pages/PlaylistList';
import Contact from '../Pages/Contact';


const Container = () => {
    return (
        <Router>
        <div className="container">
              <Routes>
                    <Route path="/"  element={<AboutUs/>} />
                    <Route path="/playlist" element={<PlaylistPlayer/>} />
                    <Route path="/contact" element={<Contact/>} />
                    <Route path="/all_playlist" element={<PlaylistList/>} />
            </Routes>
        </div>
        </Router>
    );
}

export default Container;