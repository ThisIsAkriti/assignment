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

    const [likedSongs, setLikedSongs] = useState(() => {
        return JSON.parse(localStorage.getItem("likedSongs")) || [];
    });

    const [bgGradient, setBgGradient] = useState("linear-gradient(to bottom, #000000, #333333)");
    const imgRef = useRef(null);

    useEffect(() => {
        if (!currentSong.musicUrl) return;

        const audio = audioRef.current;
        audio.src = currentSong.musicUrl;

        const playAudio = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (err) {
                console.warn("Autoplay blocked: Waiting for user interaction.", err);
            }
        };
        playAudio();
    
        localStorage.setItem("likedSongs", JSON.stringify(likedSongs));

        if (currentSong.thumbnail) {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = currentSong.thumbnail;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = 1;
                canvas.height = 1;

                ctx.drawImage(img, 0, 0, 1, 1);

                const applyGradient = () =>{
                const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;

                if (window.innerWidth >= 992) {
                    setBgGradient(`linear-gradient(to left, rgb(${r}, ${g}, ${b}), #111)`);
                } else {
                    setBgGradient(`linear-gradient(to top, rgb(${r}, ${g}, ${b}), #111)`);
                    }
                    
                };

                applyGradient();

                window.addEventListener('resize', applyGradient);

            }
        }
    }, [currentSong ,currentSong.thumbnail]);    
    
    const handleSongClick = async (song) => {
        setIsPlaying(true);
        setCurrentSong(song);

        setRecentlyPlayed((prev) => {
            let updatedList = [song, ...prev.filter(item => item.title !== song.title)];
            updatedList = updatedList.slice(0, 10);
            sessionStorage.setItem("recentlyPlayed", JSON.stringify(updatedList));
            return updatedList;
        })
        if (audioRef.current) {
            audioRef.current.src = song.musicUrl;
            try {
                await audioRef.current.play(); 
                setIsPlaying(true);
            } catch (err) {
                console.warn("Autoplay blocked. User interaction needed.", err);
            }
        }

    }

    const handleLike = (song) => {
        let updatedLikedSongs;
        setLikedSongs((prevLikedSongs) => {
            if (prevLikedSongs.some((s) => s.title === song.title)) {
                updatedLikedSongs = prevLikedSongs.filter((s) => s.title !== song.title)
            } else {
                updatedLikedSongs = [...prevLikedSongs, song]
            }

            localStorage.setItem("likedSongs", JSON.stringify(updatedLikedSongs));
            return updatedLikedSongs;
            
        })
    }

    const isSongLiked = (song) => {
        const likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
        return likedSongs.some((s) => s.title === song.title);
    };

    const favouriteSongs = likedSongs.filter((song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artistName.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    const handlePlayNext = () => {
        const currentIndex = data.findIndex(song => song.title === currentSong.title)
        const nextIndex = (currentIndex + 1) % data.length; 
        setCurrentSong(data[nextIndex]);
        setIsPlaying(true);
    }

    const handlePlayPrev = () => {
        const currentIndex = data.findIndex(song => song.title === currentSong.title)
        const prevIndex = (currentIndex - 1 + data.length) % data.length; 
        setCurrentSong(data[prevIndex]);
        setIsPlaying(true);
    }

    const handleSeek = (event) => {
        const audio = audioRef.current;
        if (!audio) return;
    
        const progressBar = event.currentTarget;
        const clickX = event.clientX - progressBar.getBoundingClientRect().left;
        const progressBarWidth = progressBar.clientWidth;
    
        const newTime = (clickX / progressBarWidth) * audio.duration;
        audio.currentTime = newTime;
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
                                    <h6>No songs found</h6>
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

                         <div className="music_list_container">
                         {favouriteSongs.length > 0 ? (
                             favouriteSongs.map((info, index) => (
                                 <div className="music_list" key={index} onClick={() => handleSongClick(info)}>
                                     <div className="profile_image">
                                         <img src={info.thumbnail} alt="profile" height={50} width={50} />
                                     </div>
                                     <div className="music_list_content">
                                         <div className="tags">
                                             <div className="title">{info.title}</div>
                                             <div className="name">{info.artistName}</div>
                                         </div>
                                         <div className="min">{info.duration}</div>
                                     </div>
                                 </div>
                             ))
                         ) : (
                             <h6>No songs found</h6>
                         )}
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
                                    <h6>No songs found</h6>
                                )
                            }
                        </div>
                    </div>}
                </div>

                <div className="player" style={{background : bgGradient, transition: "background 0.5s ease"}}>
                    <div className="player_content">
                        <h1>{currentSong.title}</h1>
                        <p>{ currentSong.artistName}</p>
                        <div className="card_container">
                            <div><img src={currentSong.thumbnail} ref={imgRef} alt="cover image" className="CoverImages" /></div>
                            <div>
                                
                                <div className="music-progress-container" onClick={handleSeek}>
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
                                        onEnded={handlePlayNext}
                                        style={{ marginTop: "10px", display: "none" }}
                                        >
                                        <source src={currentSong.musicUrl} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                               
                                <div className="card_container_play_section">
                                    <div>
                                        <div className="likeImage" onClick={() => handleLike(currentSong)} ><img src={isSongLiked(currentSong)? "./afterLike.png" : "./beforeLike.png"} alt="heart" />
                                        </div>
                                    </div>
                                    <div className="play_section_buttons">
                                        <div onClick={handlePlayPrev}><img src="./playback.png" alt="buttons" /></div>
                                        <div onClick={handlePause}>
                                        <img className="playPauseButton" src={playing? "./pauseIcon.png" : "./playIcon.png"} alt="buttons" /></div>
                                        <div onClick={handlePlayNext}><img src="./playForward.png" alt="buttons" /></div>
                                    </div>
                                    <div>
                                        <img src="./vol.png" alt="volume button" onClick={handlePause} />
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