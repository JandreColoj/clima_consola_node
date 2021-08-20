const fs = require('fs'); 

class Storage{

   historial = [];
   path = './ouput/data.json';


   saveHistorial(text){  

      if(this.historial.includes(text.toLowerCase())) {
         return;
      }

      this.historial.unshift(text.toLowerCase());

      const payload = {
         historial : this.historial,
      }

      fs.writeFileSync(this.path, JSON.stringify(payload)); 
 
   }

   readHistorial(){

      if(!fs.existsSync(this.path)){
         return null;
      }

      const info = fs.readFileSync(this.path, {encoding: 'utf-8'});
      const data = JSON.parse(info); 
       
      this.historial = data;  
   }

   showHistorial(){
      return this.historial.map(function(element){
         return element.toLowerCase()
      });
   }
 

}



module.exports = Storage;