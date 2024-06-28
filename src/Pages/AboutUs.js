import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="container_home">
            <div className="description_home">
                <h2>About StudySankalp</h2>
                <p>Welcome to StudySankalp, where YouTube playlists become your new best friends. No distractions, just serious learning vibes. Our mission? To make you a study ninja with tools that make sessions as smooth as butter. 📘🚀</p>

                <h3>Our Mission</h3>
                <p>StudySankalp exists because staying focused is hard, and we're here to hold your hand through it all. Whether you're cramming for exams, picking up new skills, or just showing off your intellect, we've got your back. 💪</p>

                <h3>What We Offer</h3>
                <ul>
                    <li>Track Your Progress 📈: Watch your mastery grow across playlists.</li>
                    <li>Add Personal Notes 📝: Scribble your genius insights on videos.</li>
                    <li>Distraction-Free Environment 🚫: We keep those pesky distractions at bay.</li>
                    <li>User-Friendly Interface 🖥️: Because life's too short for confusing interfaces.</li>
                </ul>

                <h3>Our Commitment</h3>
                <p>We're like the cool parent who listens to your feedback. We're committed to making StudySankalp the best study buddy you've ever had. 💬</p>

                <h3>Get Started</h3>
                <p>Ready to become a study superstar? Join StudySankalp now and watch your brain grow muscles. 🧠💪</p>
            </div>
            <div className="about-us">
                <h1>How to Use StudySankalp 🛠️</h1>
                <div className="step">
                    <p>1. Sign in with Google 🔑: because we love having more friends (and tracking your every move).</p>
                    <img src={`${process.env.PUBLIC_URL}/images/1.png`} alt="Step 1" />
                </div>
                <div className="step">
                    <p>2. Find a YouTube playlist 📺 you're obsessed with and copy its secret URL.</p>
                    <img src={`${process.env.PUBLIC_URL}/images/2.png`} alt="Step 2" />
                </div>
                <div className="step">
                    <p>3. Paste the playlist URL and name it 🎶 whatever tickles your fancy.</p>
                    <img src={`${process.env.PUBLIC_URL}/images/3.png`} alt="Step 3" />
                </div>
                <div className="step">
                    <p>4. Behold! Your playlist is now on your dashboard. Feel the power. 🌟</p>
                    <img src={`${process.env.PUBLIC_URL}/images/4.png`} alt="Step 4" />
                </div>
                <div className="step">
                    <p>5. Click "Visit Playlist" to enter the magic realm where videos are conquered and progress is king. Your data is safe like a fortress. Access it anywhere, anytime with your Google login. 🏰</p>
                    <img src={`${process.env.PUBLIC_URL}/images/5.png`} alt="Step 5" />
                </div>
                <div className="step">
                    <p>6. Scribble your genius thoughts in the notes section. It's like a digital brain dump, but better. 🧠✍️</p>
                    <img src={`${process.env.PUBLIC_URL}/images/6.png`} alt="Step 6" />
                </div>
            </div>
            <div className="thanks">
                <h2>Thanks for Choosing StudySankalp! 🎉</h2>
                <p>We're thrilled to be a part of your learning journey. If you have any feedback or need assistance, reach out to us anytime! 📧</p>
                <p>Email: <a href="mailto:studysankaalp@gmail.com">studysankaalp@gmail.com</a></p>
            </div>
        </div>
    );
}

export default AboutUs;
