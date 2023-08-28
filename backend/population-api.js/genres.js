const axios = require('axios');

// const database = require('../database/database');

async function loadGenres(){

const options = {
  method: 'GET',
  url: 'https://advanced-movie-search.p.rapidapi.com/genre/movie/list',
  headers: {
    'X-RapidAPI-Key': '0d447f2587msh89d82b3654d9521p1c611ejsn914d1101a1be',
    'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
  }
};

let response;

try {
	response = await axios.request(options);
	
} catch (error) {
	console.error(error);
}

const genres = response.data.genres;
console.log(genres);
const sql = 'insert into genres(gn_id,name) values(:gn_id,:name)' ;

for(i=0;i<genres.length;i++){
  let gn_id = genres[i].id ;
  let name = genres[i].name ;

  await database.execute(sql,{gn_id:gn_id,name:name});
}


}

loadGenres();
