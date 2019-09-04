import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SweetAlert from 'sweetalert2'
import Helmet from 'react-helmet'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'


class AdminVentajas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ventajas: [],
            load: false,
            loadAction: false,
            titulo: '',
            descripcion: ''
        }
        this.getVentajas = this.getVentajas.bind(this)
        this.actualizar = this.actualizar.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.resetForm = this.resetForm.bind(this)
    }
    getVentajas() {
        axios.get('/api/caracteristicas').then(res => {
            console.log(res.data)
            this.setState({
                ventajas: res.data,
                load: true
            })
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount() {
        this.getVentajas()
    }
    actualizar() {
        this.getVentajas()
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

        if (this.state.ventajas.length === 3) {
            SweetAlert.fire(
                'Atención !',
                'No se pueden agregar mas ventajas',
                'warning'
            ).then(() => this.resetForm())
            this.setState({ loadAction: false })

        } else {
            const data = new FormData()
            data.append('titulo', this.state.titulo)
            data.append('descripcion', this.state.descripcion)

            axios({
                method: 'post',
                url: '/dev/caracteristicas/nueva',
                data
            }).then(res => {
                SweetAlert.fire(
                    'Correcto',
                    'La ventaja se ha agregado correctamente',
                    'success'
                ).then(() => {
                    this.getVentajas()
                    this.resetForm()
                })
                this.setState({ loadAction: false })
            }).catch(err => {
                console.log(err.response.errors)
                SweetAlert.fire(
                    'Oooops!',
                    'Algo salió mal',
                    'error'
                ).then(() => {
                    this.getVentajas()
                })
                this.setState({ loadAction: false })
            })
        }
    }
    resetForm() {
        document.getElementById('titulo').value = '';
        document.getElementById('descripcion').value = '';
    }
    render() {
        const { ventajas, load, loadAction } = this.state
        return (
            <div className="main-containor admin-process">
                <Helmet>
                    <title>Admin | Proceso</title>
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
                            (ventajas.length === 0)
                                ?
                                <strong className="no-data">No hay información en la base de datos. <br />
                                    Empieza agregando una ventaja, solo puedes agregar 3.
                                </strong>
                                :
                                (ventajas.map((ventaja) => (
                                    <section key={ventaja.id} className="item-containor process-containor">
                                        <div className="info-containor">
                                            <div className="text-containor">
                                                <h2>{ventaja.titulo}</h2>
                                                <p>{ventaja.descripcion}</p>
                                            </div>
                                            <div className="buttons-containor">
                                                <Link to={{ pathname: '/admin/ventaja/editar', state: { ventaja } }}
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
                <section className="item-add">
                    <Form onSubmit={this.handleOnSubmit} encType="multipart/form-data" autoComplete="off">
                        <legend>Agregar una ventaja</legend>
                        <Input
                            id="titulo"
                            className="form-input"
                            label="Nombre"
                            floatingLabel={true}
                            name="titulo"
                            onChange={this.handleChange}
                        />
                        <Input
                            id="descripcion"
                            className="form-input"
                            label="Descripción"
                            floatingLabel={true}
                            name="descripcion"
                            onChange={this.handleChange}
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

export default AdminVentajas