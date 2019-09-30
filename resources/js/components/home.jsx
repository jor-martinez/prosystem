import React, {Component} from 'react'
import AliceCarousel from 'react-alice-carousel'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Helmet from 'react-helmet'
import ContentLoader from 'react-content-loader'

import story from './media/resources/story-1-1.png'
import cta from './media/resources/building.jpg'
import featured from './media/resources/featured-1-1.jpg'
import funFact from './media/resources/fun-fact-bg-1-1.jpg'

import Brand from './sliderMarcas'
import {
   PreSlider,
   PreProduct,
   PreMision
} from './allPreloaders'

import '../css/stylesPublic.css'
import '../css/responsivePublic.css'
import "react-alice-carousel/lib/alice-carousel.css"


class Home extends Component{
   constructor(...props){
      super(...props)

      this.state = {
         slider:[],
         services:[],
         marcas: [],
         procesos: [],
         ventajas: [],
         productos: [],
         nosotros: [],
         historia: [],
         preContSlider: false,
         preContProduct: false,
         preContMision: false
      }
      this.getServices = this.getServices.bind(this)
      this.getSliders = this.getSliders.bind(this)
      this.getProcesos = this.getProcesos.bind(this)
      this.getVentajas = this.getVentajas.bind(this)
      this.getProductos = this.getProductos.bind(this)
      this.getMisionVision = this.getMisionVision.bind(this)
      this.getHistory = this.getHistory.bind(this)
   }
   getHistory(){
      axios.get('/api/historia').then(result=>{
         // console.log(result)
         this.setState({historia: result.data, preContSlider: true})
      }).catch(err=>{
         console.log(err)
      })
   }
   getServices(){
      axios.get('/api/servicios').then(result=>{
         // console.log(result)
         this.setState({services: result.data})
      }).catch(err=>{
         console.log(err)
      })
   }
   getMisionVision(){
      axios.get('/api/nosotros').then(res=>{
         // console.log(res.data)
         this.setState({
            nosotros: res.data,
            preContMision: true
         })
      }).catch(err=>{
         console.log(err)
      })
   }
   getSliders(){
      axios.get('/api/slyder').then(result=>{
         // console.log(result)
         this.setState({slider: result.data})
      }).catch(err=>{
         console.log(err)
      })
   }

   getProcesos(){
      axios.get('/api/proceso').then(res=>{
         // console.log(res.data)
         this.setState({
            procesos: res.data
         })
      }).catch(err=>{
         console.log(err)
      })
   }
   getVentajas() {
      axios.get('/api/caracteristicas').then(res => {
         // console.log(res.data)
         this.setState({
            ventajas: res.data
         })
      }).catch(err => {
         console.log(err)
      })
   }
   getProductos() {
      axios.get('/api/productos').then(res => {
         // console.log(res.data)
         this.setState({
            productos: res.data,
            preContProduct: true
         })
      }).catch(err => {
         console.log(err)
      })
   }
   componentDidMount(){
      Promise.all([
         this.getServices(),
         this.getSliders(),
         this.getProcesos(),
         this.getVentajas(),
         this.getProductos(),
         this.getMisionVision(),
         this.getHistory(),
      ]).then(res=>{
         // console.log(res)
      }).catch(err=>{
         console.log(err)
      })
      
      window.scrollTo(0,0)
      // document.getElementById('spinner').style.display = 'none';
   }

   render(){
      const responsive = {
         0: { items: 1 },
         600: { items: 1},
         900: { items: 2},
         1024: { items: 3 },
      }
      const responsive1 = {
         1024: { items: 1 },
      }


      const {
         services,
         slider,
         nosotros,
         historia,
         procesos,
         ventajas,
         productos,
         preContSlider,
         preContProduct,
         preContMision
      } = this.state

      return(
         <div>
            <Helmet>
               <title>Pro System</title>
            </Helmet>
            {
               (preContSlider)
               ?
               <section className="slider">
                  <AliceCarousel
                     mouseDragEnabled
                     responsive={responsive1}
                     infinite
                     duration={2000}
                     autoPlay
                     duration={2000}
                     autoPlayInterval={1000}
                     buttonsDisabled
                     fadeOutAnimation
                     ref={(el) => (this.Carousel = el)}
                  >
                     {slider.map((item) => (
                        (item.link)
                        ?
                           <div
                              className="slider-img"
                              key={item.id}
                              style={{ background: `url(../images/slyder/${item.imagen}) no-repeat center center` }}>
                              <div className="center info-slider-container">
                                 <h1>{item.titulo}</h1>
                                 <p>{item.descripcion}</p>
                                 <a target="blank" href={`${item.link}`}>Ver publicación</a>
                              </div>
                           </div>
                        :
                           <div
                              className="slider-img"
                              key={item.id}
                              style={{ background: `url(../images/slyder/${item.imagen}) no-repeat center center` }}>
                              <div className="center info-slider-container">
                                 <h1>{item.titulo}</h1>
                                 <p>{item.descripcion}</p>
                              </div>
                           </div>
                     ))}
                  </AliceCarousel>
                  <button className="button-slider button-prev" onClick={() => this.Carousel.slidePrev()}><i className="fas fa-chevron-left"></i></button>
                  <button className="button-slider button-next" onClick={() => this.Carousel.slideNext()}><i className="fas fa-chevron-right"></i></button>
               </section>
               :
               <PreSlider/>
            }
            {
               (preContProduct)
               ?
               <section className="offer-style-one">
                  <div className="container">
                     <div className="title-block">
                        <span className="tag-line">Algunos productos</span>{/* /.tag-line */}
                        <h2>Lo que ofrecemos</h2>
                     </div>
                     <div className="row">
                        {
                           (productos.map(producto=>(
                              <div key={producto.id} className="single-offer-style-one wow fadeInUp" data-wow-duration="1300ms" data-wow-delay="0ms">
                                 <div className="icon-block">
                                    <img src={`../images/productos/${producto.imagen}`} alt="imagen del producto"/>
                                 </div>
                                 <h3>{producto.titulo}</h3>
                                 <div>
                                    <Link to={{ pathname: '/producto/'+producto.slug, state : { producto } }}
                                    className="more-link">Leer más</Link>
                                 </div>
                              </div>
                           )))
                        }
                     </div>
                  </div>
               </section>
               :
               <PreProduct/>
            }
            {
               (preContHistory)
            }
            <section className="about-style-one">
               <div className="container">
                  {
                     (historia.map(item=>(
                        <div className="row" key={item.id}>
                              <div className="content-block my-auto">
                                 <div className="title-block">
                                    <span className="tag-line">Nuestra historia</span>{/* /.tag-line */}
                                    <h2>Pro System</h2>
                                 </div>
                                 <div className="about-description" dangerouslySetInnerHTML={{ __html: item.historia }} ></div>
                                 <Link to="/acerca" className="more-btn">Leer más</Link>
                              </div>
                              <div className="image-block">
                                 <img src={story} alt="Awesome Image" />
                              </div>
                        </div>
                     )))
                  }
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
                        {
                           (preContMision)
                           ?
                           nosotros.map(item=>(<p key={item.id}>{item.mision}</p>))
                           :
                           <PreMision/>
                        }
                     </div>
                     <div className="single-mission-one">
                        <div className="count-block">
                           02
                        </div>
                        <h3>Nuestra Visión</h3>
                        {
                           (preContMision)
                           ?
                           nosotros.map(item=>(<p key={item.id}>{item.vision}</p>))
                           :
                           <PreMision/>
                        }
                     </div>
                     <div className="single-mission-one">
                        <div className="count-block">
                           03
                        </div>
                        <h3>Nuestro Objetivo</h3>
                        {
                           (preContMision)
                           ?
                           nosotros.map(item=>(<p key={item.id} >{item.objetivo}</p>))
                           :
                           <PreMision/>
                        }
                     </div>
                  </div>
               </div>
            </section>
            <section id="cta-style-one" className="cta-style-one text-center" style={{backgroundImage: `url(${cta})`}}>
               <div className="container">
                  <div className="title-block">
                     <span className="tag-line">¡Servicio destacado!</span>{/* /.tag-line */}
                     <h2>Servicio de ingeniería</h2>
                  </div>
                  <p>Ingeniería especializada para la ejecución completa de grandes o pequeños proyectos, asumiendo la responsabilidad total del mismo.</p>
                  {/* <a href="index.html" className="cta-btn">Otra acción</a> */}
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
                  <AliceCarousel
                     mouseDragEnabled
                     responsive={responsive}
                     autoPlay
                     infinite
                     duration={2000}
                     buttonsDisabled
                     autoPlayInterval={1000}
                  >
                     {services.map(service=>
                        <div className="single-service-one" key={service.id}>
                           <div className="image-block">
                              <img src={`../images/servicios/${service.Imagen}`} alt="Servicio" />
                           </div>
                           <div className="text-block">
                              <h3><Link to="/servicio">{service.nombre}</Link></h3>
                              <div dangerouslySetInnerHTML={{ __html: service.descripcion }}></div>
                              <Link to={{ pathname: '/servicio/'+service.slug, state : { service: service } }}
                              className="more-btn">Leer más</Link>
                           </div>
                        </div>
                     )}
                  </AliceCarousel>
               }

            </section>
            <section className="fun-fact-style-one" style={{backgroundImage: `url(${funFact})`}}>
            </section>
            <section className="featured-style-one"> 
               <div className="container">
                  <div className="content-block my-auto">
                     <div className="title-block">
                        <span className="tag-line">Pro System</span>
                        <h2>¿Por qué elegirnos?</h2>
                     </div>
                     {
                        (ventajas.map(ventaja=>(
                           <div className="signle-featured-one" key={ventaja.id}>
                              <div className="icon-block">
                                 <div className="inner-block">
                                    <i className="far fa-hand-point-right"></i>
                                 </div>
                              </div>
                              <div className="text-block">
                                 <h3>{ventaja.titulo}</h3>
                                 <p>{ventaja.descripcion}</p>
                              </div>
                           </div>
                        )))
                     }
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
                     {
                        (procesos.map(proceso=>(
                           <div className="single-working-process-one wow fadeInUp" key={proceso.id}>
                              <div className="count-block">
                                 {'0'+proceso.id}
                              </div>
                              <h3>{proceso.proceso}</h3>
                              <p>{proceso.descripcion}</p>
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

export default Home
