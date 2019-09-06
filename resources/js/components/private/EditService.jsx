import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'
import { Editor } from '@tinymce/tinymce-react'

class Service extends Component{
   constructor(props){
      super(props)

      this.state = {
         id: this.props.location.state.service.id,
         nombre: this.props.location.state.service.nombre,
         descripcion: this.props.location.state.service.descripcion,
         slug: this.props.location.state.service.slug,
         Imagen: this.props.location.state.service.Imagen,
         img: null,
         loadAction: false
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleOnDelete = this.handleOnDelete.bind(this)
      this.handleOnClickEdit = this.handleOnClickEdit.bind(this)
      this.handleOnUpdate = this.handleOnUpdate.bind(this)
      this.handleEditorChange = this.handleEditorChange.bind(this)
   }

   handleChange(e){
      const { name, value, type } = e.target;
      if ( type !== 'file') {
          this.setState({
              [name]: value
          })
      } else {
         this.setState({
            Imagen: e.target.files[0],
            img: URL.createObjectURL(event.target.files[0])
         })
         const pdrs = document.getElementById('file-upload').files[0].name
         document.getElementById('info').innerHTML = ' '+pdrs
      }
   }
   handleOnClickEdit(){
      document.getElementById('serv-edit').style.display = 'block';
      document.getElementById('serv-cont').style.display = 'none';
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
            axios.delete('/dev/servicios/borrar/'+this.state.id).then((res)=>{
               console.log(res)
            }).catch(err=>{
               console.log(err)
            })

            SweetAlert.fire(
                  'Eliminado!',
                  'El elemento ha sido eliminado.',
                  'success'
               ).then(()=>{
                  window.location.href = '/admin/servicios'
               })
          }
       })
   }

   handleOnUpdate(e){
      e.preventDefault();

      console.log()

      this.setState({loadAction: true})

      const formData = new FormData();
      formData.append('nombre', this.state.nombre);
      formData.append('descripcion', this.state.descripcion);
      formData.append('Imagen', this.state.Imagen);
      

      console.log(formData)

      axios({
         method: 'post',
         url: '/dev/servicios/editar/'+this.state.id,
         data: formData,
         config: {headers: {'Content-Type': 'multipart/form-data'}}
      }).then(res=>{
         this.setState({loadAction: false})
         console.log(res)
         SweetAlert.fire(
            'Correcto',
            'El servicio se ha modificado correctamente!!',
            'success'
         ).then(()=>{
            window.location.href = '/admin/servicios'
         })
      }).catch(err=>{
         this.setState({loadAction: false})
         console.log(err)
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
   render(){
      console.log(this.state)
      const {loadAction} = this.state
      return(
         <div>
            <div className="one-service-containor" id="serv-cont" >
               <div className="img-block">
                  <img src={`../../images/servicios/${this.state.Imagen}`} alt="Imagen del servicio" />
               </div>
               <div className="info-block">
                  <h1>{this.state.nombre}</h1>
                  <div dangerouslySetInnerHTML={{ __html: this.state.descripcion }}></div>
                  <div className="buttons-block">
                     <button onClick={this.handleOnClickEdit} className="button button-edit tooltip">
                        <i className="fas fa-edit"></i>
                        <span className="tooltiptext">Editar</span>
                     </button>
                     <button onClick={this.handleOnDelete} className="button button-delete tooltip">
                        <i className="fas fa-trash-alt"></i>
                        <span className="tooltiptext">Eliminar</span>
                     </button>
                  </div>
               </div>
            </div>
            <div className="one-service-edit" id="serv-edit">
               <Form onSubmit={this.handleOnUpdate} encType="multipart/form-data">
                  <legend>Editar servicio</legend>
                  <Input
                     label="Nombre"
                     floatingLabel={true}
                     className="form-input"
                     value={this.state.nombre}
                     onChange={this.handleChange}
                     name="nombre"
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
                  <Container>
                     <label htmlFor="file-upload" className="subir">
                        <i className="fas fa-cloud-upload-alt"></i><span id="info"> Subir imagen</span> 
                     </label>
                     <input id="file-upload" onChange={this.handleChange} type="file" accept="image/" name="Imagen" />
                  </Container>
                  <div id="show-img"><img id="img" src={this.state.img} /></div>
                  <Button variant="raised" color="primary" disabled={loadAction}>
                     {
                        (loadAction)
                        ?
                           <span><i className="fas fa-spinner fa-spin"></i> Editando</span>
                        :
                           <span>Editar</span>
                     }
                  </Button>
                  <Link className="button button-cancel" to="/admin/servicios">Cancelar</Link>
               </Form>
            </div>
         </div>

      )
   }
}

export default Service