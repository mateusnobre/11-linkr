import { Link, useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "./Style";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { IconContext } from "react-icons";
import Loading from "../Loading";
import Post from "./Post";
import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";

export default function User() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFollowedByMe, setIsFollowedByMe] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [username, setUsername] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [userId, setUserId] = useState();
  const [usersSearched, setUsersSearched] = useState({ users: [] });
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [hashtagSearch, setHashtagSearch] = useState("");
  const history = useHistory();
  const params = useParams();
  const [render, setRender] = useState([params.id]);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (render[0] !== params.id) {
    setRender([params.id]);
  }

  useEffect(() => {
    setIsLoading(true);
    const request = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${params.id}/posts`,
      config
    );

    const userRequest = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${params.id}`,
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

    userRequest.then((response) => {
      setUsername(response.data.user.username);
      setImageURL(response.data.user.avatar);
      setUserId(response.data.user.id);
    });

    userRequest.catch((error) => {
      alert("Houve uma falha ao obter o usuário");
    });

    trendingRequest.then((response) => {
      const newArray = response.data.hashtags;
      setHashtags([...newArray]);
    });

    trendingRequest.catch((error) => {
      alert("Houve uma falha ao obter as hashtags");
    });
  }, render);
  useEffect(() => {
    setIsLoadingFollow(true);
    const followedUsersRequest = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows`,
      config
    );
    followedUsersRequest.then((response) => {
      const followedUsers = response.data.users;
      for (let i = 0; i < followedUsers.length; i++) {
        if (followedUsers[i].id === userId) {
          setIsFollowedByMe(true);
        }
      }
    });
    followedUsersRequest.catch((error) => {
      alert("Houve uma buscar os usuários seguidos por você");
    });
    setIsLoadingFollow(false);
  }, userId);
  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push("/");
  }

  function showMenu() {
    isVisible ? setIsVisible(false) : setIsVisible(true);
  }

  function followUser() {
    setIsLoadingFollow(true);
    if (!isFollowedByMe) {
      const followRequest = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userId}/follow`,
        null,
        config
      );
      followRequest.then((response) => {
        setIsFollowedByMe(true);
      });
      followRequest.catch((response) => {
        alert("Não foi possível seguir esse usuário");
      });
    } else if (isFollowedByMe) {
      const unfollowRequest = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userId}/unfollow`,
        null,
        config
      );
      unfollowRequest.then((response) => {
        setIsFollowedByMe(false);
      });
      unfollowRequest.catch((response) => {
        alert("Não foi possível deixar de seguir esse usuário");
      });
    }
    setIsLoadingFollow(false);
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
      <UserHeader>
        <div>
          <img src={imageURL} alt="profile" />
        </div>
        <div>
          <h2>{username}'s posts</h2>
        </div>
        {!isLoadingFollow && isFollowedByMe && (
          <Unfollow onClick={followUser}>Unfollow</Unfollow>
        )}
        {!isLoadingFollow && !isFollowedByMe && (
          <Follow onClick={followUser}>Follow</Follow>
        )}
      </UserHeader>
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
            <Link to={`/hashtag/${hashtag.name}`}>
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
const UserHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 937px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-left: 18px;
  }
  h2 {
    user-select: none;
    margin-left: 18px;
    line-height: 50px;
  }
`;
const Follow = styled.div`
  user-select: none;
  position: absolute;
  background: #1877f2;
  border-radius: 5px;
  width: 112px;
  height: 31px;
  line-height: 31px;
  text-align: center;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  top: 69px;
  right: 0px;
`;

const Unfollow = styled.div`
  user-select: none;
  position: absolute;
  color: #1877f2;
  background: #ffffff;
  border-radius: 5px;
  width: 112px;
  height: 31px;
  line-height: 31px;
  text-align: center;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  top: 69px;
  right: 0px;
`;
