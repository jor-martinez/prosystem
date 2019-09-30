import React, {Component} from 'react'
import logo from '../media/resources/logo-1-2.png'
import Helmet from 'react-helmet'
import axios from 'axios'

class Admin extends Component{
   constructor(props){
      super(props)

      this.state = {
         load: false,
         user: ''
      }
      this.getUser = this.getUser.bind(this)
   }
   getUser() {
      axios.get('/admin/obtener-info').then(res => {
         // console.log(res.data)
         this.setState({
            user: res.data,
            load: true
         })
         
      }).catch(err => {
         console.log(err)
      })
   }
   componentDidMount() {
      this.getUser()
   }
   render(){
      const {user,load} = this.state
      return(
         <div className="admin-main-panel">
            <Helmet>
               <title>Admin | Inicio</title>
            </Helmet>
               {
                  (load)
                  ?
                  <div>
                     <div className="logo-anim">
                        <img src={logo} alt="logo" />
                     </div>
                     <h1>¡ Bienvenido <span>{user.name} !</span></h1>
                     <p>En este panel de control puedes editar la información que se muentra en la página principal, como el Slider, los servicios, las marcas, agregar un articulo en el Blog, etc. <br />
                        Solo accede en la barra de navegación a la sección que quieras trabajar. </p>
                  </div>
                  :
                  <span className="preloader pre-inicio">Cargando información ...</span>
               }
         </div>
      )
   }
}

export default Admin