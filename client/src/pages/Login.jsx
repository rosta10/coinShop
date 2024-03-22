import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img41.rajce.idnes.cz/d4102/18/18493/18493889_c9bdb110fac72ad76ff759007b1247dc/images/erftghdfguherthdf.jpg?ver=0")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const LinkSign = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
  font-size: 12px;
  margin: 5px 0px;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <Container>
      <Wrapper>
        <Title>PŘIHLÁŠENÍ</Title>
        <Form>
          <Input
            placeholder="uživatelské jméno"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="heslo"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            PŘIHLÁSIT SE
          </Button>
          {error && <Error>Něco je špatně...</Error>}
          <LinkSign>ZAPOMENUTÉ HESLO</LinkSign>
          <LinkSign to = "../register">VYTVOŘIT NOVÝ ÚČET</LinkSign>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
