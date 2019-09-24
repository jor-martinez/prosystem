import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import SweetAlert from 'sweetalert2'
import Helmet from 'react-helmet'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import errorAlert from './errors'

class AdminProceso extends Component{
    constructor(props){
        super(props)
        this.state={
            procesos: [],
            load: false,
            loadAction: false,
            proceso: '',
            descripcion: '',
            errors: {}
        }
        this.getProcesos = this.getProcesos.bind(this)
        this.actualizar = this.actualizar.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }
    getProcesos(){
        axios.get('/api/proceso',).then(res=>{
            console.log(res.data)
            this.setState({
                procesos: res.data,
                load: true
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    componentDidMount(){
        this.getProcesos()
    }
    actualizar(){
        this.getProcesos()
    }
    handleChange(e) {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })
    }
    handleOnSubmit(e){
        e.preventDefault()
        this.setState({loadAction: true})

        if(this.state.procesos.length === 3){
            SweetAlert.fire(
                'Atención !',
                'No se pueden agregar mas procesos',
                'warning'
            ).then(() => this.resetForm())
            this.setState({ loadAction: false })
            
        }else{
            const data = new FormData()
            data.append('proceso', this.state.proceso)
            data.append('descripcion', this.state.descripcion)

            axios({
                method: 'post',
                url: '/dev/proceso/nueva',
                data
            }).then(res=>{
                SweetAlert.fire(
                    'Correcto',
                    'El proceso se ha agregado correctamente',
                    'success'
                ).then(() => {
                    this.getProcesos()
                    this.setState({
                        proceso: '',
                        descripcion: ''
                    })
                    document.getElementById('errores').style.display = 'none';
                })
                this.setState({ loadAction: false })
            }).catch(err=>{
                console.log(err.response.data.errors)
                SweetAlert.fire(
                    'Oooops!',
                    'Algo salió mal',
                    'error'
                ).then(() => {
                    this.getProcesos()
                })
                this.setState({
                    loadAction: false,
                    errors: err.response.data.errors
                })
                window.scrollTo(0,0)
            })
        }
    }
    render(){
        const {procesos,load,loadAction,errors} = this.state
        return(
            <div className="main-containor admin-process">
                <Helmet>
                    <title>Admin | Proceso</title>
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
                            (procesos.length === 0)
                                ?
                                <strong className="no-data">No hay información en la base de datos. <br/>
                                Empieza agregando un proceso, solo puedes agregar 3.
                                </strong>
                                :
                                (procesos.map((proceso) => (
                                    <section key={proceso.id} className="item-containor process-containor">
                                        <div className="info-containor">
                                            <div className="text-containor">
                                                <h2>{proceso.proceso}</h2>
                                                <div className="info-butt-containor">
                                                    <p>{proceso.descripcion}</p>
                                                    <div className="buttons-containor">
                                                        <Link to={{ pathname: '/admin/proceso/editar', state: { proceso } }}
                                                        className="button button-edit tooltip button-edit-res">
                                                            <i className="fas fa-edit"></i>
                                                            <span className="tooltiptext">Editar</span>
                                                        </Link>
                                                    </div>
                                                </div>
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
                        <legend>Agregar un proceso</legend>
                        {errorAlert(errors)}
                        <Input
                            id="proceso"
                            className="form-input"
                            label="Nombre"
                            floatingLabel={true}
                            name="proceso"
                            onChange={this.handleChange}
                            value={this.state.proceso}
                            required
                        />
                        <Input
                            id="descripcion"
                            className="form-input"
                            label="Descripción"
                            floatingLabel={true}
                            name="descripcion"
                            onChange={this.handleChange}
                            value={this.state.descripcion}
                            required
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

export default AdminProceso