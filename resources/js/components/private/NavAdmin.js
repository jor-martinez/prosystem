import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from 'axios'
import styled from "styled-components";

import logo from '../media/resources/logo-1-2.png'

const Navigation = styled.header`
  width: 100%;
  box-shadow: 0 0 5px 0 grey;
  z-index: 20000;
  display: flex;
  position: relative;
  top: 0;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  background: #fff;
  padding-left: 50px;

  .logo{
    margin-right: 20px;
  }
  .logo a {
    width: 150px;
    padding-top: 33px;
    display: flex;
    flex-direction: column;
    clear: both;
    padding-bottom: 30px;
    text-decoration: none;
  }
  .logo a img{
    width: 100%;
  }
  .gray {
    color: #ccc;
  }
  a {
    color: #222;
    opacity: 0.65;
    transition: all 0.6s;
    color: #222;
    font-size: .9em;
    text-align: center;
  }
  a:hover {
    opacity: 1;
    color: #3ADBEB;
  }
  .fa-bars {
    display: none;
    color: #222;
    font-size: 2rem;
  }
  nav {
    ul {
      display: flex;
      justify-content: space-between;
      margin-right: 50px;
      list-style: none;
    }
    li {
      margin: 0 15px;
      justify-content: space-between;
      font-size: 1em;
    }
    a {
      font-weight: 500;
      font-size: 17px;
      color: #182345;
      position: relative;
      top: 5px;
      transition: all .4s ease;
      .active {
        color: tomato;
      }
    }
    a.active {
      color: #182345;
    }
  }

  @media only screen and (max-width: 991px) {
    position: relative;
    top: 0;
    padding: 0px;
    .logo {
      padding-left: 15px;
      padding-top: 0px !important;
    }
    nav{
      ul{
        margin-right: 25px;
      }
    }
  }
  @media only screen and (max-width: 991px) {
    position: relative;
    top: 0;
    height: auto;
    min-height: 50px;
    display: block;
    .logo {
      width: 200px;
      display: block;
      padding-top: 20px;
      margin: 0px;
      margin-left: -5px;
      a {
        padding: 20px 0px;
      }
    }
    .fa-bars {
      display: inline-block;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    ul.collapsed {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-wrap: wrap;

      overflow: hidden;
      max-height: 0;
      -moz-transition-duration: 0.4s;
      -webkit-transition-duration: 0.4s;
      -o-transition-duration: 0.4s;
      transition-duration: 0.4s;
      -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      transition-timing-function: cubic-bezier(0, 1, 0.5, 1);

      &.is-expanded {
        overflow: hidden;
        max-height: 500px; /* approximate max height */
        -moz-transition-duration: 0.4s;
        -webkit-transition-duration: 0.4s;
        -o-transition-duration: 0.4s;
        transition-duration: 0.4s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
      }
      li {
        padding: 15px 10px;
        margin: 0px 0px;
        width: 100%;
      }
    }
  }
`;

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
    this.getUser = this.getUser.bind(this)
  }
  handleToggle(e) {
    e.preventDefault();
    this.setState({
      isExpanded: !this.state.isExpanded,
      user: []
    });
  }
  getUser() {
    axios.get('/admin/obtener-info').then(res => {
      //  console.log(res.data.email)
       this.setState({
          email: res.data.email
       })
    }).catch(err => {
       console.log(err)
    })
  }
  componentDidMount(){
      this.getUser()
  }
  render() {
    const { isExpanded, email } = this.state;
    return (
      <Navigation>
        <div className="logo">
          <a href="/" target="_blank">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <nav className="nav">
          <i
            className="fa fa-bars"
            aria-hidden="true"
            onClick={e => this.handleToggle(e)}
          />
          <ul className={`collapsed ${isExpanded ? "is-expanded" : ""}`}>
            <NavLink activeClassName="active" to="/admin">
              <li>Inicio</li>
            </NavLink>
            <NavLink activeClassName="active" to="/admin/servicios">
              <li>Servicios</li>
            </NavLink>
            <NavLink activeClassName="active" to="/admin/slider">
              <li>Slider</li>
            </NavLink>
            <NavLink activeClassName="active" to="/admin/marcas">
              <li>Marcas</li>
            </NavLink>
            <NavLink activeClassName="active" to="/admin/articulos">
              <li>Blog</li>
            </NavLink>
            <NavLink activeClassName="active" to="/admin/procesos">
              <li>Proceso de trabajo</li>
            </NavLink>
            <NavLink activeClassName="active" to="/admin/ventajas">
              <li>Ventajas</li>
            </NavLink>
            <NavLink activeClassName="active" to="/admin/productos">
              <li>Productos</li>
            </NavLink>
            <NavLink activeClassName="active" to="/admin/mision-vision-objetivo">
              <li>Misión, visión y objetivo</li>
            </NavLink>
            <NavLink activeClassName="active" to="/admin/historia">
              <li>Historia</li>
            </NavLink>
            <NavLink activeClassName="active" to="/admin/contacto">
              <li>Contacto</li>
            </NavLink>
            {
              (email === 'admin@prosystem.mx')
              ?
              <NavLink activeClassName="active" to="/admin/usuarios">
                <li>Usuarios</li>
              </NavLink>
              :
              <NavLink activeClassName="active" to="/admin/usuarios">
                <li>Perfil</li>
              </NavLink>
            }

            {/* <li><a href="/" target="_blank">Ir a Pro System</a></li>

            <li><a href="/logout" onClick={()=>{
                localStorage.removeItem('usuarioNombre')
            }}>Cerrar sesión</a></li> */}

          </ul>
        </nav>
      </Navigation>
    );
  }
}

export default Nav;
