import React from 'react'
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet'

import pageTitle from './media/resources/page-title-bg.jpg'
import video from './media/resources/video-1-1.png'
import cta from './media/resources/building.jpg'

import Brand from './sliderMarcas'


const About = () => (
   <div>
      <Helmet>
         <title>Acerca de</title>
      </Helmet>
      <section className="page-title-block text-center" style={{backgroundImage: `url(${pageTitle})`}} >
         <div className="container">
            <h2>Acerca de nosotros</h2>
            <div className="thm-breadcrumb">
               <Link to="/">Inicio</Link>
               <span className="sep">/</span>
               <span className="page-title">Acerca de nosotros</span>
            </div>
         </div>
      </section>
      <section className="about-style-two">
         <div className="container">
            <div className="row">
                  <div className="video-block-style-one">
                     <img src={video} alt="Video" />
                     <a href="#" className="video-button"><i className="fa fa-play" /></a>
                  </div>
                  <div className="content-block my-auto">
                     <div className="title-block">
                        <span className="tag-line">Nuestra historia</span>{/* /.tag-line */}
                        <h2>10 años de experiencia</h2>
                     </div>{/* /.title-block */}
                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiu smod tempor incidunt enim ad minim veniam quis nostrud exerc tation ullamco laboris nisi ut aliquip ex ea commodo con sequat duis aute irure dolor.</p>
                     <ul className="list-item">
                        <li><i className="far fa-circle"></i> Convallis ligula ligula gravida tristique.</li>
                        <li><i className="far fa-circle"></i> Convallis ligula ligula gravida tristique.</li>
                     </ul>{/* /.list-item */}
                     <a href="#" className="more-btn">Otra acción</a>
                  </div>{/* /.content-block */}
            </div>{/* /.row */}
         </div>{/* /.container */}
      </section>
      <section className="mission-style-one wow fadeInUp home-page-two" data-wow-duration="1300ms">
         <div className="container">
            <div className="inner-container">
               <div className="single-mission-one">
                  <div className="count-block">
                     01
                  </div>{/* /.count-block */}
                  <h3>Nuestra misión</h3>
                  <p>Retro tattooed tousled, disrupt portland <br /> synth slow-carb brooklyn.</p>
               </div>{/* /.single-mission-one */}
               <div className="single-mission-one">
                  <div className="count-block">
                     02
                  </div>{/* /.count-block */}
                  <h3>Nuestra Visión</h3>
                  <p>Retro tattooed tousled, disrupt portland <br /> synth slow-carb brooklyn.</p>
               </div>{/* /.single-mission-one */}
               <div className="single-mission-one">
                  <div className="count-block">
                     03
                  </div>{/* /.count-block */}
                  <h3>Nuestros valores</h3>
                  <p>Retro tattooed tousled, disrupt portland <br /> synth slow-carb brooklyn.</p>
               </div>{/* /.single-mission-one */}
            </div>{/* /.inner-container */}
         </div>{/* /.container */}
      </section>
      <section className="cta-style-one text-center home-page-two" style={{backgroundImage: `url(${cta})`}} >
         <div className="container">
            <div className="title-block">
               <span className="tag-line">¡Mantente seguro!</span>{/* /.tag-line */}
               <h2>Llamado de acción</h2>
            </div>{/* /.title-block */}
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt <br /> mollit anim id est laborum.</p>
            <a href="index.html" className="cta-btn">Otra acción</a>
         </div>{/* /.container */}
      </section>
      <section className="brands-area-one">
         <Brand/>
      </section>
   </div>
)

export default About
