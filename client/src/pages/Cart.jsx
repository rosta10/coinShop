import { Add, Delete, Remove} from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";

import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { removeFromCart, decreaseQuantity, increaseQuantity} from "../redux/cartRedux"

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const DeleteIcon = styled(Delete)`
cursor: pointer;
margin-left: 40px;
`;

const DecreaseQuantity = styled(Remove)`
cursor: pointer;
`;

const IncreaseQuantity = styled(Add)`
cursor: pointer;
`;

const Cart = () => {
  const quantity = useSelector(state=>state.cart.quantity);
  const shippingCost = useSelector(state=>state.cart.shippingCost);
  const shippingDiscount = useSelector(state=>state.cart.shippingDiscount);
  const totalAmount = useSelector(state=>state.cart.totalAmount);
  const cart = useSelector(state => state.cart);
  console.log(cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onToken = (stripeToken) => {
    setStripeToken(stripeToken);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        navigate("/success", {
          stripeData: res.data,
          products: cart, });
      } catch {

      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, cart, navigate]);


  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseQuantity(product));
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(increaseQuantity(product));
  };




  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>KOŠÍK</Title>
        <Top>
          <TopButton>POKRAČOVAT V NÁKUPU</TopButton>
          <TopTexts>
            <TopText>NÁKUPNÍ KOŠÍK ({quantity})</TopText>
            <TopText>OBLÍBENÉ (0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
          {cart.products.map((product) => (

              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Produkt:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                  <DecreaseQuantity onClick={() => handleDecreaseQuantity(product)}/>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <IncreaseQuantity onClick={() => handleIncreaseQuantity(product)}/>
                    <DeleteIcon onClick={() => handleRemoveFromCart(product)}/>
                  </ProductAmountContainer>
                  <ProductPrice>{product.price * product.quantity},- CZK</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>SHRNUTÍ OBJEDNÁVKY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Mezisoučet</SummaryItemText>
              <SummaryItemPrice>{cart.total},- CZK</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Doprava</SummaryItemText>
              <SummaryItemPrice>{shippingCost},- CZK</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Sleva na dopravu</SummaryItemText>
              <SummaryItemPrice>{shippingDiscount},- CZK</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Celkově</SummaryItemText>
              <SummaryItemPrice>{totalAmount},- CZK</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="RJ - shop"
              image="logo.png"
              billingAddress
              shippingAddress
              description={`Celková cena je ${totalAmount},- CZK`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={process.env.REACT_APP_STRIPE}
            >
              <Button>ZAPLATIT</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
