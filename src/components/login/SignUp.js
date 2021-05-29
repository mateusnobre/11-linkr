import { Link, useHistory } from "react-router-dom";
import React, { useContext, useState } from "react";
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
  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  function submit(event) {
    event.preventDefault();

    const data = {
      "email": email,
      "password": password,
      "username": username,
      "pictureUrl": picture,
    };
    console.log(data);
    const url =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up";
    const request = axios.post(url, data);

    request.then((response) => {
      setUser(response.data.user);
      setToken(response.data.token);
      history.push("/timeline");
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
        <button>Sign Up</button>
        <Link to="/">
          <h3>Switch back to log in</h3>
        </Link>
      </form>
    </Container>
  );
}
