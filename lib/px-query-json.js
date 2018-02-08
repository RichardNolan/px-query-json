'use strict';

const Px = require('px');
const  fs = require('fs'); 
const path = require('path');
const { URL } = require('url');
const axios = require("axios");

module.exports = (function(){

        let _px = null;

        const read = file=>{
            if(typeof file != 'string') return;
            try{
                const myURL =  new URL(file);
                return axios.get(file)
                    .then(data => readPX(data.data))
                    .catch(error => "Error");
                this.readURL(file);
            }catch(err){
                return new Promise((resolve, reject)=>{     
                    fs.readFile(file, 'utf8', (err, data)=> {
                        if(err) reject("Error")
                        try{
                            readPX(data)
                            resolve(true)
                        }catch(err){
                            reject(err)
                        }
                    });  
                });
            }         
        }

        const readPX = data=>{
             _px = new Px(data);
             return true
        }
        
        const metadata  =   ()=> _px.metadata;
        const keywords  =   ()=> _px.keywords();
        const variables =   ()=> _px.variables();
        const variable  =   index=> _px.variable(index);
        const values    =   index=> _px.values(index);
        const codes     =   index=> _px.codes(index);
        
        return {
            read        :   read,
            metadata    :   metadata,
            keywords    :   keywords,
            variables   :   variables,
            variable    :   variable,
            values      :   values,
            codes       :   codes
        }
    })()