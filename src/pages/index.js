import React from "react";
import Head from "next/head";
import { useState } from "react";
import PostmanComponent from "../components/HomeComponent";
import TabsComponent from "../components/TabsComponent";


      export default function HomePage(){
        return (
          <div>
            <div>
              <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="Chrome" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
                <title>Mock Postman</title>
              </Head>
            </div>
        
              <h1> Welcome to my Website</h1>
             
      
             {/* Render the tabbed interface */}
             <TabsComponent/>
        
              
              {/* { 
                <template data-key-value-template>
                <div className="input-group my-2" data-key-value-pair>
                  <input type="text" data-key className="form-control" placeholder="Key" />
                  <input type="text" data-value className="form-control" placeholder="Value" />
                  <button type="button" data-remove-btn className="btn btn-outline-danger">Remove</button>
                </div>
              </template> 
              } */}
              </div>
        
              )
      } 