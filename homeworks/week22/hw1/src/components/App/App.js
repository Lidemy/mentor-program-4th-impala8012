import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Header";
import {
  HomePage,
  LoginPage,
  PostPage,
  AboutPage,
  RegisterPage,
  NewPostPage,
} from "../../pages";
import { AuthContext, LoadingContext } from "../../contexts";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { getMe } from "../../WebAPI";
import { getAuthToken } from "../../utils";


const Root = styled.div`
padding-top:64px;
`

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 有 token 才 call api
    if (getAuthToken()) {
      getMe().then((response) => {
        if (response.ok) {
          setUser(response.data);
        }
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            <Header />
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route path="/new-post">
                <NewPostPage />
              </Route>
              <Route path="/posts/:id">
                <PostPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/Register">
                <RegisterPage />
              </Route>
            </Switch>
          </LoadingContext.Provider>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
