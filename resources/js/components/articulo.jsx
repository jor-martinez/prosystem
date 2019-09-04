import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import Brand from './sliderMarcas'

class Articulo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titulo: this.props.location.state.articulo.titulo,
            cuerpo: this.props.location.state.articulo.cuerpo,
            encabezado: this.props.location.state.articulo.encabezado,
            autor: this.props.location.state.articulo.autor,
            fechaCreado: this.props.location.state.articulo.created_at
        }
    }
    render() {
        return (
            <div>
                <section className="page-title-block text-center" style={{ backgroundImage: `url(../images/blog/${this.state.encabezado})` }}>
                    <div className="container">
                        <h2>{this.state.titulo}</h2>
                        <div className="thm-breadcrumb">
                            <Link to="/">Inicio</Link>
                            <span className="sep">/</span>
                            <span className="page-title">Articulo</span>
                        </div>
                    </div>
                </section>
                <section className="blog-style-three">
                    <div className="container">
                        <div className="row">
                            <div className="service-details-content">
                                <br />
                                <h3>{this.state.titulo}</h3>
                                <br />
                                <div>
                                    <span>Autor: {this.state.autor}</span><br/>
                                    <span>Creado el: <Moment format="DD/MM/YYYY" >{this.state.fechaCreado}</Moment> </span>
                                </div>
                                <br/>
                                <div dangerouslySetInnerHTML={{ __html: this.state.cuerpo }}></div>
                                <br />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="brands-area-one">
                    <Brand />
                </section>
            </div>
        )
    }
}
export default Articulo
