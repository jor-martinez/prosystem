import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import SweetAlert from 'sweetalert2'
import Helmet from 'react-helmet'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'
import errorAlert from './errors'

class AdminMarcas extends Component{
   constructor(props){
      super(props)

      this.state = {
         loadAction: false,
         load: false,
         marcas: [],
         Nombre: '',
         Imagen: '',
         img: null,
         errors: {}
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.getMarcas = this.getMarcas.bind(this)
      this.actualizar = this.actualizar.bind(this)
      this.onReset = this.onReset.bind(this)
   }

   actualizar(){
      this.getMarcas()
   }

   getMarcas(){
      axios.get('/api/marca').then(res=>{
         // console.log(res)
         this.setState({
            marcas: res.data,
            load: true
         })
      }).catch(err=>{
         console.log(err)
      })
   }

   componentDidMount(){
      this.getMarcas()
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
   handleSubmit(e){
      e.preventDefault()

      this.setState({loadAction: true})
      const data = new FormData()

      data.append('Nombre', this.state.Nombre)
      data.append('Imagen', this.state.Imagen)

      axios({
         method: 'post',
         url: '/dev/marcas/nueva',
         data: data
      }).then(res=>{
         this.setState({loadAction: false})
         // console.log('Marca agregada correctamente', res)
         SweetAlert.fire(
            'Correcto',
            'La marca se ha agregado correctamente',
            'success'
         ).then(()=>{
            this.getMarcas()
            this.onReset()
            this.setState({
               Nombre: '',
               Imagen: ''
            })
            document.getElementById('errores').style.display = 'none';
         })
      }).catch(err=>{
         console.log('Error!', err)
         this.setState({
            loadAction: false,
            errors: err.response.data.errors
         })
         SweetAlert.fire(
            'Error',
            'Algo salió mal!',
            'error'
         )
         window.scrollTo(0,0)
      })
   }
   onReset(){
      document.getElementById('info').innerHTML = ' Subir imagen'
      this.setState({ img: '' })
   }
   render(){
      const {marcas,load,loadAction,errors} = this.state
      return(
         <div className="main-containor admin-marcas">
            <Helmet>
               <title>Admin | Marcas</title>
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
                     (marcas.length === 0)
                     ?
                        <strong className="no-data">No hay información en la base de datos. <br/>
                        Empiece agregando una marca.</strong>
                     :
                     (marcas.map((marca)=>(
                        <section key={marca.id} className="item-containor marca-containor">
                           <div className="img-containor">
                              <img src={`../images/marcas/${marca.Imagen}`} alt="imagen-servicio"/>
                           </div>
                           <div className="text-containor">
                              <h2>{marca.Nombre}</h2>
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
                                          axios.delete('/dev/marcas/borrar/'+marca.id).then((res)=>{
                                             console.log(res)
                                             SweetAlert.fire(
                                                'Eliminado!',
                                                'El elemento ha sido eliminado.',
                                                'success'
                                             ).then(() => {
                                                this.getMarcas()
                                             })
                                          }).catch(err=>{
                                             console.log(err)
                                             SweetAlert.fire(
                                                'Ooops!',
                                                'Algo salió mal.',
                                                'error'
                                             ).then(() => {
                                                this.getMarcas()
                                             })
                                          })

                                          
                                       }
                                    })
                                 }} className="button button-delete tooltip delete-btn">
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
               <Form onSubmit={this.handleSubmit} encType="multipart/form-data" autoComplete="off">
                  <legend>Agregar una Marca</legend>
                  {errorAlert(errors)}
                  <Input
                     id="nombre"
                     label="Nombre"
                     floatingLabel={true}
                     onChange={this.handleChange}
                     value={this.state.Nombre}
                     name="Nombre"
                  />
                  <Container>
                     <label htmlFor="file-upload" className="subir">
                        <i className="fas fa-cloud-upload-alt"></i><span id="info"> Subir imagen</span> 
                     </label>
                     <input id="file-upload" onChange={this.handleChange} type="file" accept="image/" name="Imagen" required/>
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

export default AdminMarcas