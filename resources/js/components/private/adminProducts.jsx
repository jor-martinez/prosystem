import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SweetAlert from 'sweetalert2'
import Helmet from 'react-helmet'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import Container from 'muicss/lib/react/container'
import errorAlert from './errors'
import { Editor } from '@tinymce/tinymce-react'

class AdminProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productos: [],
            load: false,
            loadAction: false,
            titulo: '',
            descripcion: '',
            link: '',
            errrors: {},
            imagen:'',
            img: null
        }
        this.getProductos = this.getProductos.bind(this)
        this.actualizar = this.actualizar.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
        this.onReset = this.onReset.bind(this)
    }
    getProductos() {
        axios.get('/api/productos').then(res => {
            // console.log(res.data)
            this.setState({
                productos: res.data,
                load: true
            })
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount() {
        this.getProductos()
    }
    actualizar() {
        this.getPoductos()
    }
    handleChange(e){
        const { name, value, type } = e.target;
        if ( type !== 'file') {
            this.setState({
                [name]: value
            })
        } else {
           this.setState({
              imagen: e.target.files[0],
              img: URL.createObjectURL(event.target.files[0])
           })
           const pdrs = document.getElementById('file-upload').files[0].name
           document.getElementById('info').innerHTML = ' '+pdrs
        }
     }
    handleOnSubmit(e) {
        e.preventDefault()
        this.setState({ loadAction: true })

        if (this.state.productos.length === 4) {
            SweetAlert.fire(
                'Atención !',
                'No se pueden agregar mas productos',
                'warning'
            ).then(() => this.setState({
                titulo: '',
                descripcion: '',
                link: ''
            }))
            this.setState({ loadAction: false })

        } else {
            const data = new FormData()
            data.append('titulo', this.state.titulo)
            data.append('descripcion', this.state.descripcion)
            data.append('imagen', this.state.imagen)
            data.append('link', this.state.link)

            axios({
                method: 'post',
                url: '/dev/productos/nueva',
                data
            }).then(res => {
                SweetAlert.fire(
                    'Correcto',
                    'El producto se ha agregado correctamente',
                    'success'
                ).then(() => {
                    this.getProductos()
                    this.onReset()
                    this.setState({
                        titulo: '',
                        descripcion: '',
                        imagen: ''
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
                    this.getProductos()
                })
                this.setState({ 
                    loadAction: false,
                    errors: err.response.data.errors
                })
                window.scrollTo(0,0)
            })
        }
    }
    handleEditorChange(e){
        // console.log(e.target.getContent())
        this.setState({descripcion: e.target.getContent()})
    }
    onReset(){
        document.getElementById('info').innerHTML = ' Subir imagen'
        this.setState({ img: '' })
    }
    render() {
        const { productos, load, loadAction, errors } = this.state
        return (
            <div className="main-containor admin-process">
                <Helmet>
                    <title>Admin | Productos</title>
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
                            (productos.length === 0)
                                ?
                                <strong className="no-data">No hay información en la base de datos. <br />
                                    Empieza agregando un producto, solo puedes agregar 4.
                                </strong>
                                :
                                (productos.map((producto) => (
                                    <section key={producto.id} className="item-containor process-containor product-containor">
                                        <div className="info-containor">
                                            <div className="text-containor">
                                                <h2>{producto.titulo}</h2>
                                                <div className="info-butt-containor">
                                                    <div className="inner-info" dangerouslySetInnerHTML={{ __html: producto.descripcion}}></div>
                                                    <div className="buttons-containor">
                                                        <Link to={{ pathname: '/admin/producto/'+producto.slug, state: { producto } }}
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
                {
                    (productos.length < 4)
                    &&
                    <section id="add-product" className="item-add">
                        <Form onSubmit={this.handleOnSubmit} encType="multipart/form-data" autoComplete="off">
                            <legend>Agregar una producto</legend>
                            {errorAlert(errors)}
                            <Input
                                id="titulo"
                                className="form-input"
                                label="Nombre"
                                floatingLabel={true}
                                name="titulo"
                                onChange={this.handleChange}
                                value={this.state.titulo}
                                required
                            />
                            <Editor
                                apiKey="otdi6um46x17oe387ukxlq2ksnt6fqdjyyjgsjbzsgst0mu7"
                                textareaName="descripcion"
                                value={this.state.descripcion}
                                onChange={this.handleEditorChange}
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
                            {/* <Input
                                id="enlace"
                                className="form-input"
                                label="Link (opcional)"
                                floatingLabel={true}
                                name="link"
                                type="url"
                                onChange={this.handleChange}
                                value={this.state.link}
                            /> */}
                            <Container>
                                <label htmlFor="file-upload" className="subir">
                                    <i className="fas fa-cloud-upload-alt"></i><span id="info"> Imagen de portada</span> 
                                </label>
                                <input id="file-upload" onChange={this.handleChange} type="file" accept="image/" name="imagen" required/>
                            </Container>
                            <div id="show-img"><img id="img" src={this.state.img} /></div>
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

                }
            </div>
        )
    }
}

export default AdminProducts