import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import errorAlert from './errors'

class EditProceso extends Component{
    constructor(props){
        super(props)
        this.state={
            id: this.props.location.state.proceso.id,
            proceso: this.props.location.state.proceso.proceso,
            descripcion: this.props.location.state.proceso.descripcion,
            loadAction: false,
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleOnUpdate = this.handleOnUpdate.bind(this)
    }
    handleChange(e) {
        const { name, value} = e.target;
        this.setState({
            [name]: value
        })
    }
    handleOnUpdate(e){
        e.preventDefault()
        this.setState({loadAction:true})
        const data = new FormData()

        data.append('proceso', this.state.proceso)
        data.append('descripcion', this.state.descripcion)

        axios({
            method: 'post',
            url: '/dev/proceso/editar/'+this.state.id,
            data
        }).then(res=>{
            this.setState({ loadAction: false })
            SweetAlert.fire(
                'Correcto',
                'Se editó el proceso exitosamente',
                'success'
            ).then(()=>{
                window.location.href = '/admin/procesos'
            })
        }).catch(err=>{
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
    render(){
        const {loadAction,errors} = this.state
        return (
            <div className="one-process-edit">
                <Form onSubmit={this.handleOnUpdate} encType="multipart/form-data" autoComplete="off">
                    <legend>Editar proceso</legend>
                    {errorAlert(errors)}
                    <Input
                        className="form-input"
                        label="Nombre"
                        floatingLabel={true}
                        name="proceso"
                        value={this.state.proceso}
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
                    <Link className="button button-cancel" to="/admin/procesos">Cancelar</Link>
                </Form>
            </div>
        )
    }
}
    
export default EditProceso