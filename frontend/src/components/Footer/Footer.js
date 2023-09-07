import * as React from 'react';
import Container from '@mui/material/Container';

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer>{`Copyright © UF CS Kickstart ${year}`}</footer>
    );
}

export default Footer;