import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SweetAlert from 'sweetalert2'
import Helmet from 'react-helmet'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import Textarea from 'muicss/lib/react/textarea'
import Container from 'muicss/lib/react/container'
import Input from 'muicss/lib/react/input'
import errorAlert from './errors'

class AdminContacto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datosContacto: [],
            load: false,
            loadAction: false,
            ubicacion: '',
            telefonos: '',
            correos: '',
            errors: {}
        }
        this.getDatosContacto = this.getDatosContacto.bind(this)
        this.actualizar = this.actualizar.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }
    getDatosContacto() {
        axios.get('/api/empresa').then(res => {
            // console.log(res.data)
            this.setState({
                datosContacto: res.data,
                load: true
            })
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount() {
        this.getDatosContacto()
    }
    actualizar() {
        this.getDatosContacto()
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

        if (this.state.datosContacto.length === 1) {
            SweetAlert.fire(
                'Atención !',
                'No se pueden agregar mas registros',
                'warning'
            ).then(() => this.resetForm())
            this.setState({ loadAction: false })

        } else {
            const data = new FormData()

            data.append('ubicacion', this.state.ubicacion)
            data.append('telefono', this.state.telefonos)
            data.append('correo', this.state.correos)

            axios({
                method: 'post',
                url: '/dev/empresa/nueva',
                data
            }).then(res => {
                SweetAlert.fire(
                    'Correcto',
                    'La información de contacto se ha agregado correctamente',
                    'success'
                ).then(() => {
                    this.getDatosContacto()
                    this.setState({
                        ubicacion: '',
                        telefonos: '',
                        correos: ''
                    })
                    document.getElementById('errores').style.display = 'none';
                })
                this.setState({ loadAction: false })
            }).catch(err => {
                console.log(err.response.errors)
                SweetAlert.fire(
                    'Oooops!',
                    'Algo salió mal',
                    'error'
                ).then(() => {
                    this.getDatosContacto()
                })
                this.setState({
                    loadAction: false,
                    errors: err.response.data.errors
                })
                window.scrollTo(0,0)
            })
        }
    }
    render() {
        const { datosContacto, load, loadAction, errors } = this.state
        return (
            <div className="main-containor admin-process">
                <Helmet>
                    <title>Admin | Contacto</title>
                </Helmet>
                <section className="item-list">
                    <div className="refresh">
                        <button className="btn-refresh tooltip" onClick={this.actualizar}>
                            <i className="fas fa-sync-alt"></i>
                            <span className="tooltiptext-right">Actualizar lista</span>
                        </button>
                        {
                            (datosContacto.length !== 0)
                            &&
                            <Link to={{ pathname: '/admin/contacto-info/editar', state: { datosContacto } }}
                                className="button button-edit tooltip">
                                <i className="fas fa-edit"></i>
                                <span className="tooltiptext-right">Editar</span>
                            </Link>
                        }
                    </div>
                    {
                        (load)
                            ?
                            (datosContacto.length === 0)
                                ?
                                <strong className="no-data">No hay información en la base de datos. <br />
                                    Empieza agregando un registro.
                                </strong>
                                :
                                <div className="containor-full" key={datosContacto[0].id}>
                                    <section className="item-containor process-containor">
                                        <div className="info-containor" >
                                            <div className="text-containor">
                                                <h2>Ubicación</h2>
                                                <p>{datosContacto[0].ubicacion}</p>
                                            </div>
                                        </div>
                                    </section>
                                    <section className="item-containor process-containor">
                                        <div className="info-containor" >
                                            <div className="text-containor">
                                                <h2>Teléfonos</h2>
                                                <p style={{whiteSpace: "pre-line"}}>{datosContacto[0].telefono}</p>
                                            </div>
                                        </div>
                                    </section>
                                    <section className="item-containor process-containor">
                                        <div className="info-containor" >
                                            <div className="text-containor">
                                                <h2>Correos</h2>
                                                <p style={{whiteSpace: "pre-line"}}>{datosContacto[0].correo}</p>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                            :
                            <span className="preloader pre-mision">Cargando información ...</span>
                    }
                </section>
                {
                    (datosContacto.length < 1)
                    &&
                    <section id="add-product" className="item-add">
                        <Form onSubmit={this.handleOnSubmit} encType="multipart/form-data" autoComplete="off">
                            <legend>Agrega la información de contacto</legend>
                            {errorAlert(errors)}
                            <Textarea
                                rows="3"
                                id="ubi"
                                className="form-input"
                                label="Ubicación"
                                floatingLabel={true}
                                name="ubicacion"
                                onChange={this.handleChange}
                                value={this.state.ubicacion}
                                required
                            />
                            <Textarea
                                rows="3"
                                id="tel"
                                className="form-input"
                                label="Teléfonos"
                                floatingLabel={true}
                                name="telefonos"
                                onChange={this.handleChange}
                                value={this.state.telefonos}
                                required
                            />
                            <Textarea
                                rows="3"
                                id="corr"
                                className="form-input"
                                label="Correos"
                                floatingLabel={true}
                                name="correos"
                                onChange={this.handleChange}
                                value={this.state.correos}
                                required
                            />
                            <Container>
                                <Button className="button-form" variant="raised" color="primary" disabled={loadAction}>
                                    {
                                    (loadAction)
                                    ?
                                        <span><i className="fas fa-spinner fa-spin"></i> Agregando</span>
                                    :
                                        <span>Agregar</span>
                                    }
                                </Button>
                                <Button className="button-form" variant="flat" type="reset" onClick={this.onReset} >Limpiar Campos</Button>
                            </Container>
                        </Form>

                    </section>
                }

            </div>
        )
    }
}

export default AdminContacto