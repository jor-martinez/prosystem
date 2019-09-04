import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import Input from 'muicss/lib/react/input'
import Form from 'muicss/lib/react/form'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'
import { Editor } from '@tinymce/tinymce-react';

class Articulo extends Component{
    constructor(props){
        super()
        this.state={
            titulo: this.props.location.state.post.titulo,
            cuerpo: this.props.location.state.post.cuerpo,
            encabezado: this.props.location.state.post.encabezado,
            slug: this.props.location.state.post.slug
        }
    }
    render(){
        return(
            <div>
                <h1>hola</h1>
            </div>
        )
    }
}
export default Articulo