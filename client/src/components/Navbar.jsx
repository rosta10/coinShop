import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import AccountCircle from '@material-ui/icons/AccountCircle';
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOut} from "../redux/userRedux"

const Container = styled.div`
  height: 7é=ů0px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const MenuItemSign = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const MenuItemUser = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 0px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


const MenuItemLogOut = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const LinkSign = styled(Link)`
  text-decoration: none;
  color: black;
`;

const LinkLogo = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Account = styled(AccountCircle)`
  text-decoration: none;
  color: black;
  margin-left: 0px;
  font-size: 15px;
`;

const Searching = styled(Search)`
  color: "gray";
  fontSize: 16;
`;

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogOut = () => {
    dispatch(logOut());
    
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>CS</Language>
          <SearchContainer>
            <Input placeholder="Vyhledat" />
            <Searching />
          </SearchContainer>
        </Left>
        <Center>
          <LinkLogo to = "/"><Logo>RJ - SHOP </Logo></LinkLogo>
        </Center>
        <Right>
          <MenuItemUser><Account class="icon"></Account>{user.currentUser ? `  ${user.currentUser.username}` : ""}</MenuItemUser>
          <LinkSign to="/login"><MenuItemSign>{user.currentUser ? "" : "PŘIHLÁSIT SE"}</MenuItemSign></LinkSign>
          <LinkSign to="/register"><MenuItemSign>{user.currentUser ? "" : "REGISTRACE"}</MenuItemSign></LinkSign>
          <MenuItemLogOut onClick={() => handleLogOut()}>{user.currentUser ? "ODHLÁSIT SE" : ""}</MenuItemLogOut>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined/>
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;