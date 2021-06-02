import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "./Style";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { IconContext } from "react-icons";
import Loading from "../Loading";
import Post from "./Post";
export default function Timeline() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
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
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts",
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
  }, []);

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

    if(url === "") {
      alert("Insira um link válido");
      return;
    }
    alert("post criado");
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
        <Link to="my-posts" className="logout">My posts</Link>
        <Link to="my-likes" className="logout">My likes</Link>
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
                ></input>
                <input
                  type="text"
                  placeholder="Muito irado esse link falando de #javascript"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></input>
                <button>Publicar</button>
              </form>
            </div>
          </div>
          {posts.map((post) => (
            <Post content={post} config={config}/>
          ))}
        </div>
        <div className="trending"></div>
      </div>
    </Container>
  );
}
