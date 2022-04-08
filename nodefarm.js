/////////// node farm project for reading data and to learn routing 
const url=require('url');
const fs=require('fs');
const data=fs.readFileSync("data.json","utf-8");
const tempOveriew=fs.readFileSync('overview.html',"utf-8");
const products=fs.readFileSync('product.html',"utf-8");
const tempcard=fs.readFileSync('templatecard.html',"utf-8");
const dataObj=JSON.parse(data);
const http=require('http');

const replacetemplate=require('./modules/replacetemplate');

const server=http.createServer((req,res)=>{
    
    
    
    const {query, pathname}=url.parse(req.url,true)

    if(pathname=="/overview"||pathname=="/"){
        const cards =dataObj.map(el=>replacetemplate(tempcard,el)).join('');
        const out=tempOveriew.replace('{%Product-cards%}',cards)
        res.end(out);}
        
        else if (pathname=="/product"){
            const product=dataObj[query.id]
            const output=replacetemplate(products,product)
            
            res.end(output);
        }
        else if (pathname=='/api'){
        fs.readFile('data.json','utf-8',(err,data)=>{
            const productdata=JSON.parse(data);
            res.end(data);
        }
        
        )
   
           
        }
        else{
            res.end("Page not found");        }
    
})

server.listen(8000,'127.0.0.1',()=>{
    console.log("listening to request on port 8000");
})