import React from 'react';

   export default function RootLayout({ children }) {
     return (
       <html lang="en">
         <body>
         <div className="input-group my-2" data-key-value-pair>
          <input type="text" data-key className="form-control" placeholder="Key" />
          <input type="text" data-value className="form-control" placeholder="Value" />
          <button type="button" data-remove-btn className="btn btn-outline-danger">Remove</button>
        </div>
         </body>
       </html>
     );
   }