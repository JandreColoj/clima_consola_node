var inquirer = require('inquirer');
const color = require('colors');


const readInput = async (message)=>{

   const questions = [
      {
         type: 'input',
         name: 'desc',
         message: message,
         validate(value){

            if(value.length===0){
               return 'Porfavor ingrese un valor' 
            }

            return true; 
         } 
      }, 
   ];
   
   const {desc} = await inquirer.prompt(questions);

   return desc;
};

const listPlaces = async(places)=>{

   const choices = places.map((place, i) => {
      return {
         value : place.id, 
         name: `${color.green(i+1)} ${place.name}`
      }
   });

   choices.unshift({
      value : 0, 
      name: `${color.green('0')} Cancelar`
   });

   const preguntas = await inquirer
                  .prompt([
                     {
                        type: 'list',
                        name: 'option',
                        message: 'Selecciona',
                        choices: choices,
                     }, 
                  ]);
 
      return preguntas.option; 
};



module.exports = {
   'readInput' : readInput, 
   'listPlaces' : listPlaces, 
};