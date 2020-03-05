import React from 'react';

const Footer = () =>  {

    const d = new Date();
    const y = d.getFullYear()

    return (
        <footer className="footer">
        <p>&copy; {y} Ming Wang</p>
        </footer>
    );
}

export default Footer;