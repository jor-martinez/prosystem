import React, {Component} from 'react'

class Categoria extends Component{
    constructor(props){
        super(props)
        this.state={
             cat: this.props.location.state.categoria
        }
    }
    render(){
        console.log(this.state.cat)
        return(
            <div>
                <h1>{this.state.cat}</h1>
            </div>
        )
    }
}
export default Categoria