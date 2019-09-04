import React, {Component} from 'react'
import Carrusel from 'react-slick'
import axios from 'axios'


const settings2 = {
   autoplay: true,
   dots: false,
   infinite: true,
   speed: 2000,
   slidesToShow: 4,
   slidesToScroll: 1,
   arrows: false
}

class Brands extends Component{
   constructor(props){
      super(props)
      this.state={
         marcas:[]
      }
      this.getMarcas = this.getMarcas.bind(this)
   }
   getMarcas(){
      axios.get('/api/marca').then(result=>{
         console.log(result)
         this.setState({marcas: result.data})
      }).catch(err=>{
         console.log(err)
      })
   }
   componentDidMount(){
      this.getMarcas()
   }
   render(){
      const {marcas} = this.state
      return(
         <div>
            <Carrusel {...settings2} className="slider-logos">
               {
                  marcas.map((marca)=>(
                     <div className="item" key={marca.id}>
                        <center><img className="img-marca" src={`../images/marcas/${marca.Imagen}`} alt="marca" /></center>
                     </div>
                  ))
               }
            </Carrusel>
         </div>
      )
   }
}

export default Brands
