
//This is the Cloud Function which was been used to create a Web Action which is invoked from Watson Assistant
//API Keys have been removed for security purposes
/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
  
 const fetch = require("node-fetch");

 //function for fetching the information about movie/series
 async function search(type,name) {
  let final = [];
   let db = [];
   try {
     let response = await fetch( `https://api.themoviedb.org/3/search/${type}?api_key=your_api_key&query=${name}`);
     let data = await response.json();
     db = data.results;
     final = await getProvider(type,db);
     return final;
   } catch (err) {
     console.log(err);
   }
 }
 
 //to get providers for movie/series according to movie_id/series_id
 async function getProvider(type, data) {
   try {
     let providers = await Promise.all(
       data.map(async (indiData) => {
         let response = await fetch(
           `https://api.themoviedb.org/3/${type}/${indiData.id}/watch/providers?api_key=your_api_key`
         );
         
        let data = await response.json();
        if (data.results.IN) {
            const res = {
             name:
               type === "movie"
                 ? indiData.original_title
                 : indiData.original_name,
             poster: indiData.poster_path === null ? "https://allmovies.tube/assets/img/no-poster.png" : "https://image.tmdb.org/t/p/w300/" + indiData.poster_path,
             provider_name:  data.results.IN.flatrate ? data.results.IN.flatrate[0].provider_name : "Not availabe in India"
           };
           return res;
         } 
         else {
           const res = {
             name:
               type === "movie"
                 ? indiData.original_title
                 : indiData.original_name,
                 poster: indiData.poster_path === null ? "https://allmovies.tube/assets/img/no-poster.png" : "https://image.tmdb.org/t/p/w300/" + indiData.poster_path,
             provider_name: "Not Available in India"
           };
           return res;
         }
       })
     );
     if(providers.length > 5){
         providers=providers.slice(0,5);
     }
     return providers;
   } catch (err) {
     console.log(err);
   }
 }
 
 //To fetch movies/series for a provider and specified genre 
 async function discover(type,genre,provider){
   let db = [];
   try {
     let response = await fetch(`https://api.themoviedb.org/3/discover/${type}?api_key=your_api_key&language=en-US&sort_by=popularity.desc&with_genres=${genre}&page=1&with_watch_providers=${provider}&watch_region=IN&with_watch_monetization_types=flatrate`);
     let data = await response.json();
     db = data.results;
     db = db.map((content)=>{
         const res = {
             title :type === "movie"
                 ? content.title
                 : content.original_name,
             poster: content.poster_path === null ? "https://allmovies.tube/assets/img/no-poster.png" : "https://image.tmdb.org/t/p/w300/" + content.poster_path,
         }
         return res;
     })
     return db;
   } catch (err) {
     console.log(err);
   }
 }
 
 async function main(params) {
     if(params.name){
      responses = await search(params.type,params.name);
      
     }else{
       responses = await discover(params.type,params.genre,params.provider);
     }
     
     return {first : responses[0],
      second : responses[1],
      third : responses[2],
      fourth : responses[3],
      fifth: responses[4]
};
 }