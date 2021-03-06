import React, {Component} from 'react'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'
import { Editor } from '@tinymce/tinymce-react'
import errorAlert from './errors'
import dateFormat from 'dateformat'

dateFormat.i18n = {
    dayNames: [
        'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab',
        'Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'
    ],
    monthNames: [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    timeNames: [
        'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
}
class AdminBlog extends Component{
    constructor(props){
        super(props)
        this.state={
            load: false,
            loadAction: false,
            posts: [],
            titulo: '',
            cuerpo: '',
            autor: localStorage.getItem('usuarioNombre'),
            encabezado: '',
            fechaCreado:'',
            errors: {}
        }
        this.getPosts = this.getPosts.bind(this)
        this.actualizar = this.actualizar.bind(this)
        this.onReset = this.onReset.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }
    getPosts(){
        axios.get('/api/blog').then(res=>{
            this.setState({
                posts: res.data,
                load: true
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    componentDidMount(){
        this.getPosts()
    }
    actualizar(){
        this.getPosts()
    }
    handleEditorChange(e) {
        // console.log(e.target.getContent())
        this.setState({ cuerpo: e.target.getContent() })
    }
    onReset() {
        document.getElementById('info').innerHTML = ' Subir imagen de portada'
        this.setState({ img: '' })
    }
    handleChange(e) {
        const { name, value, type } = e.target;
        if (type !== 'file') {
            this.setState({
                [name]: value
            })
        } else {
            this.setState({
                encabezado: e.target.files[0],
                img: URL.createObjectURL(event.target.files[0])
            })
            const pdrs = document.getElementById('file-upload').files[0].name
            document.getElementById('info').innerHTML = ' ' + pdrs
        }
    }
    handleOnSubmit(e){
        e.preventDefault()
        this.setState({loadAction:true})
        const data = new FormData()

        data.append('titulo', this.state.titulo)
        data.append('autor', this.state.autor)
        data.append('encabezado', this.state.encabezado)
        data.append('cuerpo', this.state.cuerpo)

        axios({
            method: 'post',
            url: '/dev/blog/nueva',
            data: data
        }).then(res=>{
            this.setState({loadAction: false})
            SweetAlert.fire(
                'Correcto',
                'El artículo se ha agregado correctamente',
                'success'
            ).then(() => {
                this.getPosts()
                this.onReset()
                this.setState({
                    titulo: '',
                    cuerpo: ''
                })
                document.getElementById('errores').style.display = 'none';
            })
        }).catch(err=>{
            this.setState({
                loadAction: false,
                errors: err.response.data.errors
            })
            console.log(err.response.data.errors)
            SweetAlert.fire(
                'Error',
                'Algo salió mal!',
                'error'
            )
            window.scrollTo(0,0)
        })
    }
    render(){
        const {load,loadAction,posts,errors} = this.state
        return(
            <div className="main-containor admin-blog">
                <Helmet>
                    <title>Admin | Blog</title>
                </Helmet>
                <section className="item-list">
                    <div className="refresh">
                        <button className="btn-refresh tooltip" onClick={this.actualizar}>
                            <i className="fas fa-sync-alt"></i>
                            <span className="tooltiptext-right">Actualizar lista</span>
                        </button>
                    </div>
                    {
                        (load)
                            ?
                            (posts.length === 0)
                                ?
                                <strong className="no-data">No hay información en la base de datos. <br />
                                    Empiece agregando un artículo.</strong>
                                :
                                (posts.map((post) => (
                                    <section key={post.id} className="item-containor blog-containor">
                                        <div className="img-containor">
                                            <Link to={{ pathname: '/admin/articulo/' + post.slug, state: { post } }}>
                                                <img src={`../images/blog/${post.encabezado}`} alt="imagen-blog" />
                                            </Link>
                                        </div>
                                        <div className="text-containor">
                                            <h2>{post.titulo}</h2>
                                            {/* <p dangerouslySetInnerHTML={{ __html: service.descripcion }}></p> */}
                                            <p> <strong>Autor:</strong>  {post.autor} <br /> <strong>Fecha de creación:</strong> {dateFormat(post.created_at, 'dddd, d "de" mmmm "de" yyyy, h:MM:ss TT')}</p>
                                            <div className="buttons-containor">
                                                <Link to={{ pathname: '/admin/articulo/' + post.slug }}
                                                    className="button button-show">Ver más</Link>
                                            </div>
                                        </div>
                                    </section>
                                ))).reverse()
                            :
                            <span className="preloader">Cargando información ...</span>
                    }
                </section>
                <section className="item-add">
                    <Form onSubmit={this.handleOnSubmit} encType="multipart/form-data" autoComplete="off">
                        <legend>Agregar un artículo</legend>
                        {errorAlert(errors)}
                        <Input
                            id="titulo"
                            className="form-input"
                            label="Titulo"
                            floatingLabel={true}
                            name="titulo"
                            onChange={this.handleChange}
                            value={this.state.titulo}
                        />
                        <Input
                            id="autor"
                            className="form-input"
                            label="Autor"
                            floatingLabel={true}
                            name="autor"
                            onChange={this.handleChange}
                            value={this.state.autor}
                            disabled
                        />
                        <Editor
                            apiKey="otdi6um46x17oe387ukxlq2ksnt6fqdjyyjgsjbzsgst0mu7"
                            id="editor-descripcion"
                            textareaName="cuerpo"
                            onChange={this.handleEditorChange}
                            value={this.state.cuerpo}
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
                            <label htmlFor="file-upload" className="subir">
                                <i className="fas fa-cloud-upload-alt"></i><span id="info"> Subir imagen de portada</span>
                            </label>
                            <input id="file-upload" onChange={this.handleChange} type="file" accept="image/" name="encabezado" />
                        </Container>
                        <div id="show-img"><img id="img" src={this.state.img} /></div>
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
        )
    }
}
export default AdminBlog