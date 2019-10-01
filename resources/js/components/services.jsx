import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet'

import Brand from './sliderMarcas'

import pageTitle from './media/resources/page-title-bg.jpg'


class Services extends Component{
   constructor(props){
      super(props)
      this._isMounted = false;
      this.state = {
         services:[],
         data:[]
      }
      this.getServices = this.getServices.bind(this)
   }
   getServices(){
      axios.get('/api/servicios').then(result=>{
         // console.log(result)
         if(this._isMounted){
            this.setState({services: result.data})
         }
      }).catch(err=>{
         console.log(err)
      })
   }
   componentDidMount(){
      this._isMounted = true;
      this.getServices()
      window.scrollTo(0,0)
      // document.getElementById('spinner').style.display = 'none';
   }
   componentWillUnmount(){
      this._isMounted = false;
   }
   render(){
      const {services} = this.state
      return(
         <div>
            <Helmet>
               <title>Servicios</title>
            </Helmet>
            <section className="page-title-block text-center" style={{backgroundImage: `url(${pageTitle})`}} >
             <div className="container">
                <h2>Nuestros Servicios</h2>
                <div className="thm-breadcrumb">
                   <Link to="/">Inicio</Link>
                   <span className="sep">/</span>
                   <span className="page-title">Servicios</span>
                </div>
             </div>
          </section>
          <section className="service-style-two">
            <div className="container">
               <div className="title-block-style-two text-center ">
                  <span className="tag-line">Servicios</span>
                  <h2>Servicios que ofrecemos</h2>
                  <p>En Prosystem le ofrecemos un robusto portafolio de soluciones tecnológicas de seguridad y servicios personalizados.</p>
               </div>
               <div className="row">
                  {
                     (services.map((servicio)=>(
                        <div className="single-service-one" key={servicio.id}>
                           <div className="image-block">
                              <img src={`../images/servicios/${servicio.Imagen}`} alt="Servicio 1" />
                              <div className="overlay-block">
                              <a className="more-link" href="#"><i className="fa fa-arrows-alt" /></a>
                              </div>
                           </div>
                           <div className="text-block">
                              <h3><a href="service-single.html">{servicio.nombre}</a></h3>
                              <div className="descripcion" dangerouslySetInnerHTML={{ __html: servicio.descripcion }} ></div>
                              <Link to={{ pathname: '/servicio/'+servicio.slug, state : { service: servicio } }} 
                                    className="more-btn">Leer más</Link>
                           </div>
                        </div>
                     )))
                  }
               </div>
            </div>
         </section>
         <section className="brands-area-one">
            <Brand/>
         </section>
         </div>
      )
   }
}


export default Services
