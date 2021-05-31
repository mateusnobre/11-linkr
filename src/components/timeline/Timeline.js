import { Link, useHistory } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import Container from "./Style";
import { AiOutlineDown } from "react-icons/ai";
import { IconContext } from "react-icons";
import Loading from "../Loading";
import Post from "./Post";
export default function Timeline() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
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
      if(newArray.length === 0) {
        alert("Nenhum post encontrado");
      }
      setPosts([...newArray]);
      setIsLoading(false);
    });

    request.catch((error) => {
      alert("Houve uma falha ao obter os posts, por favor atualize a página");
    });
  }, []);

  return (
    <Container>
      <div className="header">
        <h1>linkr</h1>
        <div className="profile">
          <IconContext.Provider value={{ className: "react-icons" }}>
            <AiOutlineDown />
          </IconContext.Provider>
          <div className="profile-picture">
            <img src={user.avatar} alt="profile" />
          </div>
        </div>
      </div>
      <h2>timeline</h2>
      <div className="content">
        {isLoading && <Loading />}
        <div className="posts">
          {posts.map((post) => (<Post content={post} />))}
        </div>
      </div>
    </Container>
  );
}
