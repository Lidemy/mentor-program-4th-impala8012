import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { register, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { AuthContext, LoadingContext } from "../../contexts";
import Loading from "../../components/Loading";

const ErrorMessage = styled.div`
  color:red;
`

const RegisterForm = styled.form`
  margin: 50px auto;
  width: 500px;
  border: 1px solid #ccc;
  padding: 30px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const RegisterInput = styled.div`
  input {
    border-radius: 4px;
    outline: none;
  }
`;

const LoginButton = styled.button`
  width: 30%;
  margin: 10px auto;
  border-radius: 5px;
  outline: none;
`;

export default function RegisterPage() {
  const { setUser } = useContext(AuthContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const history = useHistory()

  const handleSubmit = e => {
    setErrorMessage(null)
    setIsLoading(true);
    register(username, nickname, password).then((data) => {
      if (data.ok === 0) {
        setIsLoading(false);
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);
      getMe().then((response) => {
        if (response.ok === 0) {
          setAuthToken(null);
          setIsLoading(false);
          return setErrorMessage(response.toString());
        }
        setUser(response.data);
        setIsLoading(false);
        history.push("/");
      });
    });
  }
  return (
    <RegisterForm onSubmit={handleSubmit}>
      <RegisterInput>
        <div>
          username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          nickname:{" "}
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
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
      </RegisterInput>
      {isLoading ? <Loading /> : <LoginButton>註冊</LoginButton>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </RegisterForm>
  );
}