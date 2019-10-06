import React, {Component} from 'react'
import {
   Route,
	BrowserRouter as Router,
	Switch
} from 'react-router-dom'

import '../css/stylesPublic.css'
import '../css/responsivePublic.css'
import '../css/stylesCover.css'
import '../css/responsiveCover.css'

import Nav from './Nav'
import Footer from './Footer'
import Home from './home'
import About from './about'
import Services from './services'
import Service from './service'
import Blog from './blog'
import Articulo from './articulo'
import Contact from './contact'
import Product from './producto'
import Error404 from './error404'
import Paginacion from './paginacion'
import Categoria from './categoria'

class App extends Component{
   constructor(props){
      super(props)

      this.state = {
      }
      this.handleOnScroll = this.handleOnScroll.bind(this)
   }
   handleOnScroll(){
      window.scrollTo(0,0)
   }

   render(){
      return (
         <div>
            <Router>
               <Nav/>
               <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/acerca" component={About}/>
                  <Route path="/servicios" component={Services}/>
                  <Route path="/servicio" component={Service} />
                  <Route path="/blog" component={Blog} />
                  <Route path="/articulo" component={Articulo} />
                  <Route path="/contacto" component={Contact} />
                  <Route path="/paginacion" component={Paginacion} />
                  <Route path="/producto" component={Product} />
                  {/* <Route path="/area" component={Categoria}/> */}
                  <Route component={Error404} />
               </Switch>
               <a href="#" onClick={this.handleOnScroll} className="scroll-to-top"><i className="fas fa-angle-up"></i></a>
               <Footer/>
            </Router>
         </div>
      )
   }
}

export default App
