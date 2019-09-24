import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import Textarea from 'muicss/lib/react/textarea'
import errorAlert from './errors'

class EditContacto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.location.state.datosContacto[0].id,
            ubicacion: this.props.location.state.datosContacto[0].ubicacion,
            telefonos: this.props.location.state.datosContacto[0].telefono,
            correos: this.props.location.state.datosContacto[0].correo,
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleOnUpdate = this.handleOnUpdate.bind(this)
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    handleOnUpdate(e) {
        e.preventDefault()
        this.setState({ loadAction: true })
        const data = new FormData()

        data.append('ubicacion', this.state.ubicacion)
        data.append('telefono', this.state.telefonos)
        data.append('correo', this.state.correos)

        axios({
            method: 'post',
            url: '/dev/empresa/editar/' + this.state.id,
            data
        }).then(res => {
            this.setState({ loadAction: false })
            SweetAlert.fire(
                'Correcto',
                'Se editaron los datos exitosamente',
                'success'
            ).then(() => {
                window.location.href = '/admin/contacto'
            })
        }).catch(err => {
            this.setState({
                loadAction: false,
                errors: err.response.data.errors
            })
            console.log(err.response.data)
            SweetAlert.fire(
                'Error',
                'Algo salió mal',
                'error'
            )
        })
    }
    render() {
        const { loadAction,errors } = this.state
        console.log(this.props)
        return (
            <div className="one-process-edit">
                <Form onSubmit={this.handleOnUpdate} encType="multipart/form-data" autoComplete="off">
                    <legend>Editar datos de contacto</legend>
                    {errorAlert(errors)}
                    <Textarea
                        className="form-input"
                        label="Ubicación"
                        floatingLabel={true}
                        name="ubicacion"
                        value={this.state.ubicacion}
                        onChange={this.handleChange}
                        required
                    />
                    <Textarea
                        className="form-input"
                        label="Teléfonos"
                        floatingLabel={true}
                        name="telefonos"
                        value={this.state.telefonos}
                        onChange={this.handleChange}
                        required
                    />
                    <Textarea
                        className="form-input"
                        label="Correos"
                        floatingLabel={true}
                        name="correos"
                        value={this.state.correos}
                        onChange={this.handleChange}
                        required
                    />
                    <Button variant="raised" color="primary" disabled={loadAction} >
                        {
                            (loadAction)
                                ?
                                <span><i className="fas fa-spinner fa-spin"></i> Aplicando cambios</span>
                                :
                                <span>Aplicar cambios</span>
                        }
                    </Button>
                    <Link className="button button-cancel" to="/admin/contacto">Cancelar</Link>
                </Form>
            </div>
        )
    }
}

export default EditContacto