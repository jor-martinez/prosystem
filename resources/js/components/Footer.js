import React from 'react'
import {Link} from 'react-router-dom'

import logoFoo from './media/resources/footer-logo-1-1.png'
import imgFooter from './media/resources/footer-map-1-1.png'

const Footer = () => (
    <footer className="site-footer" style={{backgroundImage: `url(${imgFooter})`}}>
        <div className="main-footer">
            <div className="container">
            <div className="row no-gutters">
                <div className="footer-widget about-widget">
                    <div className="footer-desc">
                        <Link to="/" className="footer-logo">
                        <img src={logoFoo} alt="Logo" />
                        </Link>
                        <p>En Prosystem le ofrecemos un robusto portafolio de soluciones tecnológicas de seguridad y servicios personalizados</p>
                    </div>
                    {/* <div className="social-block">
                        <a href="http://www.facebook.com" target="blank"><i className="fab fa-facebook-f"></i></a>
                        <a href="http://www.twitter.com" target="blank"><i className="fab fa-twitter"></i></a>
                        <a href="http://www.vimeo.com" target="blank"><i className="fab fa-vimeo-v"></i></a>
                        <a href="http://www.linkedin.com" target="blank"><i className="fab fa-linkedin-in"></i></a>
                    </div> */}
                </div>
                <div className="footer-widget links-widget">
                    <div className="footer-widget-title">
                        <h3>Información</h3>
                    </div>
                    <ul className="links-lists">
                        <li><Link to="/acerca" ><i className="fas fa-chevron-right"></i> Acerca de nosotros</Link></li>
                        <li><Link to="/contacto" ><i className="fas fa-chevron-right"></i> Contáctanos</Link></li>
                        <li><Link to="/servicios" ><i className="fas fa-chevron-right"></i> Servicios</Link></li>
                        
                    </ul>
                </div>
                <div className="footer-widget newsletter-widget">
                    <div className="footer-widget-title">
                        <h3>Contáctanos</h3>
                    </div>
                    <form action="#" className="newsletter-form">
                        <p>Consulta las diferentes opciones de contacto</p>
                        <Link to="/contacto" className="cta-btn">Contáctanos</Link>
                    </form>
                </div>
            </div>
            </div>
        </div>
        <div className="bottom-footer text-center">
            <p>Copyright &copy; 2019 <Link to="/">Pro System.</Link> Todos los derechos reservados</p>
            <p>Creada por <a href="https://www.infornet.mx" target="_blank" >Infornet</a> </p>
        </div>
    </footer>
)
export default Footer