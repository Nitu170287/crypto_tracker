import React from "react";
import "./style.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
  <div className="footer">
  <h1 className="logo">CryptoTracker</h1>
  <div className="social-network-icon">
    <FacebookIcon/>
    <LinkedInIcon/>
    <InstagramIcon/>
  </div>
  </div>)
};
export default Footer;
