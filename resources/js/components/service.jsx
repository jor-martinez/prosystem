import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import Brand from './sliderMarcas'

class Service extends Component{
   constructor(props){
      super(props)
      this._isMounted = false;
      this.state={
         slug: this.props.location.pathname.substring(10),
         service: []
      }
      this.getService = this.getService.bind(this)
   }
   getService(){
      axios.get('/api/servicios/'+this.state.slug).then(res=>{
         if(this._isMounted){
            // console.log(res.data[0])
            this.setState({
               service: res.data[0]
            })
         }
      }).catch(err=>{
         console.log(err)
      })
   }
   componentDidMount(){
      this._isMounted = true;
      this.getService()
      window.scrollTo(0,0)
   }
   componentWillUnmount(){
      this._isMounted = false;
   }
   render(){
      // console.log(this.state.slug)
      const {service} = this.state
      return(
         <div>
            <section className="page-title-block text-center" style={{ backgroundImage: `url(../images/servicios/${service.Imagen})` }}>
               <div className="container">
                  <h2>{service.nombre}</h2>
                  <div className="thm-breadcrumb">
                     <Link to="/">Inicio</Link>
                     <span className="sep">/</span>
                     <span className="page-title">Detalles del servicio</span>
                  </div>
               </div>
            </section>
            <section className="blog-style-three">
               <div className="container">
                  <div className="row">
                     <div className="service-details-content">
                        <br />
                        <h3>{service.nombre}</h3>
                        <br />
                        <div dangerouslySetInnerHTML={{ __html: service.descripcion }}></div>
                        <br />
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
export default Service
