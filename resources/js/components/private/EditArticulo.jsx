import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'
import { Editor } from '@tinymce/tinymce-react'
import errorAlert from './errors'

class Articulo extends Component{
   constructor(props){
      super(props)

      this.state = {
         slug: this.props.location.pathname.substring(16),
         articulo: [],
         id: '',
         titulo: '',
         cuerpo: '',
         encabezado: '',
         autor: '',
         img: null,
         loadAction: false,
         errors: {},
         load: false
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleOnDelete = this.handleOnDelete.bind(this)
      this.handleOnClickEdit = this.handleOnClickEdit.bind(this)
      this.handleOnUpdate = this.handleOnUpdate.bind(this)
      this.handleEditorChange = this.handleEditorChange.bind(this)
      this.getArticulo = this.getArticulo.bind(this)
   }
   componentDidMount(){
      this.getArticulo()
   }
   handleChange(e){
      const { name, value, type } = e.target;
      if ( type !== 'file') {
          this.setState({
              [name]: value
          })
      } else {
         this.setState({
            encabezado: e.target.files[0],
            img: URL.createObjectURL(event.target.files[0])
         })
         const pdrs = document.getElementById('file-upload').files[0].name
         document.getElementById('info').innerHTML = ' '+pdrs
      }
   }
   getArticulo(){
      axios.get('/dev/blog/'+this.state.slug).then(res=>{
         // console.log(res.data[0].autor)
         this.setState({
            id: res.data[0].id,
            titulo: res.data[0].titulo,
            cuerpo: res.data[0].cuerpo,
            encabezado: res.data[0].encabezado,
            autor: res.data[0].autor,
            load: true
         })
      }).catch(err=>{
         console.log(err)
      })
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
            axios.delete('/dev/blog/borrar/'+this.state.id).then((res)=>{
               //  console.log(res)
                SweetAlert.fire(
                    'Eliminado!',
                    'El elemento ha sido eliminado.',
                    'success'
                ).then(()=>{
                    window.location.href = '/admin/articulos'
                })
               
            }).catch(err=>{
               console.log(err)
               SweetAlert.fire(
                  'Oooops!',
                  'Algo salió mal.',
                  'error'
              )
            })
          }
       })
   }
   handleOnUpdate(e){
        e.preventDefault();

      //   console.log()

        this.setState({loadAction: true})

        const formData = new FormData();
        formData.append('titulo', this.state.titulo)
        formData.append('autor', this.state.autor)
        formData.append('encabezado', this.state.encabezado)
        formData.append('cuerpo', this.state.cuerpo)
        

      //   console.log(formData)

        axios({
            method: 'post',
            url: '/dev/blog/editar/'+this.state.id,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        }).then(res=>{
            this.setState({loadAction: false})
            // console.log(res)
            SweetAlert.fire(
            'Correcto',
            'El articulo se ha modificado correctamente!!',
            'success'
            ).then(()=>{
                window.location.href = '/admin/articulos'
            })
        }).catch(err=>{
            this.setState({
               loadAction: false,
               errors: err.response.data.errors
            })
            // console.log(err)
            console.log(err.response.data)
            SweetAlert.fire(
            'Error',
            'Algo salió mal',
            'error'
            )
        })
   }
   handleEditorChange(e){
      // console.log(e.target.getContent())
      this.setState({cuerpo: e.target.getContent()})
   }
   render(){
      const {loadAction,errors, titulo, encabezado, cuerpo, load} = this.state

      if(load){
         return(
            <div>
               <div className="return">
                  <Link className="button button-return tooltip return-btn" to="#" onClick={()=>window.history.back()}>
                     <i className="fas fa-reply"></i>
                     <span className="tooltiptext-right">Regresar</span>
                  </Link>
               </div>
               <div className="one-service-containor" id="serv-cont" >
                  <div className="img-block">
                     <img src={`../../images/blog/${encabezado}`} alt="Imagen del servicio" />
                  </div>
                  <div className="info-block">
                     <h1>{titulo}</h1>
                     <div dangerouslySetInnerHTML={{ __html: cuerpo }}></div>
                     <section className="buttons-info">
                        <button onClick={this.handleOnClickEdit} className="button button-edit tooltip">
                           <i className="fas fa-edit"></i>
                           <span className="tooltiptext-top">Editar</span>
                        </button>
                        <button onClick={this.handleOnDelete} className="button button-delete tooltip">
                           <i className="fas fa-trash-alt"></i>
                           <span className="tooltiptext-top">Eliminar</span>
                        </button>
                     </section>
                  </div>
               </div>
               <div className="one-service-edit" id="serv-edit">
                  <div className="return">
                     <Link className="button button-return tooltip return-btn" to="#" onClick={()=>window.history.back()}>
                        <i className="fas fa-reply"></i>
                        <span className="tooltiptext-right">Regresar</span>
                     </Link>
                  </div>
                  <Form onSubmit={this.handleOnUpdate} encType="multipart/form-data">
                     <legend>Editar Articulo</legend>
                     {errorAlert(errors)}
                     <Input
                        label="Titulo"
                        floatingLabel={true}
                        className="form-input"
                        value={titulo}
                        onChange={this.handleChange}
                        name="titulo"
                        required
                     />
                     <Editor
                        apiKey="otdi6um46x17oe387ukxlq2ksnt6fqdjyyjgsjbzsgst0mu7"
                        textareaName="cuerpo"
                        value={this.state.cuerpo}
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
                        <input id="file-upload" onChange={this.handleChange} type="file" accept="image/" name="encabezado" />
                     </Container>
                     <div id="show-img"><img id="img" src={this.state.img} /></div>
                     <Button variant="raised" color="primary" disabled={loadAction}>
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
            </div>
   
         )
      }
      else{
         return(
            <span className="preloader">Cargando información ...</span>
         )
      }
   }
}

export default Articulo