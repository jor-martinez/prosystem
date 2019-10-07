import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SweetAlert from 'sweetalert2'
import Helmet from 'react-helmet'
import Form from 'muicss/lib/react/form'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'
import Textarea from 'muicss/lib/react/textarea'
import errorAlert from './errors'

class Mission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datos: [],
            load: false,
            loadAction: false,
            mision: '',
            vision: '',
            objetivo: '',
            errors: {}
        }
        this.getData = this.getData.bind(this)
        this.actualizar = this.actualizar.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }
    getData() {
        axios.get('/api/nosotros').then(res => {
            // console.log(res.data)
            this.setState({
                datos: res.data,
                load: true
            })
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount() {
        this.getData()
    }
    actualizar() {
        this.getData()
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

        if (this.state.datos.length === 1) {
            SweetAlert.fire(
                'Atención !',
                'No se pueden agregar mas registros',
                'warning'
            ).then(() => this.resetForm())
            this.setState({ loadAction: false })

        } else {
            const data = new FormData()
            data.append('mision', this.state.mision)
            data.append('vision', this.state.vision)
            data.append('objetivo', this.state.objetivo)

            axios({
                method: 'post',
                url: '/dev/nosotros/nueva',
                data
            }).then(res => {
                SweetAlert.fire(
                    'Correcto',
                    'La información de la misión, visión y objetivo se ha agregado correctamente',
                    'success'
                ).then(() => {
                    this.getData()
                    this.setState({
                        mision: '',
                        vision: '',
                        objetivo: ''
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
                    this.getData()
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
        const { datos, load, loadAction, errors } = this.state
        return (
            <div className="main-containor admin-process">
                <Helmet>
                    <title>Admin | Empresa</title>
                </Helmet>
                <section className="item-list">
                    <div className="refresh">
                        <button className="btn-refresh tooltip" onClick={this.actualizar}>
                            <i className="fas fa-sync-alt"></i>
                            <span className="tooltiptext-right">Actualizar lista</span>
                        </button>
                        {
                            (datos.length !== 0)
                            &&
                            <Link to={{ pathname: '/admin/mision-vision-objetivo-info/editar', state: { datos } }}
                                className="button button-edit tooltip">
                                <i className="fas fa-edit"></i>
                                <span className="tooltiptext-right">Editar</span>
                            </Link>
                        }
                    </div>
                    {
                        (load)
                            ?
                            (datos.length === 0)
                                ?
                                <strong className="no-data">No hay información en la base de datos. <br />
                                    Empieza agregando un registro.
                                </strong>
                                :
                                <div className="containor-full" key={datos[0].id}>
                                    <section className="item-containor process-containor">
                                        <div className="info-containor" >
                                            <div className="text-containor">
                                                <h2>Misión</h2>
                                                <p>{datos[0].mision}</p>
                                            </div>
                                        </div>
                                    </section>
                                    <section className="item-containor process-containor">
                                        <div className="info-containor" >
                                            <div className="text-containor">
                                                <h2>Visión</h2>
                                                <p>{datos[0].vision}</p>
                                            </div>
                                        </div>
                                    </section>
                                    <section className="item-containor process-containor">
                                        <div className="info-containor" >
                                            <div className="text-containor">
                                                <h2>Objetivo</h2>
                                                <p>{datos[0].objetivo}</p>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            
                            :
                            <span className="preloader pre-mision">Cargando información ...</span>
                    }
                </section>
                {
                    (datos.length < 1)
                    &&
                    <section id="add-product" className="item-add">
                        <Form onSubmit={this.handleOnSubmit} encType="multipart/form-data" autoComplete="off">
                            <legend>Agrega la misión, visión y el objetivo</legend>
                            {errorAlert(errors)}
                            <Textarea
                                rows="3"
                                id="mis"
                                className="form-input"
                                label="Mision"
                                floatingLabel={true}
                                name="mision"
                                onChange={this.handleChange}
                                value={this.state.mision}
                                required
                            />
                            <Textarea
                                rows="3"
                                id="vis"
                                className="form-input"
                                label="Vision"
                                floatingLabel={true}
                                name="vision"
                                onChange={this.handleChange}
                                value={this.state.vision}
                                required
                            />
                            <Textarea
                                rows="3"
                                id="obj"
                                className="form-input"
                                label="Objetivo"
                                floatingLabel={true}
                                name="objetivo"
                                onChange={this.handleChange}
                                value={this.state.objetivo}
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

export default Mission