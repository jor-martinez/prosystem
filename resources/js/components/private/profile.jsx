import React, {Component} from 'react'
import axios from 'axios'
import Moment from 'react-moment'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import errorAlert from './errors'
import SweetAlert from 'sweetalert2'

class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            user: [],
            load: true,
            loadAction: false,
            id: '',
            nombre: '',
            email: '',
            errors: {},
            password:'',
            passwordNew: '',
            passwordConfirm: ''

        }
        this.getProfile = this.getProfile.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.handleOnClickEdit = this.handleOnClickEdit.bind(this)
        this.handleOnCancel = this.handleOnCancel.bind(this)
        this.handleOnClickEditPass = this.handleOnClickEditPass.bind(this)
        this.handleOnSubmitPass = this.handleOnSubmitPass.bind(this)
    }
    componentDidMount(){
        this.getProfile()
    }
    getProfile(){
        this.setState({load: false})
        axios.get('/admin/obtener-info').then(res => {
            // console.log(res.data)
            this.setState({
               nombre: res.data.name,
               email: res.data.email,
               id: res.data.id,
               load: true,
            })
            
        }).catch(err => {
            console.log(err)
        })
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    handleOnSubmit(e){
        e.preventDefault()
        this.setState({ loadAction: true })
        const data = new FormData()

        data.append('nombre', this.state.nombre)
        data.append('email', this.state.email)

        axios({
            method: 'post',
            url: '/dev/usuario/modificar/'+this.state.id,
            data
        }).then(res=>{
            this.setState({ loadAction: false })
            // console.log(res)
            SweetAlert.fire(
                'Correcto',
                'Se editaron los datos exitosamente',
                'success'
            ).then(() => {
                // window.location.href = '/admin/mision-vision-objetivo'
                document.getElementById('btn-dlt').style.display = 'none';
                document.getElementById('serv-edit').style.display = 'none';
                document.getElementById('serv-edit').style.opacity = '0';

            })
        }).catch(err=>{
            console.log(err)
            this.setState({
                loadAction: false,
                errors: err.response.data.errors
            })
            SweetAlert.fire(
                'Error',
                'Algo salió mal',
                'error'
            )
        })
    }
    handleOnClickEdit(){
        document.getElementById('serv-edit').style.display = 'block';
        document.getElementById('serv-edit').style.opacity = '1';
        // document.getElementById('serv-cont').style.display = 'none';
        document.getElementById('btn-dlt').style.display = 'inline';
        document.getElementById('pass-edit').style.display = 'none';
        document.getElementById('pass-edit').style.opacity = '0';
    }
    handleOnCancel(){
        document.getElementById('btn-dlt').style.display = 'none';
        document.getElementById('serv-edit').style.display = 'none';
        document.getElementById('serv-edit').style.opacity = '0';
        document.getElementById('pass-edit').style.display = 'none';
        document.getElementById('pass-edit').style.opacity = '0';
    }
    handleOnClickEditPass(){
        document.getElementById('pass-edit').style.display = 'block';
        document.getElementById('pass-edit').style.opacity = '1';
        document.getElementById('btn-dlt').style.display = 'inline';
        document.getElementById('serv-edit').style.display = 'none';
        document.getElementById('serv-edit').style.opacity = '0';
    }
    handleOnSubmitPass(e){
        e.preventDefault()
        this.setState({ loadAction: true })
        console.log(this.state)
        const data = new FormData()

        if(this.state.passwordConfirm === this.state.passwordNew){
            data.append('password', this.state.password)
            data.append('passwordNew', this.state.passwordNew)
            
            axios.post('/dev/usuario/modificarPassword/'+this.state.id, data).then(res=>{
                this.setState({ loadAction: false })
                // console.log(res)
                SweetAlert.fire(
                    'Correcto',
                    'La contraseña se modificó exitosamente',
                    'success'
                ).then(() => {
                    // window.location.href = '/admin/mision-vision-objetivo'
                    document.getElementById('btn-dlt').style.display = 'none';
                    document.getElementById('serv-edit').style.display = 'none';
                    document.getElementById('serv-edit').style.opacity = '0';
                    window.location.href = '/logout'
                })
            }).catch(err=>{
                console.log(err)
                this.setState({
                    loadAction: false,
                    errors: err.response.data.errors
                })
                SweetAlert.fire(
                    'Error',
                    'Algo salió mal',
                    'error'
                )
            })
        }
        else{
            SweetAlert.fire(
                'Atención !',
                'Las contraseñas no coinciden',
                'warning'
            ).then(() => {
                this.setState({
                    loadAction: false,
                    passwordNew: '',
                    passwordConfirm: ''
                })
                document.getElementById('np').focus();
            })
        }
    }
    render(){
        const {user, load, loadAction, nombre, email, errors} = this.state
        return(
            <div>
                {
                    (load)
                    ?
                    <div className="profile-containor">
                        <div className="profile-info" id="serv-cont">
                            <h1>Perfil de usuario</h1>
                            <div>
                                <table>
                                    <tbody>
                                        <tr className="dark">
                                            <th>Nombre</th>
                                            <td>{nombre}</td>
                                        </tr>
                                        <tr className="light">
                                            <th>Email</th>
                                            <td>{email}</td>
                                        </tr>
                                        <tr className="dark">
                                            <th>Contraseña</th>
                                            <td>**********</td>
                                        </tr>
                                        <tr className="light">
                                            <th>Fecha de creación</th>
                                            <td><Moment format="DD/MM/YYYY">{user.created_at}</Moment></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="buttons-block buttons-block-admin">
                                    <button onClick={this.handleOnClickEdit} className="button button-edit edit-btn edit-mision tooltip">
                                        <i className="fas fa-edit"></i>
                                        <span className="tooltiptext tooltiptext-left">Cambiar datos</span>
                                    </button>
                                    <button onClick={this.handleOnClickEditPass} className="button button-edit edit-btn edit-mision tooltip">
                                        <i className="fas fa-key"></i>
                                        <span className="tooltiptext tooltiptext-left">Cambiar contraseña</span>
                                    </button>
                                    <button id="btn-dlt" className="button button-delete delete-btn tooltip"
                                    style={{display: 'none'}}
                                    onClick={this.handleOnCancel}>
                                        <i className="fas fa-plus tacha"></i>
                                        <span className="tooltiptext tooltiptext-left">Cancelar</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="profile-edit" id="serv-edit">
                            <Form onSubmit={this.handleOnSubmit} encType="multipart/form-data" autoComplete="off">
                                <legend>Edita tu perfil</legend>
                                {errorAlert(errors)}
                                <Input
                                    className="form-input"
                                    label="Nombre"
                                    floatingLabel={true}
                                    name="nombre"
                                    required
                                    value={nombre}
                                    onChange={this.handleChange}
                                />
                                <Input
                                    className="form-input"
                                    label="Email"
                                    floatingLabel={true}
                                    name="email"
                                    required
                                    value={email}
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
                        <div className="password-edit" id="pass-edit">
                            <Form onSubmit={this.handleOnSubmitPass} encType="multipart/form-data" autoComplete="off">
                                <legend>Cambia tu contraseña</legend>
                                {errorAlert(errors)}
                                <Input
                                    className="form-input"
                                    label="Contraseña actual"
                                    floatingLabel={true}
                                    name="password"
                                    required
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <Input
                                    id="np"
                                    className="form-input"
                                    label="Nueva contraseña"
                                    floatingLabel={true}
                                    name="passwordNew"
                                    required
                                    type="password"
                                    value={this.state.passwordNew}
                                    onChange={this.handleChange}
                                />
                                <Input
                                    className="form-input"
                                    label="Confirma la nueva contraseña"
                                    floatingLabel={true}
                                    name="passwordConfirm"
                                    required
                                    type="password"
                                    value={this.state.passwordConfirm}
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
                    </div>
                    :
                    <span className="preloader">Cargando información ...</span>
                }
            </div>
        )
    }
}
export default Profile