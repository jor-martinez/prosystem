import React, {Component} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

import ListPagination from './listaPags'
import './paginacion.css'

class Paginacion extends Component{
    constructor(props){
        super(props)
        this.state={
            posts: [],
            loading: false,
            currentPage: 1,
            postsPerPage: 10
        }
        this.getData = this.getData.bind(this)
    }
    componentDidMount(){
        this.getData()
    }
    getData(){
        this.setState({loading: true})
        axios.get('https://jsonplaceholder.typicode.com/posts').then(res=>{
            this.setState({
                posts: res.data,
                loading: false
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    render(){
        const {posts,loading,currentPage,postsPerPage} = this.state

        // obtener los post
        const indexOfLastPost = currentPage * postsPerPage,
              indexOfFirstPost = indexOfLastPost - postsPerPage,
              currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)

        // Cambiar pagina
        const paginate = pageNumber => this.setState({currentPage: pageNumber})

        if(loading){
            return <h2>loading...</h2>
        }
        
        return(
            <div className="contenedor">
                <ul className='list-group mb-4'>
                    {
                        (currentPost.map(item=>(
                            <li key={item.id} className='list-group-item'>{item.title}</li>
                        )))
                    }
                </ul>
                <ListPagination postPerPage={postsPerPage} totalPost={posts.length} paginate={paginate} />
            </div>
        )
    }
}
export default Paginacion