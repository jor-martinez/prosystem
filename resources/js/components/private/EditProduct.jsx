import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'

class EditProducto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.location.state.producto.id,
            titulo: this.props.location.state.producto.titulo,
            descripcion: this.props.location.state.producto.descripcion,
            link: this.props.location.state.producto.link,
            loadAction: false
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
        console.log(this.state)
        this.setState({ loadAction: true })
        const data = new FormData()

        data.append('titulo', this.state.titulo)
        data.append('descripcion', this.state.descripcion)
        data.append('link', this.state.link)

        axios({
            method: 'post',
            url: '/dev/productos/editar/' + this.state.id,
            data
        }).then(res => {
            this.setState({ loadAction: false })
            SweetAlert.fire(
                'Correcto',
                'El producto se modificó exitosamente',
                'success'
            ).then(() => {
                window.location.href = '/admin/productos'
            })
        }).catch(err => {
            this.setState({ loadAction: false })
            console.log(err.response.data)
            SweetAlert.fire(
                'Error',
                'Algo salió mal',
                'error'
            )
        })
    }
    render() {
        const { loadAction } = this.state
        return (
            <div className="one-process-edit">
                <Form onSubmit={this.handleOnUpdate} encType="multipart/form-data" autoComplete="off">
                    <legend>Editar Producto</legend>
                    <Input
                        className="form-input"
                        label="Titulo"
                        floatingLabel={true}
                        name="titulo"
                        value={this.state.titulo}
                        onChange={this.handleChange}
                        required
                    />
                    <Input
                        className="form-input"
                        label="Descripción"
                        floatingLabel={true}
                        name="descripcion"
                        value={this.state.descripcion}
                        onChange={this.handleChange}
                        required
                    />
                    <Input
                        className="form-input"
                        label="Link"
                        floatingLabel={true}
                        name="link"
                        value={this.state.link}
                        onChange={this.handleChange}
                        required
                    />
                    <Button variant="raised" color="primary" disabled={loadAction} >
                        {
                            (loadAction)
                                ?
                                <span><i className="fas fa-spinner fa-spin"></i> Editando</span>
                                :
                                <span>Editar</span>
                        }
                    </Button>
                    <Link className="button button-cancel" to="/admin/productos">Cancelar</Link>
                </Form>
            </div>
        )
    }
}

export default EditProducto