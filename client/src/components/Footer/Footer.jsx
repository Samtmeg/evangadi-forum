import React from 'react';
import classes from './Footer.module.css'
import EvangadiLogo from '../../assets/evangadi-logo-footer.png'
import { SiFacebook } from "react-icons/si";
import { ImInstagram } from "react-icons/im";
import { BsYoutube } from "react-icons/bs";

function Footer () {
    return (
        <div className={classes.footer__wrapper}>
            <div className={classes.logo__container}>
                <div className={classes.footer__logo__container}>
                    <div>
                        <img src={EvangadiLogo} alt="Evangadi Logo"/>
                    </div>
                    <div className={classes.footer__sm__logo}>
                        <ul className={classes.sm__logo_container}>
                            <li><SiFacebook size={30} color='white'border/></li>
                            <li><ImInstagram size={30} color='white'/></li>
                            <li><BsYoutube size={30} color='white'/></li>
                        </ul>
                    </div>
                </div>
                <div className={classes.footer__link__container}>
                    <div>Useful Link</div>
                    <ul>
                        <li>Terms of Service</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className={classes.footer__info__container}>
                    <div>Contact Info</div>
                    <ul>
                        <li>support@evangadi.com</li>
                        <li>+1-202-386-2702</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
