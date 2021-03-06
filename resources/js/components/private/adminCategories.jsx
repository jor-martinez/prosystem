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

class AdminCategories extends Component{
   constructor(props){
      super(props)

      this.state = {
         slug: this.props.location.pathname.substring(18),
         loadAction: false,
         load: false,
         servicio: [],
         nombre: '',
         descripciones: [],
         errors: {},
         categorias: [],
         idserv: this.props.location.state.idserv,
         listCatServ: [],
      }
      this.handleOnSubmit = this.handleOnSubmit.bind(this)
      this.getService = this.getService.bind(this)
      this.handleEditorChange = this.handleEditorChange.bind(this)
      this.addCategory = this.addCategory.bind(this)
      this.changeInput = this.changeInput.bind(this)
      this.removeCategory = this.removeCategory.bind(this)
      this.getCategories = this.getCategories.bind(this)
   }
   getCategories(){
      axios({
         method: 'get',
         url: '/dev/categoria/'+this.state.idserv
      }).then(res=>{
         // console.log(res.data)
         this.setState({
            listCatServ: res.data,
            load: true
         })
      }).catch(err=>{
         console.log(err)
      })
   }
   getService(){
      axios.get('/dev/servicios/'+this.state.slug).then(result=>{
         this.setState({
            servicio: result.data[0],
            load: true
         })
         // console.log(this.state)
      }).catch(err=>{
         console.log(err)
      })
   }
   componentDidMount(){
      this.getService()
      this.getCategories()
   }
   handleOnSubmit(e){
      e.preventDefault()
      this.setState({loadAction:true})
      const contCategories = this.state.categorias.length
      
      for(let i=0; i<contCategories; i++){
         const data = new FormData()
         data.append('titulo', this.state.categorias[i])
         data.append('descripcion', this.state.descripciones[i])
         data.append('id', this.state.servicio.id)
         axios({
            method: 'post',
            url: '/dev/categoria/nueva',
            data
         }).then(res=>{
            // console.log(res)
            this.setState({loadAction: false})
            SweetAlert.fire(
                'Correcto',
                'Las categorías se han agregado correctamente',
                'success'
            ).then(()=>{
               this.setState({
                  categorias: [],
                  descripciones:[]
               })
               this.getCategories()
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
      // console.log(this.state.categorias, "####")
      this.setState({categorias: this.state.categorias})
   }
   render(){
      // console.log(this.props.location.state.idserv)
      
      const {servicio,loadAction,errors,listCatServ,load, categorias} = this.state
      return(
         <div className="admin-categories">
            <Helmet>
               <title>Admin | Categorías</title>
            </Helmet>
            <div className="return">
               <Link className="button button-return tooltip return-btn" to="#" onClick={()=>window.history.back()}>
                  <i className="fas fa-reply"></i>
                  <span className="tooltiptext-right">Regresar</span>
               </Link>
            </div>
            <section className="item-add">
               <Form onSubmit={this.handleOnSubmit} encType="multipart/form-data" autoComplete="off">
                  <legend>Lista de categorías del servicio: <strong>{servicio.nombre}</strong></legend>
                  {
                     (load)
                     ?
                        (listCatServ.length === 0)
                        ?
                        <strong className="warning-label">Este servicio no tiene categorías aún.</strong>
                        :
                        (listCatServ.map(cat=>(
                           <section key={cat.id_cat} className="cat-containor">
                              <span>{cat.titulo}</span>
                              <div>
                                    <Link className="button button-edit tooltip"
                                    to={{pathname:'/admin/categoria/editar', state: {cat}}}>
                                       <i className="fas fa-edit"></i>
                                       <span className="tooltiptext-top">Editar</span>
                                    </Link>
                                    <button type="button" onClick={() => {
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
                                                axios.delete('/dev/categoria/borrar/'+cat.id).then((res) => {
                                                   SweetAlert.fire(
                                                      'Eliminado!',
                                                      'La categoría ha sido eliminada.',
                                                      'success'
                                                   ).then(() => {
                                                      this.getCategories()
                                                   })
                                                }).catch(err => {
                                                   console.log(err)
                                                   SweetAlert.fire(
                                                      'Ooops!',
                                                      'Algo salió mal.',
                                                      'error'
                                                   ).then(() => {
                                                      this.getCategories()
                                                   })
                                                })


                                          }
                                       })
                                    }} className="button button-delete tooltip">
                                       <i className="fas fa-trash-alt"></i>
                                       <span className="tooltiptext-top">Eliminar</span>
                                    </button>
                              </div>
                           </section>
                        )))
                     :
                     <span className="preloader pre-categorias">Cargando información ...</span>
                  }
                  <br/>
                  <br/>
                  <br/>
                  <legend>Agregar categorías al servicio: <strong>{servicio.nombre}</strong></legend>
                  {errorAlert(errors)}
                  <Container className="group">
                     {/* <Select name="servicio" label="Selecciona un servicio" onChange={this.selectChange} >
                        {
                           (services.map(service=>(
                              <Option key={service.id} value={service.id} label={service.nombre} />
                           )))
                        }
                     </Select> */}
                  </Container>
                  <span className="add tooltip" onClick={this.addCategory}>
                     <i className="fas fa-plus"></i>
                     <span className="tooltiptext-top">Agregar categoría</span>
                  </span>

                  {
                     this.state.categorias.map((categoria, index)=>(
                        <Container className="group-categories" key={index}>
                           <div className="titulo-cat">
                              <Input
                                 className="form-input"
                                 label="Titulo de la categoría"
                                 floatingLabel={true}
                                 value={categoria}
                                 onChange={(e)=>this.changeInput(e, index)} 
                              />
                           </div>
                           <div className="descripcion-cat">
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
                              <div className="column">
                                 <span className="remove tooltip" onClick={()=>this.removeCategory(index)}>
                                    <i className="fas fa-minus"></i>
                                    <span className="tooltiptext-top">Eliminar categoría</span>
                                 </span>
                                 <span className="add added tooltip" onClick={this.addCategory}>
                                    <i className="fas fa-plus"></i>
                                    <span className="tooltiptext-top">Agregar categoría</span>
                                 </span>
                              </div>
                           </div>
                        </Container>
                     ))
                  }
                  {
                     (categorias.length > 0)
                     &&
                     <Container>
                        <Button type="submit" variant="raised" color="primary" disabled={loadAction}>
                           {
                              (loadAction)
                              ?
                                 <span><i className="fas fa-spinner fa-spin"></i> Agregando</span>
                              :
                                 <span>Agregar</span>
                           }
                        </Button>
                     </Container>
                  }
               </Form>
            </section>
         </div>
      )
   }
}

export default AdminCategories