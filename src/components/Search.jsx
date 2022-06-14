import styled from 'styled-components';
import { useState } from 'react';
import {FaSearch} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

function Search() {

  const [input , setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/results/'+input);
  }

  return (
    <div>
      <FormStyled onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(e)=> setInput(e.target.value)} placeholder="Search..."/>
        <FaSearch/>
      </FormStyled>
    </div>
  )
}

const FormStyled = styled.form`
margin:0;
position:relative;
width:100%;
display:flex;
justify-content:center;
max-width:20em;

input{
  border:1px solid #000;
  padding:.6rem;
  padding-left:calc(10px + 1.5em);
  border-radius:4px;
  outline:0;
  font-size:1rem;
  width:100%;
}

svg{
  position:absolute;
  left:10px;
  top:50%;
  transform:translatey(-50%);
}
`;

export default Search