const axios = require('axios');
const database = require('../database/database');

async function loadMovies(){

    let sql = 'select gn_id from genres' ;

    const genres = (await database.execute(sql,{})).rows;

    console.log(genres);

    for(i=0;i<genres.length;i++){

        const gn_id = genres[i].GN_ID ;

        console.log("loading from genre: ",gn_id);

        const options = {
            method: 'GET',
            url: 'https://advanced-movie-search.p.rapidapi.com/discover/movie',
            params: {
              with_genres: gn_id,
              page: 5
            },
            headers: {
              'X-RapidAPI-Key': '0d447f2587msh89d82b3654d9521p1c611ejsn914d1101a1be',
              'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              const movies = response.data.results ;

              console.log(movies);

              for(j=0;j<movies.length;j++){

                const m_id = movies[j].id ;
                const back_poster_url = movies[j].backdrop_path;
                const synopsis = movies[j].overview ;
                const poster_url = movies[j].poster_path;
                const release_date = movies[j].release_date;
                const title = movies[j].title ;

                result = (await database.execute('select m_id from movies where m_id=:m_id',{m_id:m_id})).rows;

               

                if(result.length!=0){
                    console.log(title," already exists");
                    continue;
                }

                sql = `insert into movies(m_id,title,release_date,duration,synopsis,poster_url,ad_id,d_id,back_poster_url) values(:m_id,:title,to_date(:release_date,'YYYY-MM-DD'),:duration,:synopsis,:poster_url,:ad_id,:d_id,:back_poster_url) ` ;
                binds = {m_id:m_id,title:title,release_date:release_date,duration:120,synopsis:synopsis,poster_url:poster_url,ad_id:1,d_id:1,back_poster_url:back_poster_url} ;


                (await database.execute(sql,binds));

                (await database.execute('insert into movieGenres(m_id,gn_id)values(:m_id,:gn_id)',{m_id:m_id,gn_id:gn_id}));

              }


          } catch (error) {
              console.error(error);
          }
    }
}

loadMovies();