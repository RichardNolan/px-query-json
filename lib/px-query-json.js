'use strict';

const Px = require('px');
const  fs = require('fs'); 
const path = require('path');
const { URL } = require('url');
const axios = require("axios");

module.exports = (function(){

        let _metadata = null,
            _px = null

        const read = file=>{
            //TO DO RETURN A PROMISE NOT JUST DO IT
            if(typeof file != 'string') return;
            try{
                const myURL =  new URL(file);
                this.readURL(file);
            }catch(err){ }
            readFile(file);
        }

        const readFile = file=>{       
            fs.readFile(file, 'utf8', (err, data)=> {
                if(err) return "Error"
                readPX(data)
            });  
        }

        const readURL = url=>{ 
            axios.get(url)
                .then(data => _PX.readPX(data.data))
                .catch(error => "Error");
        }

        const readPX = data=>{
            _px = new Px(data);
            _metadata = _px.metadata
        }
        
        const metadata = ()=>{
            return _metadata
        }
        return {
            read: read,
            metadata: metadata
        }
    })()