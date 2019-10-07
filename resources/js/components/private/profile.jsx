import React, {Component} from 'react'
import axios from 'axios'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import Container from 'muicss/lib/react/container'
import errorAlert from './errors'
import SweetAlert from 'sweetalert2'
import dateFormat from 'dateformat'

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
            fecha: '',
            errors: {},
            password:'',
            passwordNew: '',
            passwordConfirm: '',
            eyeOpen: true,
            eyeOpen2: true,
            message: ''
        }
        this.getProfile = this.getProfile.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.handleOnClickEdit = this.handleOnClickEdit.bind(this)
        this.handleOnCancel = this.handleOnCancel.bind(this)
        this.handleOnClickEditPass = this.handleOnClickEditPass.bind(this)
        this.handleOnSubmitPass = this.handleOnSubmitPass.bind(this)
        this.showPass = this.showPass.bind(this)
        this.showPassCon = this.showPassCon.bind(this)
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
               fecha: res.data.created_at,
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
        // console.log(this.state)
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
                console.log(err.response)
                this.setState({
                    loadAction: false,
                    errors: err.response.data.errors,
                    message: err.response.data.message
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
                // document.getElementById('np').focus();
            })
        }
    }
    showPass(){
        const newpass = document.getElementById('inp')
        if(newpass.type === "password"){
            newpass.type = "text";
            this.setState({eyeOpen: false})
        }else{
            newpass.type = "password";
            this.setState({eyeOpen: true})
        }
    }
    showPassCon(){
        const newpass = document.getElementById('inp2')
        if(newpass.type === "password"){
            newpass.type = "text";
            this.setState({eyeOpen2: false})
        }else{
            newpass.type = "password";
            this.setState({eyeOpen2: true})
        }
    }
    render(){
        const {message, load, loadAction, nombre, email, fecha, errors, eyeOpen, eyeOpen2} = this.state
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
                                            <td>{dateFormat(fecha, "d/m/yyyy, h:MM:ss TT")}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="buttons-block buttons-block-admin">
                                    <button onClick={this.handleOnClickEdit} className="button button-edit tooltip">
                                        <i className="fas fa-edit"></i>
                                        <span className="tooltiptext-right">Cambiar datos</span>
                                    </button>
                                    <button onClick={this.handleOnClickEditPass} className="button button-edit tooltip">
                                        <i className="fas fa-key"></i>
                                        <span className="tooltiptext-right">Cambiar contraseña</span>
                                    </button>
                                    <button id="btn-dlt" className="button button-canc tooltip"
                                    style={{display: 'none'}}
                                    onClick={this.handleOnCancel}>
                                        <i className="fas fa-plus tacha"></i>
                                        <span className="tooltiptext-right">Cancelar</span>
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
                                <Container>
                                    <Button className="button-form" variant="raised" color="primary" disabled={loadAction} >
                                        {
                                            (loadAction)
                                                ?
                                                <span><i className="fas fa-spinner fa-spin"></i> Aplicando cambios</span>
                                                :
                                                <span>Aplicar cambios</span>
                                        }
                                    </Button>

                                </Container>
                            </Form>
                        </div>
                        <div className="password-edit" id="pass-edit">
                            <Form onSubmit={this.handleOnSubmitPass} encType="multipart/form-data" autoComplete="off">
                                <legend>Cambia tu contraseña</legend>
                                {
                                    (message === "Las contraseña actual no coincide")
                                    ?
                                    <div className="errors-containor" id="errores">
                                         <div className="error-text">
                                             <span>{message}</span>
                                         </div>
                                    </div>
                                    :
                                    errorAlert(errors)
                                }
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
                                <Container className="form-group">
                                    <Input
                                        id="inp"
                                        className="form-input"
                                        label="Nueva contraseña"
                                        floatingLabel={true}
                                        name="passwordNew"
                                        required
                                        type="password"
                                        value={this.state.passwordNew}
                                        onChange={this.handleChange}
                                    />
                                    {
                                        (eyeOpen)
                                        ?
                                        <span onClick={this.showPass}><i className="fas fa-eye-slash"></i></span>
                                        :
                                        <span onClick={this.showPass}><i className="fas fa-eye"></i></span>
                                    }
                                </Container>
                                <Container className="form-group">
                                    <Input
                                        id="inp2"
                                        className="form-input"
                                        label="Confirma la nueva contraseña"
                                        floatingLabel={true}
                                        name="passwordConfirm"
                                        required
                                        type="password"
                                        value={this.state.passwordConfirm}
                                        onChange={this.handleChange}
                                    />
                                    {
                                        (eyeOpen2)
                                        ?
                                        <span onClick={this.showPassCon}><i className="fas fa-eye-slash"></i></span>
                                        :
                                        <span onClick={this.showPassCon}><i className="fas fa-eye"></i></span>
                                    }
                                </Container>
                                <Container>
                                    <Button className="button-form" variant="raised" color="primary" disabled={loadAction} >
                                        {
                                            (loadAction)
                                                ?
                                                <span><i className="fas fa-spinner fa-spin"></i> Aplicando cambios</span>
                                                :
                                                <span>Aplicar cambios</span>
                                        }
                                    </Button>

                                </Container>
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