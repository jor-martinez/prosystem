import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SweetAlert from 'sweetalert2'
import Helmet from 'react-helmet'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import Container from 'muicss/lib/react/container'
import Textarea from 'muicss/lib/react/textarea'
import { Editor } from '@tinymce/tinymce-react'
import errorAlert from './errors'

class Mission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [],
            load: false,
            loadAction: false,
            historia: '',
            errors: {}
        }
        this.getHistory = this.getHistory.bind(this)
        this.actualizar = this.actualizar.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
    }
    getHistory() {
        axios.get('/api/historia').then(res => {
            // console.log(res.data)
            this.setState({
                history: res.data,
                load: true
            })
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount() {
        this.getHistory()
    }
    actualizar() {
        this.getHistory()
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

        if (this.state.history.length === 1) {
            SweetAlert.fire(
                'Atención !',
                'No se pueden agregar mas registros',
                'warning'
            ).then(() => this.resetForm())
            this.setState({ loadAction: false })

        } else {
            const data = new FormData()
            data.append('historia', this.state.historia)

            axios({
                method: 'post',
                url: '/dev/historia/nueva',
                data
            }).then(res => {
                SweetAlert.fire(
                    'Correcto',
                    'La historia se ha agregado correctamente',
                    'success'
                ).then(() => {
                    this.getHistory()
                    this.setState({historia: ''})
                    document.getElementById('errores').style.display = 'none';
                })
                this.setState({ loadAction: false })
            }).catch(err => {
                console.log(err.response.data.errors)
                SweetAlert.fire(
                    'Oooops!',
                    'Algo salió mal',
                    'error'
                ).then(() => {
                    this.getHistory()
                })
                this.setState({
                    loadAction: false,
                    errors: err.response.data.errors
                })
                window.scrollTo(0,0)
            })
        }
    }
    handleEditorChange(e) {
        // console.log(e.target.getContent())
        this.setState({ historia: e.target.getContent() })
    }
    render() {
        const { history, load, loadAction, errors } = this.state
        return (
            <div className="main-containor admin-history">
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
                            (history.length !== 0)
                            &&
                            <Link to={{ pathname: '/admin/historia-info/editar', state: { history } }}
                                className="button button-edit tooltip">
                                <i className="fas fa-edit"></i>
                                <span className="tooltiptext-right">Editar</span>
                            </Link>
                        }
                    </div>
                    {
                        (load)
                            ?
                            (history.length === 0)
                                ?
                                <strong className="no-data">No hay información en la base de datos. <br />
                                    Empieza agregando un registro.
                                </strong>
                                :
                                <div className="containor-full" key={history[0].id}>
                                    <section className="item-containor history-containor">
                                        <div className="info-containor" >
                                            <div className="text-containor">
                                                <h2>Historia</h2>
                                                <div className="inner-info" dangerouslySetInnerHTML={{ __html: history[0].historia }}></div>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                            :
                            <span className="preloader pre-mision">Cargando información ...</span>
                    }
                </section>
                {
                    (history.length < 1)
                    &&
                    <section id="add-product" className="item-add">
                        <Form onSubmit={this.handleOnSubmit} encType="multipart/form-data" autoComplete="off">
                            <legend>Agrega la historia</legend>
                            {errorAlert(errors)}
                            <Editor
                                apiKey="otdi6um46x17oe387ukxlq2ksnt6fqdjyyjgsjbzsgst0mu7"
                                id="editor-descripcion"
                                textareaName="historia"
                                onChange={this.handleEditorChange}
                                value={this.state.historia}
                                init={{
                                    height: 400,
                                    plugins: 'link image code lists advlist',
                                    toolbar: 'undo redo | formatselect fontsizeselect | bold italic | alignleft aligncenter alignright | numlist bullist | image link ',
                                    image_title: true,

                                    /* enable automatic uploads of images represented by blob or data URIs*/
                                    automatic_uploads: true,
                                    file_picker_types: 'image',

                                    /* and here's our custom image picker*/
                                    file_picker_callback: function (cb, value, meta) {
                                        var input = document.createElement('input');
                                        input.setAttribute('type', 'file');
                                        input.setAttribute('accept', 'image/*');

                                        input.onchange = function () {
                                            var file = this.files[0];

                                            var reader = new FileReader();
                                            reader.onload = function () {
                                                var id = 'blobid' + (new Date()).getTime();
                                                var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                                                var base64 = reader.result.split(',')[1];
                                                var blobInfo = blobCache.create(id, file, base64);
                                                blobCache.add(blobInfo);

                                                /* call the callback and populate the Title field with the file name */
                                                cb(blobInfo.blobUri(), { title: file.name });
                                            };
                                            reader.readAsDataURL(file);
                                        };

                                        input.click();
                                    }
                                }}
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