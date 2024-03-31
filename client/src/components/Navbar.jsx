import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import AccountCircle from '@material-ui/icons/AccountCircle';
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOut} from "../redux/userRedux"
import logo from '../assets/logo.png';


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

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
align-items: center;
justify-content: flex-start; // Zarovná obsah na začátek
cursor: pointer;
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
  color: black;
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
  display: flex; // Změna na flexbox pro lepší uspořádání prvků vedle sebe
  align-items: center; // Zarovnání prvků ve flex kontejneru na střed
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Account = styled(AccountCircle)`
  color: black;
  margin-right: 10px;
  font-size: 24px;
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

const Navbar = () => {
  const cartQuantity = useSelector(state=>state.cart.quantity);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogOut = () => {
    dispatch(logOut());
    
  };

  return (
    <Container>
      <Wrapper>

        <Left>
          <LinkLogo to = "/"><img src={logo} alt="RJ-shop Logo" style={{height: '50px'}} />
          </LinkLogo>
        </Left>

        <Center>
          <LinkLogo to = "/"><Logo>RJ - SHOP</Logo></LinkLogo>
        </Center>

        <Right>
          {user.currentUser && (<MenuItemUser><Account className="icon"></Account>{`${user.currentUser.username}`}</MenuItemUser>)}
          <LinkSign to="/login"><MenuItemSign>{user.currentUser ? "" : "PŘIHLÁSIT SE"}</MenuItemSign></LinkSign>
          <LinkSign to="/register"><MenuItemSign>{user.currentUser ? "" : "REGISTRACE"}</MenuItemSign></LinkSign>
          <MenuItemLogOut onClick={() => handleLogOut()}>{user.currentUser ? "ODHLÁSIT SE" : ""}</MenuItemLogOut>

          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={cartQuantity}>
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