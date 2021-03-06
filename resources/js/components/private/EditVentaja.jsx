import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import errorAlert from './errors'

class EditVentaja extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.location.state.ventaja.id,
            titulo: this.props.location.state.ventaja.titulo,
            descripcion: this.props.location.state.ventaja.descripcion,
            loadAction: false,
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

        data.append('titulo', this.state.titulo)
        data.append('descripcion', this.state.descripcion)

        axios({
            method: 'post',
            url: '/dev/caracteristicas/editar/' + this.state.id,
            data
        }).then(res => {
            this.setState({ loadAction: false })
            SweetAlert.fire(
                'Correcto',
                'Se editó la ventaja exitosamente',
                'success'
            ).then(() => {
                window.location.href = '/admin/ventajas'
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
        const { loadAction, errors } = this.state
        return (
            <div className="one-process-edit">
                <div className="return">
                    <Link className="button button-return tooltip return-btn" to="/admin/ventajas">
                        <i className="fas fa-reply"></i>
                        <span className="tooltiptext-right">Regresar</span>
                    </Link>
                </div>
                <Form onSubmit={this.handleOnUpdate} encType="multipart/form-data" autoComplete="off">
                    <legend>Editar ventaja</legend>
                    {errorAlert(errors)}
                    <Input
                        className="form-input"
                        label="Titulo"
                        floatingLabel={true}
                        name="titulo"
                        value={this.state.titulo}
                        onChange={this.handleChange}
                    />
                    <Input
                        className="form-input"
                        label="Descripción"
                        floatingLabel={true}
                        name="descripcion"
                        value={this.state.descripcion}
                        onChange={this.handleChange}
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
                </Form>
            </div>
        )
    }
}

export default EditVentaja