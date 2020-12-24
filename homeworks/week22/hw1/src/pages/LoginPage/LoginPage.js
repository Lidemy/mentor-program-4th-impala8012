import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {login, getMe} from "../../WebAPI"
import { setAuthToken } from "../../utils";
import { AuthContext, LoadingContext } from "../../contexts";
import Loading from "../../components/Loading";

const ErrorMessage = styled.div`
  color:red;
`

const LoginForm = styled.form`
  margin: 50px auto;
  width: 500px;
  border: 1px solid #ccc;
  padding: 30px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const LoginInput = styled.div`

  input{
    border-radius:5px;
    outline: none;
  }
`;

const LoginButton = styled.button`
  width: 30%;
  margin: 10px auto;
  border-radius: 5px;
  outline: none;
`;

export default function LoginPage() {
  const {setUser } = useContext(AuthContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const history = useHistory()

  const handleSubmit = e => {
    setErrorMessage(null)
    setIsLoading(true)
    login(username, password).then((data)=> {
      if(data.ok === 0) {
        setIsLoading(false)
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);
      getMe().then(response => {
        if(response.ok !== 1) {
          setAuthToken(null)
          setIsLoading(false);
          return setErrorMessage(response.toString());
        }
        setUser(response.data);
        setIsLoading(false);
        history.push("/");

      })
    })
  }
  return (
    <LoginForm onSubmit={handleSubmit}>
      <LoginInput>
        <div>
          username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </LoginInput>
      {isLoading ? <Loading /> : <LoginButton>登入</LoginButton>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </LoginForm>
  );
}