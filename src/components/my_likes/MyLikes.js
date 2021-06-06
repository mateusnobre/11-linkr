import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../timeline/Style";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { IconContext } from "react-icons";
import Loading from "../Loading";
import { DebounceInput } from "react-debounce-input";
import Post from "../timeline/Post";
export default function Timeline() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnable, setIsEnable] = useState(true);
  const [posts, setPosts] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [render, setRender] = useState([1]);
  const [hashtagSearch, setHashtagSearch] = useState("");
  const [usersSearched, setUsersSearched] = useState({ users: [] });
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    setIsLoading(true);
    const request = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked`,
      config
    );

    const trendingRequest = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending",
      config
    );

    request.then((response) => {
      const newArray = response.data.posts;
      if (newArray.length === 0) {
        alert("Nenhum post encontrado");
      }
      setPosts([...newArray]);
      setIsLoading(false);
    });

    request.catch((error) => {
      alert("Houve uma falha ao obter os posts, por favor atualize a página");
    });

    trendingRequest.then((response) => {
      const newArray = response.data.hashtags;
      setHashtags([...newArray]);
    });

    trendingRequest.catch((error) => {
      alert("Houve uma falha ao obter as hashtags");
    });
  }, render);

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push("/");
  }

  function showMenu() {
    isVisible ? setIsVisible(false) : setIsVisible(true);
  }

  function findHashtag(event) {
    event.preventDefault();
    history.push(`/hashtag/${hashtagSearch}`);
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

  return (
    <Container>
      <div className="header">
        <Link to="/">
          <h1>linkr</h1>
        </Link>
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
      <h2>My likes</h2>
      <div className="content">
        {isLoading && <Loading />}
        <div className="my-posts">
          {posts.map((post) => (
            <Post
              content={post}
              config={config}
              userId={user.id}
              key={post.id}
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
