import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
   Route,
	BrowserRouter as Router,
	Switch
} from 'react-router-dom'

import Residencial from './residencial'
import Comercial from './comercial'
import Brand from './sliderMarcas'

class Service extends Component{
   constructor(props){
      super(props)
      this.state={
         nombre: this.props.location.state.service.nombre,
         descripcion: this.props.location.state.service.descripcion,
         slug: this.props.location.state.service.slug,
         Imagen: this.props.location.state.service.Imagen,
         categorias: ['residencial', 'comercial', 'industrial', 'urbana', 'transporte']
      }
   }
   componentDidMount(){
      window.scrollTo(0,0)
   }
   render(){
      const {categorias} = this.state
      return(
         <div>
            <section className="page-title-block text-center" style={{ backgroundImage: `url(../images/servicios/${this.state.Imagen})` }}>
               <div className="container">
                  <h2>{this.state.nombre}</h2>
                  <div className="thm-breadcrumb">
                     <ul style={{ display: 'flex', justifyContent: 'space-between', width: '40%', margin: 'auto'}}>
                     {
                        categorias.map((cat)=>
                           <li style={{listStyle: 'none', margin: '0 10px'}}><Link to={{pathname:'/servicio/'+this.state.slug+'/'+cat}} >{cat}</Link></li>
                        )
                     }
                     </ul>
                     {/* <Link to="/">Inicio</Link>
                     <span className="sep">/</span>
                     <span className="page-title">Detalles del servicio</span> */}
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
            <Switch>
                  <Route path="/servicio/:slug/residencial" component={Residencial} />
                  <Route path="/servicio/:slug/comercial" component={Comercial} />
            </Switch>
            <section className="brands-area-one">
               <Brand/>
            </section>
         </div>
      )
   }
}
export default Service
