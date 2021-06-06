import { Link, useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "./Style";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { IconContext } from "react-icons";
import Loading from "../Loading";
import Post from "./Post";
export default function Hashtag() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [hashtagSearch, setHashtagSearch] = useState("");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const params = useParams();
  const [render, setRender] = useState([params.hashtag]);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (render[0] !== params.hashtag) {
    setRender([params.hashtag]);
  }

  useEffect(() => {
    setIsLoading(true);
    const request = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${params.hashtag}/posts`,
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

  return (
    <Container>
      <div className="header">
        <Link to="/">
          <h1>linkr</h1>
        </Link>
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
      <h2>#{params.hashtag}</h2>
      <div className="content">
        {isLoading && <Loading />}
        <div className="posts">
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
