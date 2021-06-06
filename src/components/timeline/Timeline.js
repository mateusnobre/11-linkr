import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "./Style";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { IconContext } from "react-icons";
import Loading from "../Loading";
import Post from "./Post";
import { DebounceInput } from "react-debounce-input";
import useInterval from "react-useinterval";
export default function Timeline() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnable, setIsEnable] = useState(true);
  const [posts, setPosts] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [hashtagSearch, setHashtagSearch] = useState("");
  const [render, setRender] = useState([1]);
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

    const followRequest = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows",
      config
    );

    followRequest.then((response) => {
      if (!response.data.users.length) {
        alert("Você não segue ninguém ainda, procure por perfis na busca");
        setIsLoading(false);
        return;
      }
      const request = axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts",
        config
      );
      request.then((response) => {
        const newArray = response.data.posts.filter(
          (e) => e.user.id !== user.id
        );
        if (newArray.length === 0) {
          alert("Nenhuma publicação encontrada");
        }
        setPosts([...newArray]);
        setIsLoading(false);
      });
      request.catch((error) => {
        alert("Houve uma falha ao obter os posts, por favor atualize a página");
      });
    });

    trendingRequest.then((response) => {
      const newArray = response.data.hashtags;
      setHashtags([...newArray]);
    });

    trendingRequest.catch((error) => {
      alert("Houve uma falha ao obter as hashtags");
    });
  }
  useEffect(() => loadPage(true), render);
  useInterval(loadPage, 15000);

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

    const body = { text: description, link: url };
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
        <Link to="my-posts" className="logout">
          My posts
        </Link>
        <Link to="my-likes" className="logout">
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
            </div>
          </div>
          {posts.map((post) => (
            <Post
              content={post}
              config={config}
              userId={user.id}
              key={post.id}
              render={render}
              setRender={setRender}
            />
          ))}
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
