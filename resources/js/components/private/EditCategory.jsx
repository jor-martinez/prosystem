import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import errorAlert from './errors'
import { Editor } from '@tinymce/tinymce-react'

class EditCategory extends Component{
    constructor(props){
        super(props)
        this.state={
            id: this.props.location.state.cat.id,
            titulo: this.props.location.state.cat.titulo,
            descripcion: this.props.location.state.cat.descripcion,
            id_serv: this.props.location.state.cat.id_serv,
            loadAction: false,
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleOnUpdate = this.handleOnUpdate.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
    }
    handleChange(e){
        const {name, value} = e.target

        this.setState({
            [name]: value
        })
    }
    handleEditorChange(e){
        this.setState({descripcion: e.target.getContent()})
    }
    handleOnUpdate(e){
        e.preventDefault()
        this.setState({ loadAction: true })
        const data = new FormData()

        data.append('titulo', this.state.titulo)
        data.append('descripcion', this.state.descripcion)

        axios({
            method: 'post',
            url: '/dev/categoria/editar/'+this.state.id,
            data
        }).then(res=>{
            this.setState({ loadAction: false })
            SweetAlert.fire(
                'Correcto',
                'Se editaron los datos exitosamente',
                'success'
            ).then(() => {
                window.location.href = '/admin/servicios'
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
        const {loadAction, errors} = this.state
        // console.log(this.state)
        return(
            <div className="one-process-edit">
                <div className="return">
                    <a className="button button-return tooltip return-btn" href="#" onClick={()=>window.history.back()}>
                        <i className="fas fa-reply"></i>
                        <span className="tooltiptext-right">Regresar</span>
                    </a>
                </div>
                <Form onSubmit={this.handleOnUpdate} encType="multipart/form-data" autoComplete="off">
                    <legend>Editar categoría</legend>
                    {errorAlert(errors)}
                    <Input
                        className="form-input"
                        label="Titulo de la categoría"
                        floatingLabel={true}
                        name="titulo"
                        value={this.state.titulo}
                        onChange={this.handleChange}
                    />
                    <Editor
                        apiKey="otdi6um46x17oe387ukxlq2ksnt6fqdjyyjgsjbzsgst0mu7"
                        textareaName="descripcion"
                        onChange={this.handleEditorChange}
                        value={this.state.descripcion}
                        init={{
                            height: 300,
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
        )
    }
}
export default EditCategory