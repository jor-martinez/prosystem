import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'
import Brand from './sliderMarcas'
import axios from 'axios'
import Helmet from 'react-helmet'

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

class Articulo extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            slug: this.props.location.pathname.substring(10),
            articulo: []
        }
        this.getArt = this.getArt.bind(this)
    }
    getArt(){
        axios.get('/api/blog/articulo/'+this.state.slug).then(res=>{
            if(this._isMounted){
                // console.log(res.data)
                this.setState({
                    articulo: res.data[0]
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    componentDidMount(){
        this._isMounted = true;
        this.getArt()
        window.scrollTo(0,0)
        // document.getElementById('spinner').style.display = 'none';
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    render() {
        // console.log(this.state.slug)
        const {articulo} = this.state
        return (
            <div>
                <Helmet>
                    <title>{articulo.titulo}</title>
                    <meta name="description" content={articulo.titulo} />
                </Helmet>
                <section className="page-title-block text-center" style={{ backgroundImage: `url(../images/blog/${articulo.encabezado})` }}>
                    <div className="container">
                        <h2>{articulo.titulo}</h2>
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
                                <h3>{articulo.titulo}</h3>
                                <br />
                                <div>
                                    <span>Autor: {articulo.autor}</span><br/>
                                    <span>Creado el: {dateFormat(articulo.fechaCreado, 'dddd, d "de" mmmm "de" yyyy, h:MM:ss TT')} </span>
                                </div>
                                <br/>
                                <div dangerouslySetInnerHTML={{ __html: articulo.cuerpo }}></div>
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
