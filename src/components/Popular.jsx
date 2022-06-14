import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SlideSlide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {Link} from 'react-router-dom';

function Popular() {

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {

    const check = localStorage.getItem('popular');

    if (check) {
      setPopular(JSON.parse(check));
    }
    else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
      const data = await api.json();
      setPopular(data.recipes);
      localStorage.setItem("popular", JSON.stringify(data.recipes));
    }
  }

  return (
    <Wrapper>
      <h2>Popular Picks</h2>
      <Splide options={{
        perPage: 4,
        gap: '2rem',
        arrows: true,
        breakpoints:{
          767:{perPage:2}
        }
      }}>
        {popular.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <Link to={"/recipe/"+recipe.id}>
              <Card>
                <img src={recipe.image} alt={recipe.title} />
                <p>{recipe.title}</p>
                <Gradient />
              </Card>
              </Link>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  )
}

const Wrapper = styled.div`
margin:4rem 0;
`;
const Card = styled.div`
border-radius:4px;
height:15rem;
position:relative;
overflow:hidden;
img{
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  left:0;
  object-fit:cover;
}
p{
  position:absolute;
  bottom:20px;
  left:20px;
  z-index:10;
  color:#fff;
  padding-right:20px;
}
`;
const Gradient = styled.div`
height:100%;
width:100%;
position:absolute;
background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.8));
z-index:5;
`;

export default Popular  