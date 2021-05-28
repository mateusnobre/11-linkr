import Container from "./Style";
import { Link, useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import TokenContext from "../../contexts/TokenContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const history = useHistory();

  function login(event) {
    event.preventDefault();

    const url =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up";
    const data = { email: email, password: password };

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
        <button>Log in</button>
        <Link to="/sign-up">
          <h3>First time? Create an account!</h3>
        </Link>
      </form>
    </Container>
  );
}
