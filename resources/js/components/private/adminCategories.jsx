import React, {Component} from 'react'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'
import { Editor } from '@tinymce/tinymce-react'
import errorAlert from './errors'
import Option from 'muicss/lib/react/option'
import Select from 'muicss/lib/react/select'

class AdminCategories extends Component{
   constructor(props){
      super(props)

      this.state = {
         loadAction: false,
         load: false,
         services: [],
         nombre: '',
         descripciones: [],
         errors: {},
         categorias: [],
         idServicio: ''
      }
      this.handleOnSubmit = this.handleOnSubmit.bind(this)
      this.getServices = this.getServices.bind(this)
      this.handleEditorChange = this.handleEditorChange.bind(this)
      this.addCategory = this.addCategory.bind(this)
      this.changeInput = this.changeInput.bind(this)
      this.selectChange = this.selectChange.bind(this)
      this.removeCategory = this.removeCategory.bind(this)
   }


   getServices(){
      axios.get('/api/servicios').then(result=>{
         this.setState({
            services: result.data,
            load: true
         })
         // console.log(this.state)
      }).catch(err=>{
         console.log(err)
      })
   }
   componentDidMount(){
      this.getServices()
   }
   handleOnSubmit(e){
      e.preventDefault()
      const contCategories = this.state.categorias.length

      // console.log(contCategories)

      for(let i=0; i<contCategories; i++){
         const data = new FormData()
         data.append('titulo', this.state.categorias[i])
         data.append('descripcion', this.state.descripciones[i])
         data.append('id', this.state.idServicio)
         axios({
            method: 'post',
            url: '/dev/categoria/nueva',
            data
         }).then(res=>{
            console.log(res)
         }).catch(err=>{
            console.log(err)
         })
      }

      // this.setState({loadAction: true})

      // const data = new FormData();
      // data.append('nombre', this.state.nombre);
      // data.append('descripcion', this.state.descripcion);
      // data.append('Imagen', this.state.Imagen);
      
      // console.log(data)
      // axios.post('/dev/servicios/nueva', data)
      //    .then(res=>{
      //       this.setState({loadAction: false})
      //       console.log('servicio creado exitosamente');
      //       SweetAlert.fire(
      //          'Correcto',
      //          'El servicio se ha agregado correctamente',
      //          'success'
      //       ).then(()=>{
      //          this.getServices()
      //          this.onReset()
      //          this.setState({
      //             nombre: '',
      //             descripcion: '',
      //             Imagen: '',
      //             img: null
      //          })
      //          document.getElementById('errores').style.display = 'none';
      //       })
      //       // console.log(res);
      //    }).catch(err=>{
      //       this.setState({loadAction: false})
      //       SweetAlert.fire(
      //          'Error',
      //          'Algo salió mal!',
      //          'error'
      //       )
      //       console.log(err.response.data.errors)
      //       this.setState({errors: err.response.data.errors})
      //       window.scrollTo(0,0)
      //    })
   }
   handleEditorChange(e, index){
      this.state.descripciones[index] = e.target.getContent();
      this.setState({descripciones: this.state.descripciones})
      // console.log(e.target.getContent())
      // this.setState({descripcion: e.target.getContent()})
   }
   changeInput(e, index){
      this.state.categorias[index] = e.target.value
      this.setState({categorias: this.state.categorias})
   }
   addCategory(){
      this.setState({categorias: [...this.state.categorias, ""]})
   }
   removeCategory(index){
      this.state.categorias.splice(index, 1)
      console.log(this.state.categorias, "####")
      this.setState({categorias: this.state.categorias})
   }
   selectChange(e){
      this.setState({idServicio: e.target.value})
   }
   render(){
      const {services,loadAction,errors} = this.state
      return(
         <div className="admin-categories">
            <Helmet>
               <title>Admin | Categorias</title>
            </Helmet>
            <section className="item-add">
               <Form onSubmit={this.handleOnSubmit} encType="multipart/form-data" autoComplete="off">
                  <legend>Agregar categorías a los servicios</legend>
                  {errorAlert(errors)}
                  <Container className="group">
                     <Select name="servicio" label="Selecciona un servicio" onChange={this.selectChange} >
                        {
                           (services.map(service=>(
                              // console.log(service.nombre)
                              <Option key={service.id} value={service.id} label={service.nombre} />
                           )))
                        }
                     </Select>
                  </Container>
                  <span className="add tooltip" onClick={this.addCategory}>
                     <i className="fas fa-plus"></i>
                     <span className="tooltiptext">Agregar categoria</span>
                  </span>

                  {
                     this.state.categorias.map((categoria, index)=>(
                        <Container className="group-categories" key={index}>
                           <Input
                              className="form-input"
                              label="Categoria"
                              floatingLabel={true}
                              value={categoria}
                              onChange={(e)=>this.changeInput(e, index)} 
                           />
                           <Container>
                              <legend style={{textAlign: 'left', fontSize: '12px'}}>Descripción</legend>
                              <Editor
                                 apiKey="otdi6um46x17oe387ukxlq2ksnt6fqdjyyjgsjbzsgst0mu7"
                                 textareaName="descripcion"
                                 onChange={(e)=>this.handleEditorChange(e, index)}
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
                           </Container>
                           <span className="remove tooltip" onClick={()=>this.removeCategory(index)}>
                              <i className="fas fa-minus"></i>
                              <span className="tooltiptext tooltiptext-left">Eliminar categoria</span>
                           </span>
                        </Container>
                     ))
                  }
                  <Container>
                     <Button variant="raised" color="primary" disabled={loadAction}>
                        {
                           (loadAction)
                           ?
                              <span><i className="fas fa-spinner fa-spin"></i> Agregando</span>
                           :
                              <span>Agregar</span>
                        }
                     </Button>
                  </Container>
               </Form>
            </section>
         </div>
      )
   }
}

export default AdminCategories