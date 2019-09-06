import React from 'react'

const errorAlert = (message) => {
   if(!message) return null
  
   return(
      <div className="alert alert-danger">
         {Object.keys(message).map(field=>
            <dl key={field}>
               <dt>{field}</dt>
               {message[field].map(error=>
                  <dd key={error}>{error}</dd>
               )}
            </dl>
         )}
      </div>
   );
}
export default errorAlert