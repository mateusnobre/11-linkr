import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "./Style";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { IconContext } from "react-icons";
import Loading from "../Loading";
import Post from "./Post";
import { DebounceInput } from "react-debounce-input";
import useInterval from "react-useinterval";
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';

const EnabledGPS = styled.div`
  position: relative;
  bottom: 24px;
  width: 130px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  color: #238700;
  font-family: Lato;
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
`
const DisabledGPS = styled.div`
  position: relative;
  bottom: 24px;
  width: 153px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  color: #949494;
  font-family: Lato;
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
`
export default function Timeline() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnable, setIsEnable] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [enabledGPS, setEnabledGPS] = useState(false);
  const [posts, setPosts] = useState([]);
  const [gps, setGPS] = useState([0,0]);
  const [hashtags, setHashtags] = useState([]);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [hashtagSearch, setHashtagSearch] = useState("");
  const [render, setRender] = useState([1]);
  const [pageNumber, setPageNumber] = useState(0);
  const [usersSearched, setUsersSearched] = useState({ users: [] });
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function loadPage(showLoadIcon = false) {
    if (showLoadIcon) setIsLoading(true);
    const trendingRequest = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending",
      config
    );
    trendingRequest.then((response) => {
      const newArray = response.data.hashtags;
      setHashtags([...newArray]);
    });

    trendingRequest.catch((error) => {
      alert("Houve uma falha ao obter as hashtags");
    });
    const followRequest = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows",
      config
    );

    followRequest.then((response) => {
      
      const request = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts`,
        config
      );
      request.then((response) => {
        setPageNumber(pageNumber+1);
        const newArray = response.data.posts.filter(
          (e) => e.user.id !== user.id
        );
        if (newArray.length === 0) {
          alert("Nenhuma publicação encontrada");
        }
        setPosts(posts.concat([...newArray]));
        setIsLoading(false);
      });
      request.catch((error) => {
        alert("Houve uma falha ao obter os posts, por favor atualize a página");
      });
    });
  }
  useEffect(() => loadPage(true), render);
  useInterval(loadPage, 15000);

  function loadPosts() {
      const followRequest = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows",
      config
    );

    followRequest.then((response) => {
      if (response.data.users.length == 0) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }
      const request = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts?offset=${10*pageNumber}`,
        config
      );
      request.then((response) => {
        setPageNumber(pageNumber+1);
        const newArray = response.data.posts.filter(
          (e) => e.user.id !== user.id
        );
        setPosts(posts.concat([...newArray]));
        setIsLoading(false);
      });
      request.catch((error) => {
        alert("Houve uma falha ao obter os posts, por favor atualize a página");
      });
    });
  }
  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push("/");
  }

  function showMenu() {
    isVisible ? setIsVisible(false) : setIsVisible(true);
  }

  function newPost(event) {
    event.preventDefault();

    if (url === "") {
      alert("Insira um link válido");
      return;
    }

    setIsEnable(false);
    var body = null;
    if (enabledGPS) {
      body = { text: description, link: url , geolocation: {latitude: gps[0], longitude: gps[1]}};
    }
    else {
      body = { text: description, link: url};
    }
    const request = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts",
      body,
      config
    );
    request.then((response) => {
      if (render[0] !== 2) {
        setRender([2]);
      } else {
        setRender([1]);
      }
      setUrl("");
      setDescription("");
      setIsEnable(true);
      setEnabledGPS(false);
    });

    request.catch((error) => {
      alert("Houve um erro ao publicar seu link");
      setIsEnable(true);
    });
  }

  function searchUser(userSearched) {
    const searchConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const requestUsers = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/search?username=${userSearched}`,
      searchConfig
    );
    requestUsers.then((responseUsers) => {
      let allUsers = responseUsers.data.users;
      let users = allUsers
        .sort((e) => (e.isFollowingLoggedUser ? 1 : -1))
        .reverse();
      setUsersSearched({ users: users });
    });
  }

  function findHashtag(event) {
    event.preventDefault();
    history.push(`/hashtag/${hashtagSearch}`);
  }
  function setLocation(position) {
    setGPS([...[position.coords.latitude, position.coords.longitude]])
  }
  function getLocation() {
    if (!enabledGPS){
      if (navigator.geolocation) {
        setEnabledGPS(true);
        navigator.geolocation.getCurrentPosition(setLocation);
      } else {
        alert('Geolocation disabled');
      }
    }
    else {
      setEnabledGPS(false)
    }
  }
  return (
    <Container onClick={() => setUsersSearched({ users: [] })}>
      <div className="header">
        <h1>linkr</h1>
        <div className="search">
          <DebounceInput
            placeholder="&#xf002;  Search for people and friends"
            className="search-input"
            debounceTimeout={300}
            onChange={(e) => searchUser(e.target.value)}
          ></DebounceInput>
          <div className="search-users">
            {usersSearched.users.map((user) => (
              <div
                className="search-user"
                onClick={() => history.push(`/user/${user.id}`)}
              >
                <img src={user.avatar} alt={user.username}></img>
                <p>
                  {user.username}
                  {user.isFollowingLoggedUser ? <span>• following</span> : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="profile">
          <IconContext.Provider value={{ className: "react-icons" }}>
            {isVisible ? (
              <AiOutlineUp onClick={showMenu} />
            ) : (
              <AiOutlineDown onClick={showMenu} />
            )}
          </IconContext.Provider>
          <div className="profile-picture">
            <img src={user.avatar} alt="profile" />
          </div>
        </div>
      </div>
      <div className={isVisible ? "menu" : "menu hidden"}>
        <Link to={"/my-posts"} className="logout">
          My posts
        </Link>
        <Link to={"/my-likes"} className="logout">
          My likes
        </Link>
        <div className="logout" onClick={logout}>
          Logout
        </div>
      </div>
      <h2>timeline</h2>
      <div className="content">
        {isLoading && <Loading />}
        <div className="posts">
          <div className="new-post">
            <div className="profile-picture">
              <img src={user.avatar} alt="profile" />
            </div>
            <div className="right">
              <div className="new-post-title">
                O que você tem para favoritar hoje?
              </div>
              <form onSubmit={newPost}>
                <input
                  type="url"
                  placeholder="http:// ..."
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                  disabled={!isEnable}
                ></input>
                <input
                  type="text"
                  placeholder="Muito irado esse link falando de #javascript"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  disabled={!isEnable}
                ></input>
                <button disabled={!isEnable}>
                  {isEnable ? "Publicar" : "Publicando..."}
                </button>
              </form>
              {enabledGPS && <EnabledGPS onClick={getLocation}><FiMapPin/>Localização ativada</EnabledGPS>}
              {!enabledGPS && <DisabledGPS onClick={getLocation}><FiMapPin/>Localização desativada</DisabledGPS>}
            </div>
          </div>
          <InfiniteScroll
              pageStart={0}
              loadMore={loadPosts}
              hasMore={hasMore}
              loader={<Loading></Loading>}
          >
            {posts.map((post) => (
              <Post
                content={post}
                config={config}
                userId={user.id}
                key={post.id}
              />
            ))}
          </InfiniteScroll>
        </div>
        <div className="trending">
          <div className="trending-title">trending</div>
          <div className="trending-bar"></div>
          {hashtags.map((hashtag) => (
            <Link to={`hashtag/${hashtag.name}`}>
              <div className="hashtags">#{hashtag.name}</div>
            </Link>
          ))}
          <form onSubmit={findHashtag}>
            <input
              type="text"
              placeholder="# type a hashtag"
              onChange={(e) => setHashtagSearch(e.target.value)}
              value={hashtagSearch}
              className="find-hashtag"
            ></input>
          </form>
        </div>
      </div>
    </Container>
  );
}
