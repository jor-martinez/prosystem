import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet'
import axios from 'axios'

import pageTitle from './media/resources/page-title-bg.jpg'
import cta from './media/resources/building.jpg'

import Brand from './sliderMarcas'

class About extends Component{
   constructor(props){
      super(props)
      this.state={
         nosotros: [],
         historia: []
      }
      this.getMisionVision = this.getMisionVision.bind(this)
      this.getHistory = this.getHistory.bind(this)
   }
   componentDidMount(){
      this.getMisionVision()
      this.getHistory()
      window.scrollTo(0,0)
   }
   getMisionVision(){
      axios.get('/api/nosotros').then(res=>{
         console.log(res.data)
         this.setState({
            nosotros: res.data
         })
      }).catch(err=>{
         console.log(err)
      })
   }
   getHistory(){
      axios.get('/api/historia').then(result=>{
         console.log(result)
         this.setState({historia: result.data})
      }).catch(err=>{
         console.log(err)
      })
   }
   render(){
      const {nosotros,historia} = this.state
      return(
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
                  {
                     (historia.map(item=>(
                        <div className="row">
                              <div className="content-block my-auto">
                                 <div className="title-block">
                                    <span className="tag-line">Nuestra historia</span>
                                    <h2>10 años de experiencia</h2>
                                 </div>
                                 <div className="acercade" dangerouslySetInnerHTML={{ __html: item.historia }}></div>
                                 {/* <a href="#" className="more-btn">Otra acción</a> */}
                              </div>
                        </div>
                     )))
                  }
               </div>
            </section>
            <section className="mission-style-one wow fadeInUp home-page-two" data-wow-duration="1300ms">
               <div className="container">
                  {
                     (nosotros.map(item=>(
                        <div className="inner-container" key={item.id}>
                           <div className="single-mission-one">
                              <div className="count-block">
                                 01
                              </div>
                              <h3>Nuestra misión</h3>
                              <p>{item.mision}</p>
                           </div>
                           <div className="single-mission-one">
                              <div className="count-block">
                                 02
                              </div>
                              <h3>Nuestra Visión</h3>
                              <p>{item.vision}</p>
                           </div>
                           <div className="single-mission-one">
                              <div className="count-block">
                                 03
                              </div>
                              <h3>Nuestro Objetivo</h3>
                              <p>{item.objetivo}</p>
                           </div>
                        </div>
                     )))
                  }
               </div>
            </section>
            <section className="cta-style-one text-center home-page-two" style={{backgroundImage: `url(${cta})`}} >
               <div className="container">
                  <div className="title-block">
                     <span className="tag-line">¡Mantente seguro!</span>
                     <h2>Llamado de acción</h2>
                  </div>
                  <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt <br /> mollit anim id est laborum.</p>
                  <a href="index.html" className="cta-btn">Otra acción</a>
               </div>
            </section>
            <section className="brands-area-one">
               <Brand/>
            </section>
         </div>
      )
   }
}


export default About
