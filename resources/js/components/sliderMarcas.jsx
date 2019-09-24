import React, {Component} from 'react'
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css"
import axios from 'axios'


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
      window.scrollTo(0,0)
   }
   render(){
      const {marcas} = this.state
      const responsive = {
         0: { items: 2 },
         600: { items: 2},
         900: { items: 3},
         1024: { items: 4 },

      }
      return(
         <div>
            <AliceCarousel
               mouseDragEnabled
               autoPlay
               responsive={responsive}
               dotsDisabled
               duration={2000}
               buttonsDisabled
               infinite
            >
               {
                  marcas.map((marca)=>(
                     <div className="item-brand" key={marca.id}>
                        <center><img className="img-marca" src={`../images/marcas/${marca.Imagen}`} alt="marca" /></center>
                     </div>
                  ))
               }
            </AliceCarousel>
         </div>
      )
   }
}

export default Brands
