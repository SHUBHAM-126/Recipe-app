import { useEffect, useState } from 'react';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";

function Recipe() {

  const params = useParams();
  const [details, setDetails] = useState({});

  const check = localStorage.getItem(params.id);

  const [activetab, setActivetab] = useState("instructions");
  const [loaded, setLoaded] = useState(false);

  const fetchDetails = async () => {

    if (check) {
      setDetails(JSON.parse(check));
    }
    else {
      const data = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
      const info = await data.json();
      setDetails(info);
      localStorage.setItem(params.id, JSON.stringify(info));
    }
  }

  useEffect(() => {
    fetchDetails();
    setLoaded(true);
  }, [params.id]);

  return (
    <InfoWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
      <img src={details.image} />
      <div>
        <h2>{details.title}</h2>
        <p className='body-txt' dangerouslySetInnerHTML={{ __html: details.summary }}></p>

        {loaded && <div>
          <div className='tabs'>
            <button className={activetab === "instructions" ? "active" : ""} onClick={() => { setActivetab("instructions") }}>Instructions</button>
            <button className={activetab === "ingredients" ? "active" : ""} onClick={() => { setActivetab("ingredients") }}>Ingredients</button>
          </div>
          <div className='tab-content'>
            {activetab === "instructions" && <div dangerouslySetInnerHTML={{ __html: details.instructions }}></div>}

            {activetab === "ingredients" && <ul>
              {details.extendedIngredients.map((item) => (
                <li key={item.id}>{item.original}</li>
              ))}
            </ul>}
          </div></div>}
      </div>

    </InfoWrapper>
  )
}

const InfoWrapper = styled(motion.div)`
margin:5rem auto;
max-width:720px;
display:flex;
flex-direction:column;
gap:1.5rem;
align-items:flex-start;

img{
  border-radius:3px;
  width:100%;
}

.body-txt{
  margin-bottom:1.5rem;
  line-height:1.4em;

  a{
    color:#047bff;
    text-decoration:none;
  }
  a:hover{
    text-decoration:underline;
    text-underline-offset:1px;
    text-decoration-thickness:from-font;
  }
}

.tabs{
  background:#eee;
  display:flex;
}
.tabs button{
  border:0;
  background:transparent;
  padding:.6rem 2rem;
  font-size:15px;
  border-right:.125rem solid #fff;
  position:relative;
  cursor:pointer;
}
.tabs button.active::after{
  content:'';
  position:absolute;
  top:0;
  left:0;
  width:100%;
  border-top:.125rem solid #000;
} 
.tab-content{
  padding:1rem;
  background:#eee;
  border-top:.125rem solid #fff;
  line-height:1.4em;
}
.tab-content ul, .tab-content ol{
  padding:0;
  list-style-position:inside;
}
.tab-content li{
  margin-bottom:.5rem;
}
`;

export default Recipe