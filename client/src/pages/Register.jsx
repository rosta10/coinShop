import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { register } from "../redux/apiCalls";
import { useDispatch } from "react-redux";

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
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, { firstName, lastName, username, password, email });
  };


  return (
    <Container>
      <Wrapper>
        <Title>VYTVOŘIT ÚČET</Title>
        <Form>
          <Input onChange={(e) => { setFirstName(e.target.value) }} placeholder="jméno" />
          <Input onChange={(e) => { setLastName(e.target.value) }} placeholder="příjmení" />
          <Input onChange={(e) => { setUsername(e.target.value) }} placeholder="uživatelské jméno" />
          <Input onChange={(e) => { setEmail(e.target.value) }} placeholder="email" />
          <Input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="heslo" />
          <Agreement>
            Vytvořením účtu souhlasím se zpracováním svých osobních údajů v souladu se zásadami ochrany <b>OSOBNÍCH ÚDAJŮ</b>.
          </Agreement>
          <Button onClick={handleClick}>VYTVOŘIT</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;