import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filtr:</FilterText>
          {cat === "banknote" ? (
            <Select name="type" onChange={handleFilters}>
              <Option value="" selected>Všechny</Option>
              <Option>české</Option>
              <Option>nové</Option>
              <Option>zahraniční</Option>
            </Select>
          ) : cat === "coin" ? (
            <Select name="type" onChange={handleFilters}>
              <Option value="" selected>Všechny</Option>
              <Option>zlaté</Option>
              <Option>stříbrné</Option>
              <Option>bronzové</Option>
            </Select>
          ) : (
            <Select name="stamps" onChange={handleFilters}>
              <Option value="" selected>Všechny</Option>
              <Option>poštovní</Option>
              <Option>historické</Option>
              <Option>sběratelské</Option>
            </Select>
          )}
        </Filter>
        <Filter>
          <FilterText>Řazení:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Nejnovější</Option>
            <Option value="asc">Cena (od nejnižší)</Option>
            <Option value="desc">Cena (od nejvyšší)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;