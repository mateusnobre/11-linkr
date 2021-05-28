import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";
import SignIn from "./login/SignIn";
import SignUp from "./login/SignUp";
import Timeline from "./timeline/Timeline";

export default function App() {
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <SignIn></SignIn>
            </Route>
            <Route path="/sign-up" exact>
              <SignUp></SignUp>
            </Route>
            <Route path="/timeline" exact>
              <Timeline></Timeline>
            </Route>
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}
