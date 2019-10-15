import React, {Component} from 'react'
import axios from 'axios'
import {
    Link,
    Switch,
    BrowserRouter as Router,
    Route
 } from 'react-router-dom'
 import Helmet from 'react-helmet'

import pageTitle from './media/resources/page-title-bg.jpg'

class Categoria extends Component{
    constructor(props){
        super(props)
        this._isMounted = false;
        this.state={
            cat: [],
            service: [],
            slugs: this.props.location.pathname.substring(10),
            slug: '',
            slugCat: ''
        }
    }

    componentDidMount(){
        this._isMounted = true;
        // console.log(this.state.slugServ.split("/")[1])
        this.setState({
            slug: this.state.slugs.split("/")[0],
            slugCat: this.state.slugs.split("/")[1]
        })
        axios.get('/api/servicios/'+this.state.slug).then(res=>{
            console.log(res.data)
            if(this._isMounted){
                this.setState({
                    service: res.data[0]
                })
            }
            axios.get('/api/servicios/'+this.state.slug+'/'+this.state.slugCat).then(res=>{
                console.log(res.data)
                if(this._isMounted){
                    this.setState({
                        cat: res.data[0]
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    componentWillUnmount(){
        this.setState({
            cat: [],
            service: []
        })
        this._isMounted = false;
    }
    render(){
        const {cat, service} = this.state
        return(
            <div>
                <Helmet>
                    <title>{cat.titulo}</title>
                    <meta name="description" content={service.nombre + " " + cat.titulo} />
                </Helmet>
                <section className="page-title-block text-center" style={{ backgroundImage: `url(../../images/servicios/${service.Imagen})` }}>
                  <div className="container">
                     <h2>{service.nombre} / {cat.titulo}</h2>
                     <div className="thm-breadcrumb">
                        <Link to="/">Inicio</Link>
                        <span className="sep">/</span>
                        <Link to={{pathname: '/servicio/'+service.slug}}>{service.nombre}</Link>
                        <span className="sep">/</span>
                        <span className="page-title">Categoría</span>
                     </div>
                  </div>
               </section>
               <section className="blog-style-three">
                  <div className="container">
                     <div className="row">
                        <div className="service-details-content">
                           <br />
                           <div dangerouslySetInnerHTML={{__html: cat.descripcion}}></div>
                           <br />
                        </div>
                     </div>
                  </div>
               </section>
            </div>
        )
    }
}
export default Categoria