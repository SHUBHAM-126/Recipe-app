import Home from "./Home";
import { Routes, Route, useLocation } from 'react-router-dom';
import Cuisine from './Cuisine';
import SearchResults from './SearchResults';
import Recipe from "./Recipe";
import { AnimatePresence } from 'framer-motion';

function Pages() {
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes Location={location} key={location.pathname}>
        <Route exact path="/" element={<Home />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path="results/:search" element={<SearchResults />} />
        <Route path="recipe/:id" element={<Recipe />} />
      </Routes>
    </AnimatePresence>
  )
}

export default Pages