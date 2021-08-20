var inquirer = require('inquirer');
const color = require('colors');

 
const menu = async()=>{

   console.clear();
   console.log(color.white(`=============================`));
   console.log(color.white(' Opciones')); 
   console.log(color.white(`=============================`));
   console.log('\n');
 
   const result = await inquirer
                  .prompt([
                     {
                        type: 'list',
                        name: 'option',
                        message: 'Selecciona una opcion?',
                        choices: [
                           {
                              value : 1, 
                              name: `${color.green('1.')} Buscar ciudad`
                           },
                           {
                              value : 2, 
                              name: `${color.green('2.')} Historial`
                           }, 
                           {
                              value : 0, 
                              name: `${color.green('0.')} Salir`
                           }, 
                        ],
                     }, 
                  ]);  

      return result.option;
};

const pause = async()=>{

   const questions = [
      {
        type: 'input',
        name: 'siguiente',
        message: `Precione ${color.green('enter')} para continuar`,
      }, 
   ];
    
   let salir = await inquirer.prompt(questions).then((answers) => {
       
   });
};

module.exports = {
   'menu' : menu,
   'pause' : pause
};