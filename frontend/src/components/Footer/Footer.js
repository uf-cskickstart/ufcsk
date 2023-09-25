import * as React from 'react';

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer>
            <p>{`Copyright © CS Kickstart UF ${year}`}</p>  
        </footer>
        
    );
}

export default Footer;