import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet'

import Brand from './sliderMarcas'

class Product extends Component{
   constructor(props){
      super(props)
      this._isMounted = false;
      this.state={
         slug: this.props.location.pathname.substring(10),
         producto: []
      }
   }
   getProd(){
      axios.get('/api/productos/'+this.state.slug).then(res=>{
         if(this._isMounted){
            console.log(res.data)
            this.setState({
               producto: res.data[0]
            })
         }
      }).catch(err=>{
         console.log(err)
      })
   }
   componentDidMount(){
      this._isMounted = true;
      this.getProd()
      window.scrollTo(0,0)
   }
   componentWillUnmount(){
      this._isMounted = false;
   }
   render(){
      const {producto} = this.state
      return(
         <div>
            <Helmet>
               <meta name="description" content={producto.titulo} />
            </Helmet>
            <section className="page-title-block text-center" style={{ backgroundImage: `url(../images/productos/${producto.imagen})` }}>
               <div className="container">
                  <h2>{producto.titulo}</h2>
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
                        <h3>{producto.nombre}</h3>
                        <br />
                        <div dangerouslySetInnerHTML={{ __html: producto.descripcion }}></div>
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
