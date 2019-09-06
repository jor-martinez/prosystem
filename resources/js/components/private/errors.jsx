import React from 'react'

const errorAlert = (message) => {
   if(!message) return null
  
   return(
      <div className="errors-containor">
         {Object.keys(message).map(field=>
            <div className="error-text" key={field}><strong>{field}: </strong>
               {message[field].map(error=>
                  <span key={error}>{error}</span>
               )}
            </div>
         )}
      </div>
   );
}
export default errorAlert