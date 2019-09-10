import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import Textarea from 'muicss/lib/react/textarea'
import { Editor } from '@tinymce/tinymce-react'

class EditHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.location.state.history[0].id,
            historia: this.props.location.state.history[0].historia
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleOnUpdate = this.handleOnUpdate.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    handleOnUpdate(e) {
        e.preventDefault()
        this.setState({ loadAction: true })
        const data = new FormData()

        data.append('historia', this.state.historia)

        axios({
            method: 'post',
            url: '/dev/historia/editar/' + this.state.id,
            data
        }).then(res => {
            this.setState({ loadAction: false })
            SweetAlert.fire(
                'Correcto',
                'Se editaron los datos exitosamente',
                'success'
            ).then(() => {
                window.location.href = '/admin/historia'
            })
        }).catch(err => {
            this.setState({ loadAction: false })
            console.log(err.response.data)
            SweetAlert.fire(
                'Error',
                'Algo salió mal',
                'error'
            )
        })
    }
    handleEditorChange(e) {
        console.log(e.target.getContent())
        this.setState({ historia: e.target.getContent() })
    }
    render() {
        const { loadAction } = this.state
        return (
            <div className="one-process-edit one-history-edit">
                <Form onSubmit={this.handleOnUpdate} encType="multipart/form-data" autoComplete="off">
                    <legend>Editar historia</legend>
                    <Editor
                        apiKey="otdi6um46x17oe387ukxlq2ksnt6fqdjyyjgsjbzsgst0mu7"
                        id="editor-descripcion"
                        textareaName="historia"
                        initialValue={this.state.historia}
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
                    <Button variant="raised" color="primary" disabled={loadAction} >
                        {
                            (loadAction)
                                ?
                                <span><i className="fas fa-spinner fa-spin"></i> Editando</span>
                                :
                                <span>Editar</span>
                        }
                    </Button>
                    <Link className="button button-cancel" to="/admin/historia">Cancelar</Link>
                </Form>
            </div>
        )
    }
}

export default EditHistory