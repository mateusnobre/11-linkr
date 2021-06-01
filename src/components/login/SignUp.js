import { Link, useHistory } from "react-router-dom";
import React, { useContext, useState } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
import Container from "./Style";
import UserContext from "../../contexts/UserContext";
import TokenContext from "../../contexts/TokenContext";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState({
    email: false,
    password: false,
    username: false,
    picture: false,
  });
  const [block, setBlock] = useState(false);
  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  function submit(event) {
    event.preventDefault();

    if (block) return;

    if (!email || !password || !username || !picture) {
      alert("Prencha os campos corretamente");
      return;
    }

    setBlock(true);
    const data = {
      email: email,
      password: password,
      username: username,
      pictureUrl: picture,
    };
    
    const url =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up";
    const request = axios.post(url, data);

    request.then((response) => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setToken(response.data.token);
      setBlock(false);
      history.push("/");
    });

    request.catch((error) => {
      if (error.response.status === 400) {
        alert("O email inserido já está cadastrado");
        setBlock(false);
      }
    });
  }

  return (
    <Container>
      <div className="logo">
        <h1>linkr</h1>
        <h2>save, share and discover the best links on the web</h2>
      </div>
      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="e-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></input>
        <input
          type="url"
          placeholder="picture url"
          onChange={(e) => setPicture(e.target.value)}
          value={picture}
        ></input>
        <button>
          {block ? (
            <Loader
              height={35}
              width={35}
              type="ThreeDots"
              color="white"
              visible={true}
            ></Loader>
          ) : (
            "Sign Up"
          )}
        </button>
        <Link to="/">
          <h3>Switch back to log in</h3>
        </Link>
      </form>
    </Container>
  );
}
