import Container from "./Style";
import { Link, useHistory } from "react-router-dom";
import React, { useContext, useState } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import TokenContext from "../../contexts/TokenContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [block, setBlock] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const history = useHistory();

  if(localStorage.getItem('token')){
    history.push('/timeline');
  }

  function login(event) {
    event.preventDefault();

    if (block) return;

    if (!email || !password) {
      alert("Preencha os campos corretamente");
      return;
    }

    setBlock(true);

    const url =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in";
    const data = { email: email, password: password };


    const request = axios.post(url, data);


    request.then((response) => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setToken(response.data.token);
      setBlock(false);
      history.push("/timeline");
    });
    request.catch((error) => {
      if (error.response.status === 403) {
        alert("Email/senha incorretos");
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
      <form onSubmit={login}>
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
            "Log in"
          )}
        </button>
        <Link to="/sign-up">
          <h3>First time? Create an account!</h3>
        </Link>
      </form>
    </Container>
  );
}
