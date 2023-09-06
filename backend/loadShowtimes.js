const db = require('./database/database');


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  


async function load(){

 let sql,theatres ;

 sql =`SELECT * FROM theatres t WHERE NOT EXISTS (SELECT * FROM GALLERIES g WHERE g.t_id=t.T_ID)` ;

 theatres = (await db.execute(sql,{})).rows ;

 console.log(theatres);

 let n = theatres.length;

 for(let i=0;i<n;i++){

    let index = i ;

    let t_id = theatres[index].T_ID ;

    let name = getRandomInt(1,4);

    let tiers = getRandomInt(15,20);

    let columns = getRandomInt(10,15);

    let g_id = 37 + i ;

    console.log(t_id,name,tiers,columns,g_id);


    sql = `insert into galleries(g_id,tiers,t_id,name,columns)values(:g_id,:tiers,:t_id,:name,:columns)`;

    (await db.execute(sql,{g_id:g_id,tiers:tiers,t_id:t_id,name:name,columns:columns}));
 }


}


async function loadShowtimes(){

  let sql,movieTheatres ;

  sql = `select * from movieTheatres` ;

  movieTheatres = (await db.execute(sql,{})).rows ;

  console.log(movieTheatres);


  for(let i=0;i<movieTheatres.length;i++){

    let mt_id = movieTheatres[i].MT_ID ;

    console.log(mt_id);

    let t_id = movieTheatres[i].T_ID ;

    console.log(t_id);

    sql = `select g_id from galleries where t_id=:t_id` ;

    let galleries = (await db.execute(sql,{t_id:t_id})).rows;

    console.log(galleries);

    for(let g=0;g<galleries.length;g++){

        let g_id = galleries[g].G_ID ;

        console.log(g_id);

        for(let k=0;k<3;k++){

          sql =`insert into showtimes(mt_id,g_id) values(${mt_id},${g_id})`

          (await db.execute(sql,{}));
        } 
    }

    
  }

}


async function updateShowtimes(req,res){

}


loadShowtimes();