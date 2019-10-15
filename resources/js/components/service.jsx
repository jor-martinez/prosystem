import React, {Component} from 'react'
import axios from 'axios'
import {
   Link,
   Switch,
   BrowserRouter as Router,
   Route
} from 'react-router-dom'
import Helmet from 'react-helmet'

import Brand from './sliderMarcas'
import Categoria from './categoria'


class Service extends Component{
   constructor(props){
      super(props)
      this._isMounted = false;
      this.state={
         slug: this.props.location.pathname.substring(10),
         service: [],
         categorias: []
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
         axios({
            method: 'get',
            url: '/api/categorias/'+this.state.service.id
         }).then(res=>{
            if(this._isMounted)
            {
               // console.log(res.data)
               this.setState({
                  categorias: res.data
               })
            }
         }).catch(err=>{
            console.log(err)
         })
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
      // console.log(this.state.categorias)
      const {service, categorias} = this.state
      // console.log(desc)
      return(
         <div>
            <Helmet>
               <title>{service.nombre}</title>
               <meta name="description" content={service.nombre} />
            </Helmet>
               <section className="page-title-block text-center" style={{ backgroundImage: `url(../images/servicios/${service.Imagen})` }}>
                  <div className="container">
                     <h2>{service.nombre}</h2>
                     <div className="thm-breadcrumb-two">
                        <ul className="list-categories">
                           {
                              (categorias.map(cat=>(
                                 <li key={cat.id}><Link replace to={{pathname: '/servicio/'+this.state.slug+'/'+cat.slug, state: { categoria: cat, service }}}>{cat.titulo}</Link></li>
                              )))
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
                           <h3>{service.nombre}</h3>
                           <br />
                           <div dangerouslySetInnerHTML={{ __html: service.descripcion }}></div>
                           <br />
                           {/* <Switch>
                              <Route path="/servicio/:slug/:categoria" component={Categoria}/>
                           </Switch> */}
                           {/* <Route exact path="/servicio/:slug/:categoria" component={Categoria}/> */}
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

// function Categoria ({match}){
//    return(
//       <div></div>
//    )
// }

export default Service
