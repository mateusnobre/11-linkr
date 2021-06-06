import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../timeline/Style";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { IconContext } from "react-icons";
import Loading from "../Loading";
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
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${user.id}/posts`,
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

  return (
    <Container>
      <div className="header">
        <h1>linkr</h1>
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
      <h2>My posts</h2>
      <div className="content">
        {isLoading && <Loading />}
        <div className="my-posts">
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
        </div>
      </div>
    </Container>
  );
}
