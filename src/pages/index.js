import React from "react";
import Head from "next/head";
import { useState } from "react";
import HomeComponent from "../components/HomeComponent";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 


      export default function HomePage(){
        return (
          <div className="container bg-color">
            <div>
              <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="Chrome" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
                <title>Mock Postman</title>
              </Head>
                  
        
              <h1 className="text-4xl font-bold text-black-600 mb-4"> Postman Clone -mstitt</h1>
              <ToastContainer position="top-right" autoClose={3000}
              hideProgressBar={false} closeOnClick draggable pauseOnHover />
             
      
             {/* Render the tabbed interface */}
             <HomeComponent/>
             
             </div>
              
              </div>
              
              )
              
      } 