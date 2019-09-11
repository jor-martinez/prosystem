import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet'
import axios from 'axios'
import SweetAlert from 'sweetalert2'

import pageTitle from './media/resources/page-title-bg.jpg'

import Brand from './sliderMarcas'

class Contact extends Component{
   constructor(props){
      super(props)
      this.state={
         contacto: [],
         name: '',
         email: '',
         msg: '',
         loadAction: false
      }
      this.getDatosContacto = this.getDatosContacto.bind(this)
      this.handleOnSubmit = this.handleOnSubmit.bind(this)
      this.change = this.change.bind(this)
   }
   componentDidMount(){
      this.getDatosContacto()
      window.scrollTo(0,0)
      document.getElementById('spinner').style.display = 'none';
   }
   getDatosContacto(){
      axios.get('/api/empresa').then(res=>{
         this.setState({
            contacto: res.data
         })
      }).catch(err=>{
         console.log(err)
      })
   }
   change(e){
      const {name, value} = e.target

      this.setState({
         [name]: value
      })
   }

   handleOnSubmit(e){
      e.preventDefault()
      // console.log(this.state)
      this.setState({loadAction: true})

      const data = new FormData()

      data.append('name', this.state.name)
      data.append('email', this.state.email)
      data.append('msg', this.state.msg)

      axios.post('/enviar', data).then(res=>{
         console.log(res)
         SweetAlert.fire({
            type: 'success',
            title: 'Correo enviado correctamente'
          })
          this.setState({
             name: '',
             email: '',
             msg: '',
             loadAction: false
          })
      }).catch(err=>{
         console.log(err)
         SweetAlert.fire({
            type: 'error',
            title: 'Ocurrió un error'
          })
          this.setState({loadAction: false})
      })
   }
   render(){
      const {contacto, loadAction} = this.state
      return(
         <div>
            <Helmet>
               <title>Contacto</title>
            </Helmet>
            <section className="page-title-block text-center" style={{backgroundImage: `url(${pageTitle})`}}>
               <div className="container">
                  <h2>Contacto</h2>
                  <div className="thm-breadcrumb">
                     <Link to="/">Inicio</Link>
                     <span className="sep">/</span>
                     <span className="page-title">Contacto</span>
                  </div>
               </div>
            </section>
            <section className="contact-info-style-one">
               <div className="container">
                  <div className="title-block text-center">
                     <span className="tag-line">Contacto</span>
                     <h2>Información de Contacto</h2>
                  </div>
                  <div className="row high-gutter">
                     <div className="single-contact-info-one text-center">
                        <div className="inner-block">
                           <i className="fas fa-map-marker-alt"></i>
                           <h3>Ubicación</h3>
                           {
                              (contacto.map(ubi=>(
                                 <p key={ubi.id}>{ubi.ubicacion}</p>
                              )))
                           }
                        </div>
                     </div>
                     <div className="single-contact-info-one text-center">
                        <div className="inner-block">
                           <i className="fas fa-mobile-alt"></i>
                           <h3>Teléfonos</h3>
                           {
                              (contacto.map(tel=>(
                                 <p key={tel.id} style={{whiteSpace: "pre-line"}}>{tel.telefono}</p>
                              )))
                           }
                        </div>
                     </div>
                     <div className="single-contact-info-one text-center">
                        <div className="inner-block">
                           <i className="fas fa-envelope"></i>
                           <h3>Correos</h3>
                           {
                              (contacto.map(correo=>(
                                 <p key={correo.id} style={{whiteSpace: "pre-line"}}>{correo.correo}</p>
                              )))
                           }
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className="contact-form-wrapper">
               <div className="container">
                  <div className="inner-container">
                     <div className="row no-gutters">
                        <div className="contact-map-block">
                           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.2036291094164!2d-98.22034898505918!3d19.31696824937345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfdecb9b760e0b%3A0xe094236faac1397f!2sProsystem!5e0!3m2!1ses-419!2smx!4v1563999944440!5m2!1ses-419!2smx" width="100%" height="100%" frameBorder={0} style={{border: 0}} allowFullScreen />
                        </div>
                        <div className="contact-form-block my-auto">
                           <div className="title-block">
                           <span className="tag-line">Escríbenos un mensaje</span>
                           <h2>¡Mantente en contacto!</h2>
                           </div>
                           <form onSubmit={this.handleOnSubmit} className="contact-form-one contact-form-validated" autoComplete="off">
                              <label htmlFor="">Nombre</label>
                              <input type="text" value={this.state.name} onChange={this.change} name="name" required/>
                              <label htmlFor="">Correo</label>
                              <input type="email" value={this.state.email} onChange={this.change} name="email" required/>
                              <label htmlFor="">Mensaje</label>
                              <textarea value={this.state.msg} onChange={this.change} name="msg" defaultValue={""} required/>
                              <button type="submit" disabled={loadAction}>
                                 {
                                 (loadAction)
                                       ?
                                       <span><i className="fas fa-spinner fa-spin"></i> Enviando</span>
                                       :
                                       <span>Enviar</span>
                                 }
                              </button>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className="brands-area-one">
               <Brand/>
            </section>
         </div>
      )
   }
}

export default Contact
