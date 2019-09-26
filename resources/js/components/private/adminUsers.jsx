import React, {Component} from 'react'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import Helmet from 'react-helmet'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import Container from 'muicss/lib/react/container'
import errorAlert from './errors'

import Profile from './profile'

class AdminUsers extends Component{
    constructor(props){
        super(props)
        this.state={
            loadAction: false,
            load: false,
            users:[],
            name: '',
            correo: '',
            contra: '',
            errors: {}
        }
        this.getUsuarios = this.getUsuarios.bind(this)
        this.actualizar = this.actualizar.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }
    getUsuarios(){
        axios.get('/dev/usuario').then(res=>{
            console.log(res.data)
            this.setState({
                users: res.data,
                load: true
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    componentDidMount(){
        this.getUsuarios()
    }
    actualizar(){
        this.getUsuarios()
    }
    handleOnSubmit(e){
        e.preventDefault()

        this.setState({loadAction: true})

        console.log(this.state)

        const data = new FormData()

        data.append('nombre', this.state.name)
        data.append('email', this.state.correo)
        data.append('password', this.state.contra)

        axios({
            method: 'post',
            url: '/dev/usuario/nuevo',
            data: data
        }).then(res=>{
            this.setState({ loadAction: false })
            console.log(res)
            SweetAlert.fire(
                'Correcto',
                'El usuario se ha agregado correctamente',
                'success'
            ).then(() => {
                this.getUsuarios()
                this.setState({
                    name: '',
                    correo: '',
                    contra: ''
                })
                document.getElementById('errores').style.display = 'none';
            })
        }).catch(err=>{
            this.setState({
                loadAction: false,
                errors: err.response.data.errors
            })
            console.log(err.response.errors)
            SweetAlert.fire(
                'Error',
                'Algo salió mal!',
                'error'
            )
            this.getUsuarios()
            window.scrollTo(0,0)
        })
    }
    handleChange(e){
        const { name, value} = e.target;
        
        this.setState({
            [name]: value
        })
    }
    
    render(){
        const {users,load,loadAction,errors} = this.state
        return(
            <div>

                <div className="main-containor admin-users">
                    <Helmet>
                        <title>Admin | Usuarios</title>
                    </Helmet>
                    <section className="item-list">
                        <div className="refresh">
                            <button className="btn-refresh tooltip" onClick={this.actualizar}>
                                <i className="fas fa-sync-alt"></i>
                                <span className="tooltiptext tooltiptext-left">Actualizar lista</span>
                            </button>
                        </div>
                        {
                            (load)
                                ?
                                (users.length === 0)
                                    ?
                                    <strong className="no-data">No hay información en la base de datos. <br />
                                        Empiece agregando una usuario.</strong>
                                    :
                                    (users.map((user) => (
                                        <section key={user.id} className="item-containor user-containor">
                                            <div className="text-containor">
                                                <span className="user-name">{user.name}</span>
                                                <span className="user-email">{user.email}</span>
                                                <div className="buttons-containor">
                                                    <button onClick={() => {
                                                        SweetAlert.fire({
                                                            title: '¿Estás seguro de eliminar este elemento?',
                                                            text: "No se podrán revertir los cambios",
                                                            type: 'warning',
                                                            showCancelButton: true,
                                                            confirmButtonColor: '#3085d6',
                                                            cancelButtonColor: '#d33',
                                                            cancelButtonText: 'Cancelar',
                                                            confirmButtonText: 'Si, eliminalo!'
                                                        }).then((result) => {
                                                            if (result.value) {
                                                                axios.delete('/dev/usuario/borrar/'+user.id).then((res) => {
                                                                    console.log(res)
                                                                    SweetAlert.fire(
                                                                        'Eliminado!',
                                                                        'El usuario ha sido eliminado.',
                                                                        'success'
                                                                    ).then(() => {
                                                                        this.getUsuarios()
                                                                    })
                                                                }).catch(err => {
                                                                    console.log(err)
                                                                    SweetAlert.fire(
                                                                        'Ooops!',
                                                                        'Algo salió mal.',
                                                                        'error'
                                                                    ).then(() => {
                                                                        this.getUsuarios()
                                                                    })
                                                                })


                                                            }
                                                        })
                                                    }} className="button button-delete tooltip">
                                                        <i className="fas fa-trash-alt"></i>
                                                        <span className="tooltiptext">Eliminar</span>
                                                    </button>
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
                            <legend>Agregar usuario</legend>
                            {errorAlert(errors)}
                            <Input
                                id="nombre"
                                label="Nombre"
                                floatingLabel={true}
                                onChange={this.handleChange}
                                value={this.state.name}
                                name="name"
                            />
                            <Input
                                id="corr"
                                label="Email"
                                floatingLabel={true}
                                type="email"
                                onChange={this.handleChange}
                                value={this.state.correo}
                                name="correo"
                            />
                            <Input
                                id="con"
                                label="Contraseña"
                                floatingLabel={true}
                                type="password"
                                onChange={this.handleChange}
                                value={this.state.contra}
                                name="contra"
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
                </div>
                <Profile/>
            </div>
        )
    }
}
export default AdminUsers