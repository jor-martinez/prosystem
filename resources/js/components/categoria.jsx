import React, {Component} from 'react'
import {
    Link,
    Switch,
    BrowserRouter as Router,
    Route
 } from 'react-router-dom'

import pageTitle from './media/resources/page-title-bg.jpg'

class Categoria extends Component{
    constructor(props){
        super(props)
        this.state={
             cat: [],
             service: []
        }
    }
    componentDidMount(){
        this.setState({
            cat: this.props.history.location.state.categoria,
            service: this.props.history.location.state.service
        })
    }
    componentWillUnmount(){
        this.setState({
            cat: [],
            service: []
        })
    }
    render(){
        // console.log(this.props)
        const {cat, service} = this.state
        return(
            <div>
                <section className="page-title-block text-center" style={{ backgroundImage: `url(${pageTitle})` }}>
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