import {FaPizzaSlice, FaHamburger} from 'react-icons/fa';
import {GiNoodles, GiChickenOven} from 'react-icons/gi';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

function Category() {
  return (
    <List>
        <NavLink to={'/cuisine/indian'}>
            <GiChickenOven/>
            <h4>Indian</h4>
        </NavLink>
        <NavLink to={'/cuisine/italian'}>
            <FaPizzaSlice/>
            <h4>Italian</h4>
        </NavLink>
        <NavLink to={'/cuisine/american'}>
            <FaHamburger/>
            <h4>American</h4>
        </NavLink>
        <NavLink to={'/cuisine/thai'}>
            <GiNoodles/>
            <h4>Thai</h4>
        </NavLink>
        
    </List>
  )
}

const List = styled.div`
display:flex;
justify-content:center;
gap:2rem;
align-items:center;
margin:2rem;
overflow-x:auto;

@media (max-width:767px){justify-content:start;}

a{
    display:flex;
    text-decoration:none;
    gap:.5rem;
    align-items:center; 
    color:#000;
    background-color:#fff;
    padding:.5rem .8rem;
    border-radius:4px;
    border:.1rem solid;
}

a:hover, a.active{
    color:#fff;
    background-color:#000;
}

h4{
    margin:0;
}

`;

export default Category