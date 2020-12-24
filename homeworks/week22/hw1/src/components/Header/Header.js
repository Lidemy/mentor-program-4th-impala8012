import { useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";

const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0 32px;
`;

const Brand = styled.div`
  font-size: 32px;
  font-weight:bold
`

const NavBarList = styled.div`
  display:flex; 
  align-items: center;
  height: 64px;
`

const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100px;
  cursor: pointer;
  color: black;
  text-decoration: none;

  ${(props) =>
    props.$active &&
    `
  background: rgba(0,0,0,0.1)
  `}
`;

const LeftContainer = styled.div`
  display:flex;
  align-items:center;

  // 底下的 navbarList 才有 margin-left
  ${NavBarList} {
    margin-left: 32px;
  }
`

export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const {user, setUser} = useContext(AuthContext);

  function handleLogout() {
    setAuthToken("");
    setUser(null);
    history.push('/');
  }
  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand>部落格</Brand>
        <NavBarList>
          <Nav $active={location.pathname === "/"} to="/">
            首頁
          </Nav>
          <Nav $active={location.pathname === "/about"} to="/about">
            關於我
          </Nav>
          {user && (
            <Nav $active={location.pathname === "/new-post"} to="/new-post">
              發布文章
            </Nav>
          )}
        </NavBarList>
      </LeftContainer>
      <NavBarList>
        {!user && (
          <>
            <Nav $active={location.pathname === "/login"} to="/login">
              登入
            </Nav>
            <Nav $active={location.pathname === "/register"} to="/register">
              註冊
            </Nav>
          </>
        )}
        {user && <Nav onClick={handleLogout}>登出</Nav>}
      </NavBarList>
    </HeaderContainer>
  );
}

