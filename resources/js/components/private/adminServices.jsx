import React, {Component} from 'react'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'
import { Editor } from '@tinymce/tinymce-react';

class AdminServices extends Component{
   constructor(props){
      super(props)

      this.state = {
         loadAction: false,
         load: false,
         services: [],
         nombre: '',
         descripcion: '',
         Imagen: '',
         img: null
      }
      this.handleOnSubmit = this.handleOnSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.getServices = this.getServices.bind(this)
      this.actualizar = this.actualizar.bind(this)
      this.handleEditorChange = this.handleEditorChange.bind(this)
      this.onReset = this.onReset.bind(this)
      this.resetForm  =this.resetForm.bind(this)
   }

   actualizar(){
      this.getServices()
   }

   getServices(){
      axios.get('/api/servicios').then(result=>{
         this.setState({
            services: result.data,
            load: true
         })
         console.log(this.state)
      }).catch(err=>{
         console.log(err)
      })
   }

   componentDidMount(){
      this.getServices()
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

   handleOnSubmit(e){
      e.preventDefault()

      this.setState({loadAction: true})

      const data = new FormData();
      data.append('nombre', this.state.nombre);
      data.append('descripcion', this.state.descripcion);
      data.append('Imagen', this.state.Imagen);
      
      console.log(data)
      axios.post('/dev/servicios/nueva', data)
         .then(res=>{
            this.setState({loadAction: false})
            console.log('servicio creado exitosamente');
            SweetAlert.fire(
               'Correcto',
               'El servicio se ha agregado correctamente',
               'success'
            ).then(()=>{
               this.getServices()
               this.resetForm()
               this.onReset()
            })
            console.log(res);
         }).catch(err=>{
            this.setState({loadAction: false})
            console.log(err.response.data)
            const errs = err.response.data.errors;
            this.setState({errores: errs})
            SweetAlert.fire(
               'Error',
               'Algo salió mal!',
               'error'
            )
         })

      // console.log(this.state)
   }
   handleEditorChange(e){
      console.log(e.target.getContent())
      this.setState({descripcion: e.target.getContent()})
   }
   onReset() {
      document.getElementById('info').innerHTML = ' Subir imagen de portada'
      this.setState({ img: '' })
   }
   resetForm(){
      document.getElementById('nombre').value = '';
      document.getElementById('editor-descripcion').value = '';
      document.getElementById('file-upload').value = '';
   }
   render(){
      const {services,load,loadAction} = this.state
      return(
         <div className="main-containor admin-services">
            <Helmet>
               <title>Admin | Servicios</title>
            </Helmet>
            <section className="item-list">
               <div className="refresh">
                  <button className="btn-refresh tooltip" onClick={this.actualizar}>
                     <i class="fas fa-sync-alt"></i>
                     <span class="tooltiptext">Actualizar lista</span>
                  </button>
               </div>
               {
                  (load)
                  ?
                     (services.length === 0)
                     ?  
                        <strong className="no-data">No hay información en la base de datos. <br/>
                        Empiece agregando un servicio.</strong>
                     :
                        (services.map((service)=>(
                           <section key={service.id} className="item-containor">
                              <div className="img-containor">
                                 <img src={`../images/servicios/${service.Imagen}`} alt="imagen-servicio"/>
                              </div>
                              <div className="text-containor">
                                 <h2>{service.nombre}</h2>
                                 {/* <p dangerouslySetInnerHTML={{ __html: service.descripcion }}></p> */}
                              </div>
                              <div className="buttons-containor">
                                 <Link to={{ pathname: '/admin/servicio/'+service.slug, state : { service: service } }}
                                 className="button button-show">Ver más</Link>
                              </div>
                           </section>
                        )))
                  :
                     <span className="preloader">Cargando información ...</span>
               }
            </section>
            <section className="item-add">
               <Form onSubmit={this.handleOnSubmit} encType="multipart/form-data" autoComplete="off">
                  <legend>Agregar un servicio</legend>
                  <Input
                     id="nombre"
                     className="form-input"
                     label="Nombre"
                     floatingLabel={true}
                     name="nombre"
                     onChange={this.handleChange}
                  />
                  <Editor
                     apiKey="otdi6um46x17oe387ukxlq2ksnt6fqdjyyjgsjbzsgst0mu7"
                     id="editor-descripcion"
                     textareaName="descripcion"
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
                        <i className="fas fa-cloud-upload-alt"></i><span id="info"> Subir imagen de portada</span> 
                     </label>
                     <input id="file-upload" onChange={this.handleChange} type="file" accept="image/" name="Imagen" />
                  </Container>
                  <div id="show-img"><img id="img" src={this.state.img} /></div>
                  <Button variant="raised" color="primary" disabled={loadAction}>
                     {
                        (loadAction)
                        ?
                           <span><i className="fas fa-spinner fa-spin"></i> Agregando</span>
                        :
                           <span>Agregar</span>
                     }
                  </Button>
                  <Button variant="flat" type="reset" onClick={this.onReset} >Limpiar Campos</Button>
               </Form>
            </section>
         </div>
      )
   }
}

export default AdminServices