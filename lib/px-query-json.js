'use strict';

const Px = require('px');
const _ = require('underscore');
const  fs = require('fs'); 
const path = require('path');
const { URL } = require('url');
const axios = require("axios");

module.exports = (function(){

        let _px = null;
        let _data = {};

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
             for(let vr of _px.variables()){
                 let data = _.zip( _px.values(vr), _px.codes(vr) )
                 _data[vr.replace(" ", "")] = data.map((arr, index)=>{  return {name:arr[0], code:arr[1], index:index}   })
             }
             return true
        }
        
        const metadata  =   ()=> _px.metadata;
        const keywords  =   ()=> _px.keywords();
        const variables =   ()=> _px.variables();
        const variable  =   index=> _px.variable(index);
        const values    =   index=> _px.values(index);
        const codes     =   index=> _px.codes(index);
        const data      =   ()=> _data;
        
        return {
            read        :   read,
            metadata    :   metadata,
            keywords    :   keywords,
            variables   :   variables,
            variable    :   variable,
            values      :   values,
            codes       :   codes,
            data        :   data
        }
    })()


    /* TO DO

    The standard functions are in place. 
    I now want to port over the getData function but instead of an array of integers, I'd like to request the data with the variables and values already established.

    The column2 function looks likely to replace column

    If I am passing an array of integers, I have to be sure they don't request indices that don't exist 

    Make a react front end to show this off

    */