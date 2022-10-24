import React, { useContext } from "react";
import "./playlistMain.scss";
import { DataLayer } from "../../DataLayer";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect, useState } from "react";
import TablePlaylist from "../tablePlaylist/TablePlaylist";

export default function PlaylistMain() {
  const [{ user, currentOpenPlaylist, playlistCoverImage }] = useContext(DataLayer);
  //console.log("💁", token);
  //console.log("👽", user);  
  //console.log("🃏", currentOpenPlaylist);
  console.log(playlistCoverImage);
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="playlistMain">
      <div className="banner">
        <div className="background__container" style={{"opacity": 500-5*scrollPosition}} >
          <img src="https://i.shgcdn.com/6fbe8c0c-09a5-45ee-9441-fda229cdbd37/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="bg-img" className="background__image"/>
        </div>
        <div className="top__container">
          <div className="left__box">
            <div className="navigation__iconContainer">
              <div className="icons">
                <ArrowBackIosNewRoundedIcon />
              </div>
              <div className="icons">
                <ArrowForwardIosRoundedIcon />
              </div>
            </div>
          </div>
          <div className="right__box">
            <div className="user__badge">
              <img
                src={user && user.images[0].url}
                alt="profile__pic"
                className="profile__pic"
              />
              <div className="user__name">{user && user.display_name}</div>
              <ArrowDropDownRoundedIcon className="icon" />
            </div>
          </div>
        </div>
        <div className="info__container">
          <div className="playlist__text">PLAYLIST</div>
          <div className="playlist__title">{currentOpenPlaylist?.name}</div>
          <div className="description">{currentOpenPlaylist?.description}</div>
          <div className="other__info">
            <span className="creator">{currentOpenPlaylist?.owner?.display_name}</span>
            <span className="divider"></span>
            <span className="likes">{currentOpenPlaylist?.followers?.total} likes</span>
            <span className="divider"></span>
            <span className="songs">{currentOpenPlaylist?.tracks?.total} songs, about {Math.floor((currentOpenPlaylist?.tracks?.total*3)/60)} hr</span>
          </div>
        </div>
      </div>
      <div className="bottom__container">
          <div className="play__button">
            <PlayArrowIcon className="icon" />
          </div>
          <div className="table">
            <TablePlaylist data={currentOpenPlaylist?.tracks?.items} />
          </div>
      </div>
    </div>
  );
}
