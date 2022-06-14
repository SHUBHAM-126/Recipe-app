import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { VscArrowRight } from "react-icons/vsc";

function SearchResults() {
  const [results, setResults] = useState([]);
  let params = useParams();
  const [empty, setEmpty] = useState(false);

  const getResults = async (name) => {

    const check = localStorage.getItem(name);

    if (check) {
      setResults(JSON.parse(check));
    }
    else {
      const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=8`)
        .catch((err) => {
          console.log("Error:" + err.messaage);
        });
      const recipes = await data.json();
      setResults(recipes.results);
      localStorage.setItem(name, JSON.stringify(recipes.results));
    }

    if (check == "") {
      setEmpty(true);
    }
    else {
      setEmpty(false);
    }

    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=8`);
    const recipes = await data.json();

    if (recipes.results == "") {
      setEmpty(true);
    }
    else {
      setEmpty(false);
    }
  }

  useEffect(() => {
    getResults(params.search);
  }, [params.search]);

  return (
    <motion.div animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
      <h2>Search Results for: {params.search}</h2>
      {empty && <h4>No results found :(</h4>}
      <Grid>
        {results.map((item) => {
          return (
            <Card key={item.key}>
              <img src={item.image} />
              <h4>{item.title}</h4>
              <Link to={"/recipe/" + item.id}><button>Read More <VscArrowRight /></button></Link>
            </Card>
          )
        })}
      </Grid>
    </motion.div>
  )
}

const Grid = styled.div`
display:grid;
grid-template-columns:repeat(auto-fit, minmax(15rem,1fr));
grid-gap:2rem;
margin-bottom:4rem;
`;

const Card = styled.div`
border-radius:4px;
img {
  width:100%;
  object-fit:cover;
  margin-bottom:.5rem;
  border-radius:4px;
}
a{
  text-decoration:none;
}
button{
  margin-bottom:10px;
  cursor:pointer;
  display:inline-flex;
  align-items:center;
  padding:.5rem 1rem;
  gap:5px;
  color:#000;
  background:#fff;
  border:.1rem solid;
  border-radius:3px;
  font-size:15px;
}
button svg{
  font-size:1em;
  transition:transform 100ms ease;
}
button:hover svg{
  transform:translatex(5px);
}
`;

export default SearchResults