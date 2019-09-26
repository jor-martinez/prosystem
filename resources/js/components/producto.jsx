import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import Brand from './sliderMarcas'

class Product extends Component{
   constructor(props){
      super(props)
      this.state={
         nombre: this.props.location.state.producto.titulo,
         descripcion: this.props.location.state.producto.descripcion,
         imagen: this.props.location.state.producto.imagen
      }
   }
   componentDidMount(){
      window.scrollTo(0,0)
   }
   render(){
      return(
         <div>
            <section className="page-title-block text-center" style={{ backgroundImage: `url(../images/productos/${this.state.imagen})` }}>
               <div className="container">
                  <h2>{this.state.nombre}</h2>
                  <div className="thm-breadcrumb">
                     <Link to="/">Inicio</Link>
                     <span className="sep">/</span>
                     <span className="page-title">Detalles del producto</span>
                  </div>
               </div>
            </section>
            <section className="blog-style-three">
               <div className="container">
                  <div className="row">
                     <div className="service-details-content">
                        <br />
                        <h3>{this.state.nombre}</h3>
                        <br />
                        <div dangerouslySetInnerHTML={{ __html: this.state.descripcion }}></div>
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
export default Product