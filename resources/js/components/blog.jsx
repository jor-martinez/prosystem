import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet'
import axios from 'axios'
import dateFormat from 'dateformat'

import pageTitle from './media/resources/blog.jpg'

import Brand from './sliderMarcas'
import ListPagination from './listaPags'

dateFormat.i18n = {
   dayNames: [
       'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab',
       'Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'
   ],
   monthNames: [
       'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
       'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
   ],
   timeNames: [
       'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
   ]
}

class Blog extends Component {
   constructor(props){
      super(props)
      this._isMounted = false;
      this.state = {
         articulos: [],
         currentPage: 1,
         postsPerPage: 3
      }
      this.getArticles = this.getArticles.bind(this)
   }
   getArticles(){
      axios.get('/api/blog').then(res=>{
         if(this._isMounted){
            this.setState({articulos: res.data})
         }
         // console.log(res.data)
      }).catch(err=>{
         console.log(err)
      })
   }
   componentDidMount(){
      this._isMounted = true;
      this.getArticles()
      window.scrollTo(0,0)
      // document.getElementById('spinner').style.display = 'none';
   }
   componentWillUnmount(){
      this._isMounted = false;
   }
   render(){
      const {articulos,currentPage,postsPerPage} = this.state

      // obtener los post
      const indexOfLastPost = currentPage * postsPerPage,
      indexOfFirstPost = indexOfLastPost - postsPerPage,
      currentPost = articulos.slice(indexOfFirstPost, indexOfLastPost)

      // Cambiar pagina
      const paginate = pageNumber => this.setState({currentPage: pageNumber})

      return (
         <div>
            <Helmet>
               <title>Blog</title>
            </Helmet>
            <section className="page-title-block text-center" style={{backgroundImage: `url(${pageTitle})`}}>
               <div className="container">
                  <h2>Blog</h2>
                  <div className="thm-breadcrumb">
                     <Link to="/">Inicio</Link>
                     <span className="sep">/</span>
                     <span className="page-title">Blog</span>
                  </div>
               </div>
            </section>
            <section className="blog-style-three">
               <div className="container">
                  <div className="row">
                     {
                        (currentPost.map((articulo)=>(
                           <div key={articulo.id} className="single-blog-style-three">
                              <div className="image-block">
                                 <img src={`../images/blog/${articulo.encabezado}`} alt="Post Blog" />
                                 <div className="overlay-block">
                                    <a className="more-link" href="#"><i className="fa fa-arrows-alt" /></a>
                                 </div>
                              </div>
                              <div className="text-block">
                                 <h3><Link to={{ pathname: '/articulo/' + articulo.slug, state: { articulo } }}>{articulo.titulo}</Link></h3>
                                 <div className="meta-info">
                                    <a href="#">Por {articulo.autor}</a>
                                    <span className="sep">/</span>
                                    <a href="#">{ dateFormat(articulo.created_at, 'dddd, d "de" mmmm "de" yyyy, h:MM:ss TT') }</a>
                                 </div>
                                 <Link to={{ pathname: '/articulo/' + articulo.slug, state: { articulo } }}
                                    className="more-btn">Leer más</Link>
                              </div>
                           </div>
                        )))
                     }                     
                  </div>
                  <ListPagination postPerPage={postsPerPage} totalPost={articulos.length} paginate={paginate} />
               </div>
            </section>
            <section className="brands-area-one">
               <Brand/>
            </section>
         </div>
      )
   }
}

export default Blog
