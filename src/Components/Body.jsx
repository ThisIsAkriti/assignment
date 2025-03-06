import { useRef, useState } from "react";

const Body = () => {

    const audioRef = useRef(null);
    const [progress, setProgress] = useState(50);

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (audio) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            setProgress(progressPercent);
        }
    };
    return (
        <>
            <div className="body_container">
                <div className="left_section">
                    <div className="logo">
                        <img src="./Vector.png" alt="spotfy logo" />
                    </div>
                    <div className="left_section_list">
                        <p>For You</p>
                        <p>Top Tracks</p>
                        <p>Favourites</p>
                        <p>Recently Played</p>
                    </div>

                </div>

                <div className="middle_section">
                    <div className="middle_section_content">
                        <h1>For You</h1>
                        <div className="search_bar">
                            <div className="input_container">
                                <input type="text" placeholder="Search Song, Artist" />
                            </div>
                            <div className="search_icon"><img src="./searchIcon.png" alt="icon-search" /></div>
                        </div>
                        <div className="music_list_container">
                            <div className="music_list">
                                <div className="profile_image"><img src="./Cover.png" alt="profile" height={50} /></div>
                                <div className="music_list_content">
                                    <div className="tags">
                                        <div className="title">Starboy</div>
                                        <div className="name">The Weekend</div>
                                    </div>
                                    <div className="min">4:16</div>
                                </div>
                            </div>
                            <div className="music_list">
                                <div className="profile_image"><img src="./Cover.png" alt="profile" height={50} /></div>
                                <div className="music_list_content">
                                    <div className="tags">
                                        <div className="title">Starboy</div>
                                        <div className="name">The Weekend</div>
                                    </div>
                                    <div className="min">4:16</div>
                                </div>
                            </div>
                            <div className="music_list">
                                <div className="profile_image"><img src="./Cover.png" alt="profile" height={50} /></div>
                                <div className="music_list_content">
                                    <div className="tags">
                                        <div className="title">Starboy</div>
                                        <div className="name">The Weekend</div>
                                    </div>
                                    <div className="min">4:16</div>
                                </div>
                            </div>
                            <div className="music_list">
                                <div className="profile_image"><img src="./Cover.png" alt="profile" height={50} /></div>
                                <div className="music_list_content">
                                    <div className="tags">
                                        <div className="title">Starboy</div>
                                        <div className="name">The Weekend</div>
                                    </div>
                                    <div className="min">4:16</div>
                                </div>
                            </div>
                            <div className="music_list">
                                <div className="profile_image"><img src="./Cover.png" alt="profile" height={50} /></div>
                                <div className="music_list_content">
                                    <div className="tags">
                                        <div className="title">Starboy</div>
                                        <div className="name">The Weekend</div>
                                    </div>
                                    <div className="min">4:16</div>
                                </div>
                            </div>
                            <div className="music_list">
                                <div className="profile_image"><img src="./Cover.png" alt="profile" height={50} /></div>
                                <div className="music_list_content">
                                    <div className="tags">
                                        <div className="title">Starboy</div>
                                        <div className="name">The Weekend</div>
                                    </div>
                                    <div className="min">4:16</div>
                                </div>
                            </div>
                            <div className="music_list">
                                <div className="profile_image"><img src="./Cover.png" alt="profile" height={50} /></div>
                                <div className="music_list_content">
                                    <div className="tags">
                                        <div className="title">Starboy</div>
                                        <div className="name">The Weekend</div>
                                    </div>
                                    <div className="min">4:16</div>
                                </div>
                            </div>
                            <div className="music_list">
                                <div className="profile_image"><img src="./Cover.png" alt="profile" height={50} /></div>
                                <div className="music_list_content">
                                    <div className="tags">
                                        <div className="title">Starboy</div>
                                        <div className="name">The Weekend</div>
                                    </div>
                                    <div className="min">4:16</div>
                                </div>
                            </div>
                            <div className="music_list">
                                <div className="profile_image"><img src="./Cover.png" alt="profile" height={50} /></div>
                                <div className="music_list_content">
                                    <div className="tags">
                                        <div className="title">Starboy</div>
                                        <div className="name">The Weekend</div>
                                    </div>
                                    <div className="min">4:16</div>
                                </div>
                            </div>
                            <div className="music_list">
                                <div className="profile_image"><img src="./Cover.png" alt="profile" height={50} /></div>
                                <div className="music_list_content">
                                    <div className="tags">
                                        <div className="title">Starboy</div>
                                        <div className="name">The Weekend</div>
                                    </div>
                                    <div className="min">4:16</div>
                                </div>
                            </div>
                            <div className="music_list">
                                <div className="profile_image"><img src="./Cover.png" alt="profile" height={50} /></div>
                                <div className="music_list_content">
                                    <div className="tags">
                                        <div className="title">Starboy</div>
                                        <div className="name">The Weekend</div>
                                    </div>
                                    <div className="min">4:16</div>
                                </div>
                            </div>
                            <div className="music_list">
                                <div className="profile_image"><img src="./Cover.png" alt="profile" height={50} /></div>
                                <div className="music_list_content">
                                    <div className="tags">
                                        <div className="title">Starboy</div>
                                        <div className="name">The Weekend</div>
                                    </div>
                                    <div className="min">4:16</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right_section">
                    <div className="right_section_content">
                        <h1>Viva La Vida</h1>
                        <p>Coldplay</p>
                        <div className="card_container">
                            <div><img src="./Cover.png" alt="cover image"height={400} /></div>
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
                                        <source src="your-music-file.mp3" type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                               

                                <div className="card_container_play_section">
                                    <div><img src="./dots.png" alt="image" /></div>
                                    <div className="play_section_buttons">
                                        <div><img src="./playback.png" alt="buttons" /></div>
                                        <div><img src="./pause.png" alt="buttons" /></div>
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