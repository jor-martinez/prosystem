import React from 'react'
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet'

import pageTitle from './media/resources/page-title-bg.jpg'

import Brand from './sliderMarcas'

const Contact = () => (
   <div>
      <Helmet>
         <title>Contacto</title>
      </Helmet>
      <section className="page-title-block text-center" style={{backgroundImage: `url(${pageTitle})`}}>
         <div className="container">
            <h2>Contacto</h2>
            <div className="thm-breadcrumb">
               <Link to="/">Inicio</Link>
               <span className="sep">/</span>
               <span className="page-title">Contacto</span>
            </div>
         </div>
      </section>
      <section className="contact-info-style-one">
         <div className="container">
            <div className="title-block text-center">
               <span className="tag-line">Contacto</span>{/* /.tag-line */}
               <h2>Información de Contacto</h2>
            </div>{/* /.title-block */}
            <div className="row high-gutter">
               <div className="single-contact-info-one text-center">
                  <div className="inner-block">
                     <i className="fas fa-map-marker-alt"></i>
                     <h3>Ubicación</h3>
                     <p>Ocotlán - Santa Ana 1, Tlapancalco, Tlacomulco, 90118 Chiautempan, Tlax.</p>
                  </div>{/* /.inner-block */}
               </div>{/* /.single-contact-info-one */}
               <div className="single-contact-info-one text-center">
                  <div className="inner-block">
                     <i className="fas fa-mobile-alt"></i>
                     <h3>Teléfonos</h3>
                     <p>(246) 46 6 6392 </p>
                  </div>{/* /.inner-block */}
               </div>{/* /.single-contact-info-one */}
               <div className="single-contact-info-one text-center">
                  <div className="inner-block">
                     <i className="fas fa-envelope"></i>
                     <h3>Correos</h3>
                     <p>info@prosystem.mx  <br/> ventas@prosystem.mx </p>
                  </div>{/* /.inner-block */}
               </div>{/* /.single-contact-info-one */}
            </div>{/* /.row */}
         </div>{/* /.container */}
      </section>
      <section className="contact-form-wrapper">
         <div className="container">
            <div className="inner-container">
               <div className="row no-gutters">
                  <div className="contact-map-block">
                     <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.2036291094164!2d-98.22034898505918!3d19.31696824937345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfdecb9b760e0b%3A0xe094236faac1397f!2sProsystem!5e0!3m2!1ses-419!2smx!4v1563999944440!5m2!1ses-419!2smx" width="100%" height="100%" frameBorder={0} style={{border: 0}} allowFullScreen />
                  </div>{/* /.col-lg-6 */}
                  <div className="contact-form-block my-auto">
                     <div className="title-block">
                     <span className="tag-line">Escríbenos un mensaje</span>{/* /.tag-line */}
                     <h2>¡Mantente en contacto!</h2>
                     </div>{/* /.title-block */}
                     <form action="inc/sendemail.php" className="contact-form-one contact-form-validated">
                        <input type="text" name="name" placeholder="Su nombre" />
                        <input type="text" name="email" placeholder="Su correo" />
                        <textarea placeholder="Su mensaje" name="message" defaultValue={""} />
                        <button type="submit">Enviar ahora</button>
                     </form>
                  </div>{/* /.contact-form-block */}
               </div>{/* /.row */}
            </div>{/* /.inner-container */}
         </div>{/* /.container */}
      </section>
      <section className="brands-area-one">
         <Brand/>
      </section>
   </div>
)

export default Contact
