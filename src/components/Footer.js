import React from 'react';

const Footer = () => {

    const d = new Date();
    const y = d.getFullYear()

    return (
        <div>
            <footer className="footer">
                <p>&copy; {y} Ming Wang</p>
            </footer>
            <a className="manual" href="https://drive.google.com/file/d/19wig1X7BZ0Fmoa3TCai8FyeFnD6YXaMe/view?usp=sharing"  target="_blank">
                Manual
            </a>
        </div>

    );
}

export default Footer;