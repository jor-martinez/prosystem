import React, {Component} from 'react'

class Categoria extends Component{
    constructor(props){
        super(props)
        this.state={
             cat: []
        }
    }
    componentDidMount(){
        this.setState({
            cat: this.props.history.location.state.categoria
        })
    }
    componentWillUnmount(){
        this.setState({
            cat: []
        })
    }
    render(){
        // console.log(this.props)
        const {cat} = this.state
        return(
            <div>
                <h1>{cat.titulo}</h1>
                <div dangerouslySetInnerHTML={{__html: cat.descripcion}}></div>
            </div>
        )
    }
}
export default Categoria