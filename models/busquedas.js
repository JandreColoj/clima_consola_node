const axios = require('axios').default;
require('dotenv').config()

class Busquedas{


   constructor(){


   }

   getCredentialMapbox(){
 
      return {
         'access_token' : process.env.KEY_MAPBOX,
         'autocomplete' : true,
         'limit'        : 10,
         'language'     : 'es',
      }
   } 

   getCredentialOpenweather(place){
 
      return {
         'appid': process.env.KEY_OPENWEATHER, 
         'lat'  : place.lat,
         'lon'  : place.lon,
         'lang' : 'es',
      }
   } 


   async searchPlaces(lugar = ''){

      try {

         const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: this.getCredentialMapbox(),
         });

         let response = await instance.get(); 

         return response.data.features.map(function(place){
            return {
               id   : place.id,
               name :place.place_name,
               lon  :place.center[0],
               lat  :place.center[1],
            };
         })

      }catch (error) {
       
         return [];
      }

   }

   async searchClimate(place_select){

      try{

         const instance = axios.create({
            baseURL: 'https://api.openweathermap.org/data/2.5/weather',
            params: this.getCredentialOpenweather(place_select),
         });

         let response = await instance.get();
       
         const {weather, main}  = response.data; 

        
         return {
            'desc' : weather[0].description,
            'min'  : main.temp_min,
            'max'  : main.temp_max,
            'temp' : main.temp,
         };

      }catch (error) {
       
         return [];
      }

      
   }


}


module.exports = Busquedas;