import React, {Component} from 'react'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Carrusel from 'react-slick'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Helmet from 'react-helmet'

import story from './media/resources/story-1-1.png'
import cta from './media/resources/building.jpg'
import featured from './media/resources/featured-1-1.jpg'
import funFact from './media/resources/fun-fact-bg-1-1.jpg'

import Brand from './sliderMarcas'

import '../css/stylesPublic.css'
import '../css/responsivePublic.css'

class Home extends Component{
   constructor(...props){
      super(...props)

      this.state = {
         slider:[],
         services:[],
         marcas: [],
         proceso1: [],
         proceso2: [],
         proceso3: [],
         ventaja1: [],
         ventaja2: [],
         ventaja3: [],
         prod1: [],
         prod2: [],
         prod3: [],
         prod4: []
      }
      
      this.getServices = this.getServices.bind(this)
      this.getSliders = this.getSliders.bind(this)
      this.getProcesos = this.getProcesos.bind(this)
      this.getVentajas = this.getVentajas.bind(this)
      this.getProductos = this.getProductos.bind(this)
   }
   getServices(){
      axios.get('/api/servicios').then(result=>{
         console.log(result)
         this.setState({services: result.data})
      }).catch(err=>{
         console.log(err)
      })
   }

   getSliders(){
      axios.get('/api/slyder').then(result=>{
         console.log(result)
         this.setState({slider: result.data})
      }).catch(err=>{
         console.log(err)
      })
   }

   getProcesos(){
      axios.get('/api/proceso').then(res=>{
         console.log(res.data)
         this.setState({
            proceso1: res.data[0],
            proceso2: res.data[1],
            proceso3: res.data[2]
         })
      }).catch(err=>{
         console.log(err)
      })
   }
   getVentajas() {
      axios.get('/api/caracteristicas').then(res => {
         console.log(res.data)
         this.setState({
            ventaja1: res.data[0],
            ventaja2: res.data[1],
            ventaja3: res.data[2]
         })
      }).catch(err => {
         console.log(err)
      })
   }
   getProductos() {
      axios.get('/api/productos').then(res => {
         console.log(res.data)
         this.setState({
            prod1: res.data[0],
            prod2: res.data[1],
            prod3: res.data[2],
            prod4: res.data[3]
         })
      }).catch(err => {
         console.log(err)
      })
   }
   componentDidMount(){
      this.getServices()
      this.getSliders()
      this.getProcesos()
      this.getVentajas()
      this.getProductos()
   }

   render(){
      // window.title = "Inicio"
      const settings = {
         autoplay: true,
         dots: true,
         infinite: true,
         speed: 1500,
         slidesToShow: 3,
         slidesToScroll: 1,
      }

      const settings575 = {
         autoplay: true,
         dots: true,
         infinite: true,
         speed: 1500,
         slidesToShow: 1,
         slidesToScroll: 1,
      }

      const {services,slider} = this.state
      return(
         <div>
            <Helmet>
               <title>Pro System</title>
            </Helmet>
            <Slider className="slider" autoplay={2500}>
               {slider.map((item) => (
                  (item.link)
                  ?
                     <div
                        key={item.id}
                        style={{ background: `url(../images/slyder/${item.imagen}) no-repeat center center` }}>
                        <div className="center info-slider-container">
                           <h1>{item.titulo}</h1>
                           <p>{item.descripcion}</p>
                           <a target="blank" href={`${item.link}`}>Ver publicacion</a>
                        </div>
                     </div>
                  :
                     <div
                        key={item.id}
                        style={{ background: `url(../images/slyder/${item.imagen}) no-repeat center center` }}>
                        <div className="center info-slider-container">
                           <h1>{item.titulo}</h1>
                           <p>{item.descripcion}</p>
                        </div>
                     </div>
               ))}
            </Slider>
            <section className="offer-style-one">
               <div className="container">
                  <div className="title-block">
                     <span className="tag-line">Algunos productos</span>{/* /.tag-line */}
                     <h2>Lo que ofrecemos</h2>
                  </div>
                  <div className="row">
                        <div className="single-offer-style-one wow fadeInUp" data-wow-duration="1300ms" data-wow-delay="0ms">
                           <div className="icon-block">
                              <i className="fas fa-calendar"></i>
                           </div>
                           <h3><a href={this.state.prod1.link || "#"}>{this.state.prod1.titulo || 'titulo'}</a></h3>
                           <p>{this.state.prod1.descripcion}</p>
                           <a href={this.state.prod1.link} className="more-link">Leer más</a>
                        </div>
                        <div className="single-offer-style-one wow fadeInUp" data-wow-duration="1300ms" data-wow-delay="500ms">
                           <div className="icon-block">
                              <i className="fas fa-calendar"></i>
                           </div>
                           <h3><a href={this.state.prod2.link}>{this.state.prod2.titulo}</a></h3>
                           <p>{this.state.prod2.descripcion}</p>
                           <a href={this.state.prod2.link} className="more-link">Leer más</a>
                        </div>
                        <div className="single-offer-style-one wow fadeInUp" data-wow-duration="1300ms" data-wow-delay="1000ms">
                           <div className="icon-block">
                              <i className="fas fa-calendar"></i>
                           </div>
                           <h3><a href={this.state.prod3.link}>{this.state.prod3.titulo}</a></h3>
                           <p>{this.state.prod3.descripcion}</p>
                           <a href={this.state.prod3.link} className="more-link">Leer más</a>
                        </div>
                        <div className="single-offer-style-one wow fadeInUp" data-wow-duration="1300ms" data-wow-delay="1500ms">
                           <div className="icon-block">
                              <i className="fas fa-calendar"></i>
                           </div>
                           <h3><a href={this.state.prod4.link}>{this.state.prod4.titulo}</a></h3>
                           <p>{this.state.prod4.descripcion}</p>
                           <a href={this.state.prod4.link} className="more-link">Leer más</a>
                        </div>
                  </div>
               </div>
            </section>
            <section className="about-style-one">
               <div className="container">
                  <div className="row">
                        <div className="content-block my-auto">
                           <div className="title-block">
                              <span className="tag-line">Nuestra historia</span>{/* /.tag-line */}
                              <h2>10 años de experiencia</h2>
                           </div>
                           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiu smod tempor incidunt enim ad minim veniam quis nostrud exerc tation ullamco laboris nisi ut aliquip ex ea commodo con sequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
                           <ul className="list-item">
                              <li><i className="far fa-circle"></i> Convallis ligula ligula gravida tristique.</li>
                              <li><i className="far fa-circle"></i> Convallis ligula ligula gravida tristique.</li>
                           </ul>
                           <a href="#" className="more-btn">Otra acción</a>
                        </div>
                        <div className="image-block">
                           <img src={story} alt="Awesome Image" />
                        </div>
                  </div>
               </div>
            </section>
            <section className="mission-style-one wow fadeInUp" data-wow-duration="1300ms">
               <div className="container">
                  <div className="inner-container">
                     <div className="single-mission-one">
                        <div className="count-block">
                           01
                        </div>
                        <h3>Nuestra Misión</h3>
                        <p>Retro tattooed tousled, disrupt portland <br /> synth slow-carb brooklyn.</p>
                     </div>
                     <div className="single-mission-one">
                        <div className="count-block">
                           02
                        </div>
                        <h3>Nuestra Visión</h3>
                        <p>Retro tattooed tousled, disrupt portland <br /> synth slow-carb brooklyn.</p>
                     </div>
                     <div className="single-mission-one">
                        <div className="count-block">
                           03
                        </div>
                        <h3>Nuestros Valores</h3>
                        <p>Retro tattooed tousled, disrupt portland <br /> synth slow-carb brooklyn.</p>
                     </div>
                  </div>
               </div>
            </section>
            <section id="cta-style-one" className="cta-style-one text-center" style={{backgroundImage: `url(${cta})`}}>
               <div className="container">
                  <div className="title-block">
                     <span className="tag-line">¡Mantente seguro!</span>{/* /.tag-line */}
                     <h2>Llamado de acción</h2>
                  </div>
                  <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt <br /> mollit anim id est laborum.</p>
                  <a href="index.html" className="cta-btn">Otra acción</a>
               </div>
            </section>
            <section className="services-style-one">
               <section className="service-style-one">
                     <div className="upper-block">
                        <div className="title-block">
                        <span className="tag-line">Servicios</span>
                        <h2>Los servicios que ofrecemos</h2>
                        </div>
                     </div>
               </section>
               {
                  (window.innerWidth <= 575)
                  ?
                     <Carrusel {...settings575} className="carrusel-services">
                        {
                           services.map((service)=>(
                              <div className="single-service-one" key={service.id}>
                                 <div className="image-block">
                                    <img src={`../images/servicios/${service.Imagen}`} alt="Servicio" />
                                 </div>
                                 <div className="text-block">
                                    <h3><Link to="servicio">{service.nombre}</Link></h3>
                                    <p>{service.descripcion}</p>
                                    <Link to={{ pathname: '/servicio/'+service.slug, state : { service: service } }} 
                                    className="more-btn">Leer más</Link>
                                 </div>
                              </div>
                           ))
                        }
                     </Carrusel>
                  :
                     <Carrusel {...settings} className="carrusel-services">
                        {services.map((service)=>(
                           <div className="single-service-one" key={service.id}>
                              <div className="image-block">
                                 <img src={`../images/servicios/${service.Imagen}`} alt="Servicio" />
                              </div>
                              <div className="text-block">
                                 <h3><Link to="/servicio">{service.nombre}</Link></h3>
                                 <p>{service.descripcion}</p>
                                 <Link to={{ pathname: '/servicio/'+service.slug, state : { service: service } }}
                                 className="more-btn">Leer más</Link>
                              </div>
                           </div>
                        ))

                        }
                     </Carrusel>
               }

            </section>
            <section className="fun-fact-style-one" style={{backgroundImage: `url(${funFact})`}}>
            </section>
            <section className="featured-style-one">
               <div className="container">
                  <div className="content-block my-auto">
                     <div className="title-block">
                        <span className="tag-line">ProSystem</span>
                        <h2>¿Por qué elegirnos?</h2>
                     </div>
                     <div className="signle-featured-one">
                        <div className="icon-block">
                           <div className="inner-block">
                              <i class="far fa-user"></i>
                           </div>
                        </div>
                        <div className="text-block">
                           <h3>{this.state.ventaja1.titulo}</h3>
                           <p>{this.state.ventaja1.descripcion}</p>
                        </div>
                     </div>
                     <div className="signle-featured-one">
                        <div className="icon-block">
                           <div className="inner-block">
                              <i class="far fa-star"></i>
                           </div>
                        </div>
                        <div className="text-block">
                           <h3>{this.state.ventaja2.titulo}</h3>
                           <p>{this.state.ventaja2.descripcion}</p>
                        </div>
                     </div>
                     <div className="signle-featured-one">
                        <div className="icon-block">
                           <div className="inner-block">
                           <i class="fas fa-headset"></i>
                           </div>
                        </div>
                        <div className="text-block">
                           <h3>{this.state.ventaja3.titulo}</h3>
                           <p>{this.state.ventaja3.descripcion}</p>
                        </div>
                     </div>
                  </div>
                  <div className="image-block">
                     <img src={featured} alt="awesome image" />
                  </div>
               </div>
            </section>
            <section className="working-process-one">
               <div className="container">
                  <div className="title-block">
                     <span className="tag-line">Proceso</span>
                     <h2>Proceso de trabajo</h2>
                  </div>
                  <div className="working-process-wrap">
                     <div className="single-working-process-one wow fadeInUp">
                        <div className="count-block">
                           01
                        </div>
                        <h3>{this.state.proceso1.proceso}</h3>
                        <p>{this.state.proceso1.descripcion || 'Descripcion'}</p>
                     </div>
                     <div className="single-working-process-one wow fadeInUp">
                        <div className="count-block">
                           02
                        </div>
                        <h3>{this.state.proceso2.proceso}</h3>
                        <p>{this.state.proceso2.descripcion}</p>
                     </div>
                     <div className="single-working-process-one wow fadeInUp">
                        <div className="count-block">
                           03
                        </div>
                        <h3>{this.state.proceso3.proceso}</h3>
                        <p>{this.state.proceso3.descripcion}</p>
                     </div>
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

export default Home
