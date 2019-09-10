import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import Textarea from 'muicss/lib/react/textarea'
import errorAlert from './errors'

class EditMission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.location.state.datos[0].id,
            mision: this.props.location.state.datos[0].mision,
            vision: this.props.location.state.datos[0].vision,
            objetivo: this.props.location.state.datos[0].objetivo,
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

        data.append('mision', this.state.mision)
        data.append('vision', this.state.vision)
        data.append('objetivo', this.state.objetivo)

        axios({
            method: 'post',
            url: '/dev/nosotros/editar' + this.state.id,
            data
        }).then(res => {
            this.setState({ loadAction: false })
            SweetAlert.fire(
                'Correcto',
                'Se editaron los datos exitosamente',
                'success'
            ).then(() => {
                window.location.href = '/admin/mision-vision-objetivo'
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
                    <legend>Editar misión, visión y objetivo</legend>
                    {errorAlert(errors)}
                    <Textarea
                        className="form-input"
                        label="Misión"
                        floatingLabel={true}
                        name="mision"
                        value={this.state.mision}
                        onChange={this.handleChange}
                    />
                    <Textarea
                        className="form-input"
                        label="Visión"
                        floatingLabel={true}
                        name="vision"
                        value={this.state.vision}
                        onChange={this.handleChange}
                    />
                    <Textarea
                        className="form-input"
                        label="Objetivo"
                        floatingLabel={true}
                        name="objetivo"
                        value={this.state.objetivo}
                        onChange={this.handleChange}
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
                    <Link className="button button-cancel" to="/admin/mision-vision-objetivo">Cancelar</Link>
                </Form>
            </div>
        )
    }
}

export default EditMission