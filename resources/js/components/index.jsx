import React, {Component} from 'react'
import {
   Route,
	BrowserRouter as Router,
	Link,
	Redirect,
	Switch
} from 'react-router-dom'


import logo from './media/resources/logo-1-2.png'
import logoFoo from './media/resources/footer-logo-1-1.png'
import imgFooter from './media/resources/footer-map-1-1.png'

import '../css/stylesPublic.css'
import '../css/responsivePublic.css'
import '../css/stylesCover.css'
import '../css/responsiveCover.css'

import Home from './home'
import About from './about'
import Services from './services'
import Service from './service'
import Blog from './blog'
import Articulo from './articulo'
import Contact from './contact'
import Error404 from './error404'

class App extends Component{
   constructor(props){
      super(props)

      this.state = {
         services:[]
      }
      this.handleOnClickToggle = this.handleOnClickToggle.bind(this)
      this.handleOnScroll = this.handleOnScroll.bind(this)
   }
   handleOnScroll(){
      window.scrollTo(0,0)
   }
   handleOnClickToggle(){
       document.getElementById('tuckedMenu').classList.toggle('custom-menu-tucked');
       document.getElementById('toggle').classList.toggle('x');
   }

   render(){
      return (
         <div>
            <Router>
               <header className="header">
                  <div className="custom-menu-wrapper">
                     <div className="pure-menu custom-menu custom-menu-top">
                        <Link to="/"><img src={logo} alt="logo" className="pure-menu-heading custom-menu-brand logo" /></Link>
                        <a href="#" onClick={this.handleOnClickToggle} className="custom-menu-toggle" id="toggle"><s className="bar"></s><s className="bar"></s></a>
                     </div>
                     <div className="pure-menu pure-menu-horizontal pure-menu-scrollable custom-menu custom-menu-bottom custom-menu-tucked" id="tuckedMenu">
                        {/* <div className="custom-menu-screen" style={{zIndex: -10000}}></div> */}
                        <ul className="pure-menu-list">
                              <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Inicio</Link></li>
                              <li className="pure-menu-item"><Link to="/acerca" className="pure-menu-link">Acerca de</Link></li>
                              <li className="pure-menu-item"><Link to="/servicios" className="pure-menu-link">Servicios</Link></li>
                              <li className="pure-menu-item"><a href="http://online.fliphtml5.com/pncrj/tcmc" target="_blank" className="pure-menu-link">Catálogo</a></li>
                              <li className="pure-menu-item"><Link to="/blog" className="pure-menu-link">Blog</Link></li>
                              <li className="pure-menu-item"><Link to="/contacto" className="pure-menu-link">Contacto</Link></li>
                        </ul>
                     </div>
                  </div>
               </header>
               <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/acerca" component={About}/>
                  <Route path="/servicios" component={Services}/>
                  <Route path="/servicio" component={Service} />
                  <Route path="/blog" component={Blog} />
                  <Route path="/articulo" component={Articulo} />
                  <Route path="/contacto" component={Contact} />
                  <Route component={Error404} />
               </Switch>
               <a href="#" onClick={this.handleOnScroll} className="scroll-to-top"><i className="fas fa-angle-up"></i></a>
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
                              <div className="social-block">
                                 <a href="http://www.facebook.com" target="blank"><i className="fab fa-facebook-f"></i></a>
                                 <a href="http://www.twitter.com" target="blank"><i className="fab fa-twitter"></i></a>
                                 <a href="http://www.vimeo.com" target="blank"><i className="fab fa-vimeo-v"></i></a>
                                 <a href="http://www.linkedin.com" target="blank"><i className="fab fa-linkedin-in"></i></a>
                              </div>
                           </div>
                           <div className="footer-widget links-widget">
                              <div className="footer-widget-title">
                                 <h3>Información</h3>
                              </div>
                              <ul className="links-lists">
                                 <li><Link to="/acerca" ><i className="fas fa-chevron-right"></i> Acerca de nosotros</Link></li>
                                 <li><Link to="/contacto" ><i className="fas fa-chevron-right"></i> Contáctanos</Link></li>
                                 <li><Link to="/servicios" ><i className="fas fa-chevron-right"></i> Servicios</Link></li>
                                 <li><Link to="/privacidad" ><i className="fas fa-chevron-right"></i> Política de privacidad</Link></li>
                                 
                              </ul>
                           </div>
                           <div className="footer-widget newsletter-widget">
                              <div className="footer-widget-title">
                                 <h3>Contáctanos</h3>
                              </div>
                              <form action="#" className="newsletter-form">
                                 <p>Deja tu email y nosotros nos comunicamos contigo</p>
                                 <input type="text" placeholder="Ingresa tu email" />
                                 <button type="submit">Subscríbete</button>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="bottom-footer text-center">
                     <p><Link to="/">Pro System</Link> &copy; 2019 Todos los derechos reservados</p>
                  </div>
               </footer>
            </Router>
         </div>
      )
   }
}

export default App
