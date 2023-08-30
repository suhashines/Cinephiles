const db = require('./database/database');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

async function load(){


    let sql, movies ,theatres ;

    try{

        sql = `select * from movies` ;

        movies = (await db.execute(sql,{})).rows ;

        sql = `select * from theatres` ;

        theatres = (await db.execute(sql,{})).rows ;

    }catch(err){
        console.log(err);
    }


     let m=movies.length ;
     let n = theatres.length ;

    for(let i=0;i<m;i++){

       let m_id = movies[i].M_ID ;

       let random = getRandomInt(0,n-1) ;

       let random2 = getRandomInt(0,n-1) ;

       let sql , mt_id ;

       try{

        mt_id = i ;

        sql = `insert into movieTheatres(mt_id,m_id,t_id) values(:mt_id,:m_id,:t_id)` ;

        
         let t_id = theatres[random].T_ID ;

        (await db.execute(sql,{mt_id:mt_id,m_id:m_id,t_id:t_id}));

        
          t_id = theatres[random2].T_ID ;

          mt_id = i+1 ;

        (await db.execute(sql,{mt_id:mt_id,m_id:m_id,t_id:t_id}));

       }catch(err){
        console.log(err);
       }
    }

}


load();