import React, {Component} from 'react'
import {
   Link,
   Switch,
   BrowserRouter as Router,
   Route
} from 'react-router-dom'

import Brand from './sliderMarcas'
import Categoria from './categoria'

class CategoriaOne extends Component{
   constructor(props){
      super(props)
      this.state={
         nombre: this.props.location.state.service.nombre,
         descripcion: this.props.location.state.service.descripcion,
         slug: this.props.location.state.service.slug,
         Imagen: this.props.location.state.service.Imagen,
         categorias: {
            'residencial':[
               {
                  'descripcion': 'Videovigilancia residencial'
               }
            ],
            'comercial': [
               {
                  'descripcion': 'Videovigilancia comercial'
               }
            ],
            'industrial':[
               {
                  'descripcion': 'Videovigilancia industrial'
               }
            ],
            'urbana':[
               {
                  'descripcion': 'Videovigilancia urbana'
               }
            ],
            'transporte':[
               {
                  'descripcion': 'Videovigilancia en transporte'
               }
            ]
      }
         
      }
   }
   componentDidMount(){
      window.scrollTo(0,0)
   }
   render(){
      console.log(this.state.categorias)
      const {categorias} = this.state
      return(
         <div>
            <section className="page-title-block text-center" style={{ backgroundImage: `url(../images/servicios/${this.state.Imagen})` }}>
               <div className="container">
                  <h2>{this.state.nombre}</h2>
                  <div className="thm-breadcrumb">
                     <ul className="list-categories">
                        {
                           Object.keys(categorias).map(cat=>
                              <li key={cat}><Link to={{pathname: '/servicio/'+this.state.slug+'/'+cat, state: { categoria: cat } }}>{cat}</Link></li>   
                           )
                        }
                     </ul>
                  </div>
               </div>
            </section>
            <section className="blog-style-three">
               <div className="container">
                  <div className="row">
                     <div className="service-details-content">
                        <div dangerouslySetInnerHTML={{ __html: this.state.descripcion }}></div>
                        <Switch>
                           <Route path="/servicio/:slug/:categoria" component={Categoria} />
                        </Switch>
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
export default CategoriaOne
