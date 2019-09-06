import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import Helmet from 'react-helmet'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'
import errorAlert from './errors'


class AdminSlider extends Component{
   constructor(props){
      super(props)

      this.state = {
         loadAction: false,
         load: false,
         sliders:[],
         titulo: '',
         descripcion: '',
         imagen: '',
         link: '',
         img: null,
         errors: {}
      }
      this.getSliders = this.getSliders.bind(this)
      this.actualizar = this.actualizar.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleOnSubmit = this.handleOnSubmit.bind(this)
      this.onReset = this.onReset.bind(this)
   }
   actualizar(){
      this.getSliders()
   }
   getSliders(){
      axios.get('/api/slyder').then(res=>{
         console.log(res)
         this.setState({
            sliders: res.data,
            load: true
         })
      }).catch(err=>{
         console.log(err)
      })
   }
   componentDidMount(){
      this.getSliders()
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
   handleOnSubmit(e){
      e.preventDefault()
      this.setState({loadAction: true})
      
      console.log(this.state)
      const data = new FormData()
      
      data.append('titulo', this.state.titulo)
      data.append('descripcion', this.state.descripcion)
      data.append('imagen', this.state.imagen)
      data.append('link', this.state.link)

      axios({
         method: 'post',
         url: '/dev/slyder/nuevo',
         data: data
      }).then(res=>{
         this.setState({loadAction: false})
         console.log('Slider agregada correctamente', res)
         SweetAlert.fire(
            'Correcto',
            'El servicio se ha agregado correctamente',
            'success'
         ).then(()=>{
            this.getSliders()
            this.onReset()
            this.setState({
               titulo: '',
               descripcion: '',
               imagen: '',
               link: ''
            })
         })
      }).catch(err=>{
         this.setState({loadAction: false})
         SweetAlert.fire(
            'Error',
            'Algo salió mal!',
            'error'
         )
         console.log(err.response.data.errors)
         this.setState({
            errors: err.response.data.errors
         })
      })
   }
   onReset() {
      document.getElementById('info').innerHTML = ' Subir imagen'
      this.setState({ img: '' })
   }
   
   render(){
      const {sliders,load,loadAction,errors} = this.state
      return(
         <div className="main-containor admin-sliders">
            <Helmet>
               <title>Admin | Sliders</title>
            </Helmet>
            
            <section className="item-list">
               <div className="refresh">
                  <button className="btn-refresh tooltip" onClick={this.actualizar}>
                     <i className="fas fa-sync-alt"></i>
                     <span className="tooltiptext">Actualizar lista</span>
                  </button>
               </div>
               {
                  (load)
                  ?
                     (sliders.length === 0)
                     ? 
                        <strong className="no-data">No hay información en la base de datos. <br/>
                        Empiece agregando un slider.</strong>
                     :
                        (sliders.map((slider)=>(
                           <section key={slider.id} className="item-containor slider-containor">
                              <div className="img-containor">
                                 <img src={`../images/slyder/${slider.imagen}`} alt="imagen-servicio"/>
                              </div>
                              <div className="info-containor">
                                 <div className="text-containor">
                                    <h2>{slider.titulo}</h2>
                                    <p>{slider.descripcion}</p>
                                 </div>
                                 <div className="buttons-containor">
                                    <button onClick={()=>{
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
                                             axios.delete('/dev/slyder/borrar/'+slider.id).then((res)=>{
                                                console.log(res)
                                                SweetAlert.fire(
                                                   'Eliminado!',
                                                   'El elemento ha sido eliminado.',
                                                   'success'
                                                ).then(()=>{
                                                   this.getSliders()
                                                })
                                             }).catch(err=>{
                                                console.log(err)
                                                SweetAlert.fire(
                                                   'Ooops!',
                                                   'Algo salió mal. !',
                                                   'error'
                                                ).then(()=>{
                                                   this.getSliders()
                                                })
                                             })

                                             
                                          }
                                       })
                                    }} className="button button-delete tooltip">
                                       <i className="fas fa-trash-alt"></i>
                                       <span className="tooltiptext">Eliminar</span>
                                    </button>
                                 </div>
                              </div>
                           </section>
                        )))
                  :
                     <span className="preloader">Cargando información ...</span>
               }
            </section>
            <section className="item-add">
               <Form onSubmit={this.handleOnSubmit} encType="multipart/form-data" autoComplete="off">
                  <legend>Agregar un Slider</legend>
                  {errorAlert(errros)}
                  <Input
                     id="titulo"
                     className="form-input"
                     label="Titulo (opcional)"
                     floatingLabel={true}
                     name="titulo"
                     onChange={this.handleChange}
                     value={this.state.titulo}
                  />
                  <Input
                     id="descripcion"
                     className="form-input"
                     label="Descripción (opcional)"
                     floatingLabel={true}
                     name="descripcion"
                     onChange={this.handleChange}
                     value={this.state.descripcion}
                  />
                  <Container>
                     <label htmlFor="file-upload" className="subir">
                        <i className="fas fa-cloud-upload-alt"></i><span id="info"> Subir imagen</span> 
                     </label>
                     <input id="file-upload" required onChange={this.handleChange} type="file" accept="image/" name="Imagen" />
                  </Container>
                  <Input
                     id="link"
                     className="form-input"
                     type="url"
                     label="Link (opcional)"
                     floatingLabel={true}
                     name="link"
                     onChange={this.handleChange}
                     value={this.state.link}
                  />
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
                  <Button variant="flat" type="reset" onClick={this.onReset} >Limpiar Campos</Button>
               </Form>
            </section>
         </div>
      )
   }
}

export default AdminSlider