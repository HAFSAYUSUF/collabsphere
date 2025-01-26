import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
background: #333;
color: white;
text-align: center;
padding: 1rem 0;
margin-top: 20px;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>© {new Date().getFullYear()} Community Connect. All rights reserved.</p>
        </FooterContainer>
    );
};

export default Footer;