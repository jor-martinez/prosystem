import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet'
import axios from 'axios'
import Moment from 'react-moment'

import pageTitle from './media/resources/page-title-bg.jpg'

import Brand from './sliderMarcas'

class Blog extends Component {
   constructor(props){
      super(props)

      this.state = {
         articulos: []
      }
      this.getArticles = this.getArticles.bind(this)
   }
   getArticles(){
      axios.get('/api/blog').then(res=>{
         this.setState({articulos: res.data})
         console.log(res.data)
      }).catch(err=>{
         console.log(err)
      })
   }
   componentDidMount(){
      this.getArticles()
   }
   render(){
      const {articulos} = this.state
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
                        (articulos.map((articulo)=>(
                           <div className="single-blog-style-three">
                              <div className="image-block">
                                 <img src={`../images/blog/${articulo.encabezado}`} alt="Post Blog" />
                                 <div className="overlay-block">
                                    <a className="more-link" href="#"><i className="fa fa-arrows-alt" /></a>
                                 </div>
                              </div>
                              <div className="text-block">
                                 <h3><a href="blog-details.html">{articulo.titulo}</a></h3>
                                 <div className="meta-info">
                                    <a href="#">Por {articulo.autor}</a>
                                    <span className="sep">/</span>
                                    <a href="#"><Moment format="DD/MM/YYYY">{articulo.created_at}</Moment></a>
                                 </div>
                                 <Link to={{ pathname: '/articulo/' + articulo.slug, state: { articulo } }}
                                    className="more-btn">Leer más</Link>
                              </div>
                           </div>
                        )))
                     }                     
                  </div>
                  <div className="post-pagination text-center">
                     <a href="#"><i className="cameron-icon-left-arrow" /></a>
                     <a href="#" className="active">1</a>
                     <a href="#">2</a>
                     <a href="#">3</a><a href="#">4</a>
                     <a href="#">5</a><a href="#"><i className="cameron-icon-right-arrow" /></a>
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

export default Blog
