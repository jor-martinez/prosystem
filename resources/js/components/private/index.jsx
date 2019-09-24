import React, {Component} from 'react'
import {
	Route,
	BrowserRouter as Router,
	Link,
	Switch
} from 'react-router-dom'
import axios from 'axios'

import icon from '../media/resources/spinner.png'

import Header from './NavAdmin'
import AdminServices from './adminServices'
import AdminSlider from './adminSlider'
import Service from './EditService'
import AdminHome from './admin'
import AdminMarcas from './adminMarcas'
import AdminUsers from './adminUsers'
import AdminBlog from './adminBlog'
import Articulo from './EditArticulo'
import AdminProcess from './adminProceso'
import EditProcess from './EditProcess'
import AdminVentajas from './AdminVentajas'
import EditVentaja from './EditVentaja'
import AdminProducts from './adminProducts'
import EditProduct from './EditProduct'
import AdminMision from './adminMision'
import EditMission from './EditMision'
import AdminHistory from './adminHistoria'
import EditHistory from './EditHistory'
import AdminContacto from './AdminContacto'
import EditContacto from './EditContacto'


import '../../css/stylesAdmin.css'
import '../../css/responsiveAdmin.css'

class Admin extends Component{
   constructor(props){
      super(props)

      this.state = {
         user:[]
      }
      this.getUser = this.getUser.bind(this)
   }
   getUser() {
      axios.get('/admin/obtener-info').then(res => {
         console.log(res.data)
         this.setState({
            user: res.data
         })
         localStorage.setItem('usuarioNombre', res.data.name)
      }).catch(err => {
         console.log(err)
      })
   }
   componentDidMount(){
      this.getUser()
   }
   render(){
      return(
         <div>
            <Router>
               <Header/>
               <div className="user-logued">
                  <span>Sesión activa: {this.state.user.email}</span>
               </div>
               <Switch>
                  <Route exact path="/admin" component={AdminHome} />
                  <Route path="/admin/servicios" component={AdminServices} />
                  <Route path="/admin/servicio" component={Service} />
                  <Route path="/admin/slider" component={AdminSlider} />
                  <Route path="/admin/marcas" component={AdminMarcas} />
                  <Route path="/admin/procesos" component={AdminProcess} />
                  <Route path="/admin/proceso/editar" component={EditProcess} />
                  <Route path="/admin/usuarios" component={AdminUsers} />
                  <Route path="/admin/articulos" component={AdminBlog} />
                  <Route path="/admin/articulo" component={Articulo} />
                  <Route path="/admin/ventajas" component={AdminVentajas} />
                  <Route path="/admin/ventaja/editar" component={EditVentaja} />
                  <Route path="/admin/productos" component={AdminProducts} />
                  <Route path="/admin/producto/editar" component={EditProduct} />
                  <Route path="/admin/mision-vision-objetivo" component={AdminMision} />
                  <Route path="/admin/mision-vision-objetivo-info/editar" component={EditMission} />
                  <Route path="/admin/historia" component={AdminHistory} />
                  <Route path="/admin/historia-info/editar" component={EditHistory} />
                  <Route path="/admin/contacto" component={AdminContacto} />
                  <Route path="/admin/contacto-info/editar" component={EditContacto} />
               </Switch>
               <div className="buttons-logout">
                  <button className="btn go-prosystem tooltip">
                     <a href="/" target="_blank"><img src={icon} alt="icono"/></a>
                     <span className="tooltiptext">Ir a Pro System</span>
                  </button>
                  <button className="btn button-logout tooltip">
                     <a href="/logout" onClick={()=>{
                        localStorage.removeItem('usuarioNombre')
                     }}><i className="fas fa-sign-out-alt"></i></a>
                     <span className="tooltiptext">Cerrar sesión</span>
                  </button>
               </div>
            </Router>
            
         </div>
      )
   }
}

export default Admin
