import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import Container from 'muicss/lib/react/container'
import errorAlert from './errors'
import { Editor } from '@tinymce/tinymce-react'

class EditProducto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.location.state.producto.id,
            titulo: this.props.location.state.producto.titulo,
            descripcion: this.props.location.state.producto.descripcion,
            link: this.props.location.state.producto.link,
            imagen: this.props.location.state.producto.imagen,
            img: null,
            loadAction: false,
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleOnUpdate = this.handleOnUpdate.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
        this.handleOnClickEdit = this.handleOnClickEdit.bind(this)
        this.handleOnDelete = this.handleOnDelete.bind(this)
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
    handleOnDelete(){
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
                axios.delete('/dev/productos/borrar/'+this.state.id).then((res)=>{
                    console.log(res)
                    SweetAlert.fire(
                        'Eliminado!',
                        'El producto ha sido eliminado.',
                        'success'
                        ).then(()=>{
                            window.location.href = '/admin/productos'
                        })
                }).catch(err=>{
                    console.log(err)
                })
            }
        })
    }
    handleOnUpdate(e) {
        e.preventDefault()
        console.log(this.state)
        this.setState({ loadAction: true })
        const data = new FormData()

        data.append('titulo', this.state.titulo)
        data.append('descripcion', this.state.descripcion)
        data.append('link', this.state.link)

        axios({
            method: 'post',
            url: '/dev/productos/editar/' + this.state.id,
            data
        }).then(res => {
            this.setState({ loadAction: false })
            SweetAlert.fire(
                'Correcto',
                'El producto se modificó exitosamente',
                'success'
            ).then(() => {
                window.location.href = '/admin/productos'
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
    handleEditorChange(e){
        console.log(e.target.getContent())
        this.setState({descripcion: e.target.getContent()})
    }
    handleOnClickEdit(){
        document.getElementById('serv-edit').style.display = 'block';
        document.getElementById('serv-cont').style.display = 'none';
    }
    render() {
        const { loadAction, errors } = this.state
        return (
            <div>
                <div className="one-service-containor" id="serv-cont" >
                <div className="img-block">
                    <img src={`../../images/productos/${this.state.imagen}`} alt="Imagen del servicio" />
                </div>
                <div className="info-block">
                    <h1>{this.state.nombre}</h1>
                    <div className="content-service" dangerouslySetInnerHTML={{ __html: this.state.descripcion }}></div>
                    <div className="buttons-block">
                        <button onClick={this.handleOnClickEdit} className="button button-edit edit-btn tooltip">
                            <i className="fas fa-edit"></i>
                            <span className="tooltiptext tooltiptext-left">Editar</span>
                        </button>
                        <button onClick={this.handleOnDelete} className="button button-delete delete-btn tooltip">
                            <i className="fas fa-trash-alt"></i>
                            <span className="tooltiptext tooltiptext-left">Eliminar</span>
                        </button>
                        <Link className="button button-return tooltip return-btn" to="/admin/productos">
                            <i className="fas fa-reply"></i>
                            <span className="tooltiptext tooltiptext-left">Regresar</span>
                        </Link>
                    </div>
                </div>
                </div>
                <div className="one-process-edit" id="serv-edit">
                    <Form onSubmit={this.handleOnUpdate} encType="multipart/form-data" autoComplete="off">
                        <legend>Editar Producto</legend>
                        {errorAlert(errors)}
                        <Input
                            className="form-input"
                            label="Titulo"
                            floatingLabel={true}
                            name="titulo"
                            value={this.state.titulo}
                            onChange={this.handleChange}
                            required
                        />
                        <Editor
                            apiKey="otdi6um46x17oe387ukxlq2ksnt6fqdjyyjgsjbzsgst0mu7"
                            textareaName="descripcion"
                            initialValue={this.state.descripcion}
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
                        <Input
                            className="form-input"
                            label="Link (opcional)"
                            floatingLabel={true}
                            name="link"
                            value={this.state.link}
                            onChange={this.handleChange}
                        />
                        <Container>
                            <label htmlFor="file-upload" className="subir">
                                <i className="fas fa-cloud-upload-alt"></i><span id="info"> Elegir otra imagen (opcional)</span> 
                            </label>
                            <input id="file-upload" onChange={this.handleChange} type="file" accept="image/" name="imagen" required/>
                        </Container>
                        <div id="show-img"><img id="img" src={this.state.img} /></div>
                        <Button variant="raised" color="primary" disabled={loadAction} >
                            {
                                (loadAction)
                                    ?
                                    <span><i className="fas fa-spinner fa-spin"></i> Aplicando cambios</span>
                                    :
                                    <span>Aplicar cambios</span>
                            }
                        </Button>
                        <Link className="button button-cancel" to="/admin/productos">Cancelar</Link>
                    </Form>
                </div>
            </div>
        )
    }
}

export default EditProducto