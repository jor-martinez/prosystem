import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SweetAlert from 'sweetalert2'
import Helmet from 'react-helmet'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'


class AdminProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productos: [],
            load: false,
            loadAction: false,
            titulo: '',
            descripcion: '',
            link: ''
        }
        this.getProductos = this.getProductos.bind(this)
        this.actualizar = this.actualizar.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }
    getProductos() {
        axios.get('/api/productos').then(res => {
            console.log(res.data)
            this.setState({
                productos: res.data,
                load: true
            })
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount() {
        this.getProductos()
    }
    actualizar() {
        this.getPoductos()
    }
    handleChange(e) {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })
    }
    handleOnSubmit(e) {
        e.preventDefault()
        this.setState({ loadAction: true })

        if (this.state.productos.length === 4) {
            SweetAlert.fire(
                'Atención !',
                'No se pueden agregar mas productos',
                'warning'
            ).then(() => this.resetForm())
            this.setState({ loadAction: false })

        } else {
            const data = new FormData()
            data.append('titulo', this.state.titulo)
            data.append('descripcion', this.state.descripcion)
            data.append('link', this.state.link)

            axios({
                method: 'post',
                url: '/dev/productos/nueva',
                data
            }).then(res => {
                SweetAlert.fire(
                    'Correcto',
                    'El producto se ha agregado correctamente',
                    'success'
                ).then(() => {
                    this.getProductos()
                    this.setState({
                        titulo: '',
                        descripcion: '',
                        link: ''
                    })
                })
                this.setState({ loadAction: false })
            }).catch(err => {
                console.log(err.response.errors)
                SweetAlert.fire(
                    'Oooops!',
                    'Algo salió mal',
                    'error'
                ).then(() => {
                    this.getProductos()
                })
                this.setState({ loadAction: false })
            })
        }
    }
    render() {
        const { productos, load, loadAction } = this.state
        return (
            <div className="main-containor admin-process">
                <Helmet>
                    <title>Admin | Productos</title>
                </Helmet>
                <section className="item-list">
                    <div className="refresh">
                        <button className="btn-refresh tooltip" onClick={this.actualizar}>
                            <i className="fas fa-sync-alt"></i>
                            <span className="tooltiptext">Actualizar lista</span>
                        </button>
                    </div>
                    {
                        (load)
                            ?
                            (productos.length === 0)
                                ?
                                <strong className="no-data">No hay información en la base de datos. <br />
                                    Empieza agregando un producto, solo puedes agregar 4.
                                </strong>
                                :
                                (productos.map((producto) => (
                                    <section key={producto.id} className="item-containor process-containor">
                                        <div className="info-containor">
                                            <div className="text-containor">
                                                <h2>{producto.titulo}</h2>
                                                <p>{producto.descripcion}</p>
                                            </div>
                                            <div className="buttons-containor">
                                                <Link to={{ pathname: '/admin/producto/editar', state: { producto } }}
                                                    className="button button-edit tooltip">
                                                    <i className="fas fa-edit"></i>
                                                    <span className="tooltiptext">Editar</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </section>
                                )))
                            :
                            <span className="preloader">Cargando información ...</span>
                    }
                </section>
                <section id="add-product" className="item-add">
                    <Form onSubmit={this.handleOnSubmit} encType="multipart/form-data" autoComplete="off">
                        <legend>Agregar una producto</legend>
                        <Input
                            id="titulo"
                            className="form-input"
                            label="Nombre"
                            floatingLabel={true}
                            name="titulo"
                            onChange={this.handleChange}
                            value={this.state.titulo}
                            required
                        />
                        <Input
                            id="descripcion"
                            className="form-input"
                            label="Descripción"
                            floatingLabel={true}
                            name="descripcion"
                            onChange={this.handleChange}
                            value={this.state.descripcion}
                            required
                        />
                        <Input
                            id="enlace"
                            className="form-input"
                            label="Link"
                            floatingLabel={true}
                            name="link"
                            type="url"
                            onChange={this.handleChange}
                            value={this.state.link}
                            required
                        />
                        <Button variant="raised" color="primary" disabled={loadAction} >
                            {
                                (loadAction)
                                    ?
                                    <span><i className="fas fa-spinner fa-spin"></i> Agregando</span>
                                    :
                                    <span>Agregar</span>
                            }
                        </Button>
                        <Button variant="flat" type="reset" >Limpiar Campos</Button>
                    </Form>

                </section>
            </div>
        )
    }
}

export default AdminProducts