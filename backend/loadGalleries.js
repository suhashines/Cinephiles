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


load();