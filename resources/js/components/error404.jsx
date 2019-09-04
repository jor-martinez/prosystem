import React from 'react'
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet'

const Error404 = () => (
   <div className="error-404">
      <Helmet>
         <title>Error!</title>
      </Helmet>
      <h1>Error 404: Page not found</h1>
      <Link className="link-home" to="/">Regresar al inicio</Link>
   </div>
)

export default Error404