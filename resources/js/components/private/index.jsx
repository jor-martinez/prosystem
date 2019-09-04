import React, {Component} from 'react'
import {
	Route,
	BrowserRouter as Router,
	Link,
	Switch
} from 'react-router-dom'
import axios from 'axios'

import logo from '../media/resources/logo-pro.png'

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


import '../../css/stylesAdmin.css'

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
               <section className="nav-admin-container">
                  <div className="logo-cont">
                     <a href="/"><img src={logo} alt="logo pro system"/></a>
                  </div>
                  <ul>
                     <li><Link to="/admin" >Inicio</Link></li>
                     <li><Link to="/admin/slider" >Slider</Link></li>
                     <li><Link to="/admin/servicios" >Servicios</Link></li>
                     <li><Link to="/admin/marcas" >Marcas</Link></li>
                     <li><Link to="/admin/articulos" >Blog</Link></li>
                     <li><Link to="/admin/usuarios" >Usuarios</Link></li>
                     <li><Link to="/admin/procesos" >Proceso de trabajo</Link></li>
                     <li><Link to="/admin/ventajas" >Ventajas</Link></li>
                     <li><Link to="/admin/productos" >Productos</Link></li>
                     <li><Link className="hover-submenu" to="#" >Empresa</Link>
                        <ul className="submenu-admin">
                           <li><Link to="/admin/mision-vision-objetivo" >Misión, visión y valores</Link></li>
                           <li><Link to="/admin/historia" >Historia</Link></li>
                           <li><Link to="/admin/contacto" >Contácto</Link></li>
                        </ul>
                     </li>
                  </ul>
                  <ul className="list-a">
                     <a href="/" target="_blank" >Ir a Pro System</a>
                     <a className="logout" href="/logout" onClick={()=>{
                        localStorage.removeItem('usuarioNombre')
                     }} >Cerrar sesión</a>
                  </ul>
                  <div className="user-logued">
                     <span>Sesión activa: {this.state.user.email}</span>
                  </div>
               </section>
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
               </Switch>
            </Router>
            
         </div>
      )
   }
}

export default Admin
