import { useEffect, useRef, useState } from "react";
import data from '../data/data.json'

const Body = () => {

    const audioRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [currentSong, setCurrentSong] = useState(data[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
        return JSON.parse(sessionStorage.getItem("recentlyPlayed")) || [];
    });

    const [activeTab, setActiveTab] = useState("For You");
    const [playing, setIsPlaying] = useState(false);
    useEffect(() => {
        if (!currentSong.musicUrl) return;

        const audio = audioRef.current;
        audio.src = currentSong.musicUrl;

        const playAudio = async () => {
            try {
                await audio.play();
            } catch (err) {
                console.warn("Autoplay blocked: Waiting for user interaction.", err);
            }
        };

    playAudio(); // Call the function
    }, [currentSong]);    
    
    const handleSongClick = async(song) => {
        setCurrentSong(song);

        setRecentlyPlayed((prev) => {
            let updatedList = [song, ...prev.filter(item => item.title !== song.title)];
            updatedList = updatedList.slice(0, 10);
            sessionStorage.setItem("recentlyPlayed", JSON.stringify(updatedList));
            return updatedList;
        })
        if (audioRef.current) {
            audioRef.current.src = song.musicUrl;
        }

    }

    const handlePause = () => {
        if (audioRef.current) {
            if (playing) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!playing);
        }
    }
    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (audio) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            setProgress(progressPercent);
        }
    };

    const filteredSongs = data.filter((song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artistName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const recentlyPlayedFilter = recentlyPlayed.filter((song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artistName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <>
            <div className="body_container">
                <div className="navigation">
                    <div className="logo">
                        <img src="./Vector.png" alt="spotfy logo" />
                    </div>
                    <div className="navigation_list_container">
                        <div className="navigation_list">
                            <p onClick={() => setActiveTab("For You")} >For You</p>
                            <p onClick={() => setActiveTab("Top Tracks")} >Top Tracks</p>
                            <p onClick={() => setActiveTab("Favourites")} >Favourites</p>
                            <p onClick={() => setActiveTab("Recently Played")} >Recently Played</p>
                        </div>
                        <div className="profile"><img src="./Profile.png" alt="profile" /></div>
                    </div>

                </div>

                <div className="sidebar">
                    {activeTab === "For You" && <div className="sidebar_content">
                        <h1>For You</h1>
                        <div className="search_bar">
                            <div className="input_container">
                                <input type="text"
                                    placeholder="Search Song, Artist"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                            <div className="search_icon"><img src="./searchIcon.png" alt="icon-search" /></div>
                        </div>
                        <div className="music_list_container">
                            {filteredSongs.length > 0 ? (filteredSongs.map((info, index) => (
                            <div className="music_list" key={index} onClick={() => handleSongClick(info)}>
                                <div className="profile_image"><img src={info.thumbnail} alt="profile" height={50} width={50} /></div>
                                <div className="music_list_content">
                                    <div className="tags">
                                        <div className="title">{info.title}</div>
                                        <div className="name">{info.artistName}</div>
                                    </div>
                                    <div className="min">{info.duration}</div>
                                </div>
                                </div>))) : (
                                    <p>No songs found</p>
                            )}
                        </div>
                    </div>}

                    {activeTab == "Top Tracks" && <h1 className="sidebar_content">
                        Top Tracks
                    </h1>}

                    {activeTab == "Favourites" &&
                    <div className="sidebar_content">
                        <h1>Favourites</h1>
                        <div className="search_bar">
                            <div className="input_container">
                                <input type="text"
                                    placeholder="Search Song, Artist"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                            <div className="search_icon"><img src="./searchIcon.png" alt="icon-search" /></div>
                        </div>
                    </div>
                    }

                    {activeTab === "Recently Played" &&<div className="sidebar_content">
                        <h1>Recently Played</h1>
                        
                        <div className="search_bar">
                            <div className="input_container">
                                <input type="text"
                                    placeholder="Search Song, Artist"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                            <div className="search_icon"><img src="./searchIcon.png" alt="icon-search" /></div>
                        </div>

                        <div className="music_list_container">
                            {recentlyPlayedFilter.length > 0 ? (recentlyPlayedFilter.map((info, index) => (
                                    <div className="music_list" key={index} onClick={() => handleSongClick(info)}>
                                        <div className="profile_image"><img src={info.thumbnail} alt="profile" height={50} width={50} /></div>
                                        <div className="music_list_content">
                                            <div className="tags">
                                                <div className="title">{info.title}</div>
                                                <div className="name">{info.artistName}</div>
                                            </div>
                                            <div className="min">{info.duration}</div>
                                        </div>
                                    </div>))) : (
                                    <p>No songs found</p>
                                )
                            }
                        </div>
                    </div>}
                </div>

                <div className="player">
                    <div className="player_content">
                        <h1>{currentSong.title}</h1>
                        <p>{ currentSong.artistName}</p>
                        <div className="card_container">
                            <div><img src={currentSong.thumbnail} alt="cover image"height={400} width={400} /></div>
                            <div>
                                
                                <div className="music-progress-container">
                                    <div className="progress-line">
                                        <div
                                            className="progress-indicator"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>

                                    <audio
                                        ref={audioRef}
                                        controls
                                        onTimeUpdate={handleTimeUpdate}
                                        style={{ marginTop: "10px", display: "none" }}
                                        >
                                        <source src={currentSong.musicUrl} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                               

                                <div className="card_container_play_section">
                                    <div><img src="./dots.png" alt="image" /></div>
                                    <div className="play_section_buttons">
                                        <div><img src="./playback.png" alt="buttons" /></div>
                                        <div onClick={handlePause}>
                                        <img className="playPauseButton" src={playing? "./pauseIcon.png" : "./playIcon.png"} alt="buttons" /></div>
                                        <div><img src="./playForward.png" alt="buttons" /></div>
                                    </div>
                                    <div>
                                        <img src="./vol.png" alt="volume button" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Body;