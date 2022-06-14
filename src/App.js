import Category from "./components/Category";
import Pages from "./pages/Pages";
import { BrowserRouter } from 'react-router-dom';
import Search from "./components/Search";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Category />
      <div className="content">
        <Pages />
      </div>
    </BrowserRouter>
  );
}

export default App;
