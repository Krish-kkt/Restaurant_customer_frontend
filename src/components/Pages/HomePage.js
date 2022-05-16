import { useState } from "react";
import Nav from "../Layouts/Nav";
import classes from './HomePage.module.css';
import Footer from "../Layouts/Footer";
import seperatorImg from '../../img/seperator.png'
import coffee1 from '../../img/coffee1.jpg'
import coffee2 from '../../img/coffee2.jpg'
import coffeeCup from '../../img/coffeeCup.png';
import leftBanner from '../../img/banner1.png';
import rightBanner from '../../img/banner2.png';
import React, { useEffect } from "react";
import Punchline from "../Layouts/PunchLine";

 
const HomePage=(props)=>{

    
    // console.log('homepage');
    useEffect(()=>{
        
        if (window.scrollY) {
            window.scroll(0, 0); 
          }
    },[])

    return (
        <div>
            <div className={classes.navSection}>
                <Nav />
                <Punchline />
            </div>
            <img src={seperatorImg} className={classes.seperatorImg} />
            <div className={classes.section2} >
                <img src={coffee1} className={classes.section2Img} alt='Coffee 2' />
                <div className={classes.section2Content}>
                    <div className={classes.heading}>Vivamus in diam condimentum maximus</div>
                    <div className={classes.underline}></div>
                    <div className={classes.description}>
                        Maecenas non laoreet odio. Fusce lobortis porttitor purus, vel vestibulum libero pharetra vel. Pellentesque lorem augue, fermentum nec nibh et, fringilla sollicitudin orci. Integer pharetra magna non ante blandit lobortis. Sed mollis.
                    </div>
                </div>

            </div>
            <div className={classes.section3}>
                <div className={classes.section3Content}>
                    <div className={classes.heading}>Integer pharetra magna non ante blandit</div>
                    <div className={classes.underline}></div>
                    <div className={classes.description}>
                        Libero pharetra vel. Pellentesque lorem augue, fermentum nec nibh et, fringilla sollicitudin orci. Integer pharetra magna non ante blandit lobortis. 
                    </div>

                </div>
                <img src={coffee2} className={classes.section3Img} alt='Coffee 3' />
            </div>
            <div className={classes.section4}>
                <div className={classes.leftSection4}>
                    <img src={leftBanner} alt='img' className={classes.section4Img} />
                    <div className={classes.leftHeadingSection4}>Fusce interdum justo quis libero ultricies</div>
                    <div className={classes.leftUnderlineSection4}></div>
                    <div className={classes.leftDescriptionSection4}>
                        Fusce ut velit laoreet, tempus arcu eu, molestie tortor. Nam vel justo cursus, faucibus lorem eget, egestas eros.
                    </div>

                </div>
                <img src={coffeeCup} className={classes.ceterSection4Img} />
                <div className={classes.rightSection4}>
                    <div className={classes.rightHeadingSection4}>Fusce interdum justo quis libero ultricies</div>
                    <div className={classes.rightUnderlineSection4}></div>
                    <div className={classes.rightDescriptionSection4}>
                        Fusce ut velit laoreet, tempus arcu eu, molestie tortor. Nam vel justo cursus, faucibus lorem eget, egestas eros.
                    </div>
                    <img src={rightBanner} alt='img' className={classes.section4Img} />
                </div>
                 
            </div>
            <div className={classes.section5}>
                <div className={classes.contentSection5}>
                    <div className={classes.headingSection5}>
                        Curabitur sed iaculis dolor, non congue ligula.
                    </div>
                    <div className={classes.descriptionSection5}>
                        Nunc urna libero, congue porta nibh a, semper feugiat sem. Sed auctor dui eleifend, scelerisque eros ut, pellentesque nibh. Nam lacinia suscipit accumsan. Donec sodales, neque.
                    </div>
                    <div>
                        <ul>
                            <li>Suspendisse a pellentesque dui, non felis.</li>
                            <li>Quisque cursus et, porttitor risus.</li>
                            <li>Quisque lorem tortor fringilla sed.</li>
                            <li>Nulla ipsum dolor lacus, suscipit adipiscing.</li>
                        </ul>
                    </div>
                </div>

            </div>
            <div >
                <Footer />
            </div>
        </div>
    )
}

export default React.memo(HomePage);