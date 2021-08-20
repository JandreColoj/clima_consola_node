const { readInput, listPlaces } = require('./helpers/inquirer');
const { menu, pause } = require('./helpers/menu');
const Busquedas = require('./models/busquedas');
const Storage = require('./models/storage');
const color = require('colors');


const main = async() => {


   let option_menu = 1;
   const search = new Busquedas();
   const storage = new Storage();

   // await storage.readHistorial();
   
   do{

      option_menu = await menu();


      switch (option_menu){

         case 1:
            
            const pais = await readInput('lugar a busar');

            const places = await search.searchPlaces(pais);

            const id_place = await listPlaces(places);
 
            if(id_place!=0){

               const place_select = places.find(l => l.id === id_place);


               //Guarda en db
               storage.saveHistorial(place_select.name);


               const climate = await search.searchClimate(place_select); 

               console.log('Informacin de ciudad');
               console.log(`${color.green('Ciudad: ')} ${place_select.name}`);
               console.log(`${color.green('latitud: ')} ${place_select.lat}`);
               console.log(`${color.green('longitud: ')} ${place_select.lon}`);
               console.log(`${color.green('temperatura: ')} ${climate.tem}`);
               console.log(`${color.green('maxima: ')} ${climate.max}`);
               console.log(`${color.green('minima: ')} ${climate.min}`);
               console.log(`${color.green('Como esta el clima: ')} ${climate.desc}`);
            }
 
            break;
      

            case 2:

               const result = storage.showHistorial();

               result.forEach(element => {
                  console.log(element);
               }); 

               break;

         default:
            break;
      }



      await pause();

   } while (option_menu!=0);


   console.log('Saliendo . . ');
}

main();