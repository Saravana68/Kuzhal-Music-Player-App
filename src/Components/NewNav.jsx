import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'


 const Nav = ({Visible,setVisible}) => {
    
    //  console.log(Visible);
    return (
        <nav>
            <h1>Kuzhal❤️</h1>
            <button onClick={ ()=> setVisible(!Visible)} >
                Library 
                <FontAwesomeIcon icon={faMusic}/>
            </button>
        </nav>
    )
}

export default Nav;