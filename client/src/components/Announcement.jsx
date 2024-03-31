import styled from "styled-components";

const Container = styled.div`
  height: 50px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>Doprava zdarma při nákupu nad 1000Kč</Container>;
};

export default Announcement;
