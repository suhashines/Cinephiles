const database = require('../database/database');
// get all cities

async function getAllCities(req,res){

    let sql,result;

    sql = `select distinct city from theatres order by city` ;

    result = (await database.execute(sql,{})).rows ;

    cities = [] ;

    for(let i=0;i<result.length;i++){

      cities.push(result[i].CITY);
    }

    res.json({cities});
}


async function getTheatreByCity(req,res){

    const city = req.query.city ;

    sql = `select t_id,(name||','||building||','||road||','||city) location from theatres where lower(city)=lower('${city}')` ;

    result = (await database.execute(sql,{})).rows ;

    res.json({result});
}


async function getTheatreMovies(req,res){

    let sql,result ;

    let t_id = req.params.id ;

    sql = `SELECT * 
    FROM movies
    WHERE m_id IN 
    (SELECT m_id FROM MOVIETHEATRES WHERE t_id = :t_id ) ` ;

    result = (await database.execute(sql,{t_id:t_id})).rows ;


    console.log("all movies ",result.length);


    res.json({movies:result});

}


async function getCurrentMovies(req,res){


    let t_id = req.params.id ;

    let sql,movies ;

    sql =
        `SELECT * 
        FROM movies
        WHERE m_id IN 
        (SELECT m_id FROM MOVIETHEATRES mt WHERE mt.MT_ID  in
        (SELECT mt_id FROM SHOWTIMES s WHERE s.DATE_TIME>=sysdate and s.DATE_TIME <= sysdate + 14)
        AND mt.t_id = :t_id )`;

    movies = (await database.execute(sql,{t_id:t_id})).rows ;

    for(let i=0;i<movies.length;i++){
      let m_id = movies[i].M_ID;

      sql = 
       `
      SELECT DISTINCT to_char(date_time,'DD-MON-YY') dates,date_time
      FROM MOVIETHEATRES mt,showtimes sh
      WHERE mt.MT_ID = sh.MT_ID 
      AND mt.t_id = ${t_id} AND mt.m_id = ${m_id}
      ORDER BY date_time
      `

      let date = (await database.execute(sql,{})).rows;

      movies[i].DATE = date ;
    }


    for(let i=0;i<movies.length;i++){

      let date = movies[i].DATE ;

      let showtimes = [];

      for(let j=0;j<date.length;j++){

        showtimes.push(date[j].DATES);

      }

      movies[i].DATE = showtimes;
    }

    console.log("currently showing ",movies.length);

    res.json({movies:movies});
}




async function getComingSoonMovies(req,res){


    
    let t_id = req.params.id ;

    let sql,movies ;

    sql = 
    `SELECT *
    FROM movies m
    
    WHERE NOT EXISTS (
    
    SELECT *
    FROM SHOWTIMES s,MOVIETHEATRES mt
    WHERE s.MT_ID = mt.MT_ID 
    AND mt.t_id = :t_id
    AND s.DATE_TIME >=sysdate AND s.DATE_TIME <=sysdate+14
    AND mt.M_ID = m.m_id
    ) 
    
    AND EXISTS (
    
    
    SELECT *
    FROM SHOWTIMES s,MOVIETHEATRES mt
    WHERE s.MT_ID = mt.MT_ID 
    AND mt.t_id = :t_id
    AND s.DATE_TIME >sysdate+14
    AND mt.M_ID = m.m_id
    
    )`

    movies = (await database.execute(sql,{t_id:t_id})).rows ;

    console.log("coming soon ",movies.length);

    res.json({movies:movies});

}


async function getMovieShowtimes(req,res){

   const {t_id,m_id,date} = req.query ;

  

   if(!date){
    console.log("no date given");

    // now I have to process only t_id and m_id 

    let sql,dates ;

    sql= 
    `SELECT to_char(DATE_TIME,'DD-MON-YY') extracted_date 
    FROM SHOWTIMES s,MOVIETHEATRES mt 
    WHERE s.MT_ID = mt.MT_ID AND mt.m_id = :m_id AND mt.T_ID = :t_id AND s.DATE_TIME <= SYSDATE +14`;

    dates = (await database.execute(sql,{t_id:t_id,m_id:m_id})).rows ;

    return res.json({dates});

   }

   console.log("date was given ,type",typeof(date),date);

   // hence I've to process t_id,m_id and date 

   let sql,showtimes ;

   sql = 
   
   `SELECT to_char(DATE_TIME,'HH12:MI AM') extracted_TIME 
   FROM SHOWTIMES s,MOVIETHEATRES mt 
   WHERE s.MT_ID = mt.MT_ID AND 
   mt.m_id = :m_id AND 
   mt.T_ID = :t_id AND 
   TO_CHAR(s.DATE_TIME,'DD-MON-YY') = '${date}'  ` ;

   showtimes = (await database.execute(sql,{t_id:t_id,m_id:m_id})).rows;

   res.json({showtimes}); 


}



async function getMovieGalleries(req,res){

    const {t_id,m_id,date} = req.query ;
 
   
 
    if(!date){
     console.log("no date given");
 
     // now I have to process only t_id and m_id 
 
     let sql,dates ;
 
     sql= 
     `SELECT distinct to_char(DATE_TIME,'DD-MON-YY') extracted_date
     FROM SHOWTIMES s,MOVIETHEATRES mt 
     WHERE s.MT_ID = mt.MT_ID AND mt.m_id = :m_id AND mt.T_ID = :t_id AND s.DATE_TIME <= SYSDATE +14`;
 
     dates = (await database.execute(sql,{t_id:t_id,m_id:m_id})).rows ;
 
     return res.json({dates});
 
    }
 
    // hence I've to process t_id,m_id and date 
 
    let sql,galleries ;
 
    sql = 
    
    `SELECT s.g_id,(SELECT name FROM galleries g WHERE g.G_ID=s.G_ID)name,s.SHOW_ID 
    FROM SHOWTIMES s,MOVIETHEATRES mt 
    WHERE s.MT_ID = mt.MT_ID AND 
    mt.m_id = :m_id AND 
    mt.T_ID = :t_id AND 
    TO_CHAR(s.DATE_TIME,'DD-MON-YY') = '${date}'  ` ;
 
    galleries = (await database.execute(sql,{t_id:t_id,m_id:m_id})).rows;

    for(let i=0;i<galleries.length;i++){

        let g_id = galleries[i].G_ID ;
        let show_id = galleries[i].SHOW_ID;
        let time;

        sql = 
        `
        select to_char(date_time,'HH12:MI AM') showtimes
        from showtimes s
        where s.show_id = :show_id and s.g_id=:g_id 
        and to_char(s.date_time,'DD-MON-YY') = '${date}'
        `

        time = (await database.execute(sql,{show_id:show_id,g_id:g_id})).rows;

        galleries[i].TIMES = time ;
    }

    console.log(galleries);

    // console.log(galleries[0].TIMES[0].SHOWTIMES);

    res.json({galleries});
 
 
 }


 async function addTheatre(req,res){

    console.log(req.body)

    const {name,manager_id,building,road,city,count} = req.body ;

    let sql,result,t_id ; 

    sql = 
    `
    select t_id from theatres
    order by t_id desc 
    fetch first 1 row only
    `


    result = (await database.execute(sql,{})).rows ;

    t_id = result[0].T_ID + 1 ;


    sql = 
    `
    insert into theatres(t_id,name,ad_id,building,road,city)
    values(${t_id},'${name}',${manager_id},'${building}','${road}','${city}')
    `

    await database.execute(sql,{}) ;

    // theatre has been added, now I fetch gallery id

    let galleries  = [];

    sql = 
    `
    select g_id from galleries
    order by g_id desc 
    fetch first 1 row only
    `

    result = (await database.execute(sql,{})).rows ;

    let g_id = result[0].G_ID + 1 ;

    for(let i=0;i<count;i++){
        galleries.push(g_id+i);
    }

    res.json({message:"Theatre Added",t_id:t_id,galleries:galleries}) ;

 }


 async function addGallery(req,res,next){

    const {g_id,t_id,name,tiers,columns,price} = req.body ;

    let sql =
    `
    insert into galleries(g_id,tiers,t_id,name,columns)
    values(${g_id},${tiers},${t_id},'${name}',${columns})
    
    `

    await database.execute(sql,{}) ;

    console.log("gallery added ",g_id," moving to seats");

    next();

 }

 async function addSeats(req,res){

    const {g_id,t_id,name,tiers,columns,price} = req.body ;

    let seats = generateSeats(tiers,columns);

    console.log("got the seats ",seats);

    for(let i=0;i<seats.length;i++){
        let s_id = seats[i];

        let sql = 
        `
        insert into seats
        values('${s_id}','Regular',${price},${g_id})
        
        `

        await database.execute(sql,{});
    }

    console.log("all the seats are added,aborting");

    res.json({g_id:g_id,t_id:t_id,seats});

 }


 function generateSeats(row, col) {
    const labels = [];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
    for (let i = 0; i < row; i++) {
      for (let j = 1; j <= col; j++) {

        let cnt = Math.floor(Math.log(i)/Math.log(26));
        let str='';

        for(let k=0;k<cnt;k++){
            str = str+alphabet[k];
        }

        let label = str + alphabet[Math.floor(i % 26)] + j;
        labels.push(label);
      }
    }
  
    return labels;
  }

  async function addPremium(req,res){

    const {g_id,seats,price} = req.body;

    for(let i=0;i<seats.length;i++){

        let s_id = seats[i];

        console.log(s_id);

        let sql =
        `
        update seats s
        set s.price = ${price} , s.category = 'Premium'
        where s.s_id = '${s_id}' and  s.g_id = ${g_id} `

        await database.execute(sql,{});
    }

    res.json({message:"everything added successfully"});


  }

  async function editTheatre(req,res){

    const {name,building,road,city,t_id} = req.body;

    sql =
    `
    update theatres
    set name = '${name}',building='${building}',road = '${road}',city='${city}'
    where t_id = ${t_id}` 

    await database.execute(sql,{}) ;  


    res.json({message:"Edited"});
  }

  async function getTheatreDetails(req,res){

    let t_id = req.params.id ;

    let theatre ;

    sql=
    `
    select * from theatres
    where t_id = ${t_id}
    `

    theatre = (await database.execute(sql,{})).rows;

    res.json({theatre:theatre[0]});
  }

  async function addMovieToTheatre(req,res){

    const{m_id,t_id} = req.body;

    let sql,result,mt_id ;

    sql=
    `
    select mt_id 
    from movieTheatres
    where m_id=${m_id} and t_id=${t_id}
    `

    result = (await database.execute(sql,{})).rows;

    if(result.length!=0){

        console.log("already added,aborting");

         mt_id = result[0].MT_ID;
    }else{

        sql = `
    select mt_id from movieTheatres
    order by mt_id desc
    fetch first 1 row only
    
    `

    result = (await database.execute(sql,{})).rows;

    mt_id = result[0].MT_ID + 1;

    sql=
    `
    insert into movieTheatres
    values(${mt_id},${m_id},${t_id})
    `

    await database.execute(sql,{});

    }

    let galleries;

    sql=
    `
    select * from galleries
    where t_id=${t_id}
    `

    galleries = (await database.execute(sql,{})).rows;

    res.json({message:"Movie Added to theatre",mt_id:mt_id,galleries});

  }

  async function deleteTheatre(req,res){

    let t_id = req.query.t_id ;

    console.log("request received for vanishing theatre ",t_id);

    let sql=
    `
    delete 
    from theatres 
    where t_id = ${t_id}
    
    `
    try{
       await database.execute(sql,{}) ;
    }catch(err){
      console.log(err);
    }
   

    res.json({success:true,message:"Theatre Deleted Successfully"});

  }


  async function movieStat(req,res){

    let {t_id,m_id} = req.query ;

    let sql,stats,total ;

    sql = 
    `
      SELECT TO_CHAR(B.BOOK_DATE,'DD-MON-YY') dates ,count(b.BOOK_ID) booking, sum(s.price) earning
      FROM bookings b,SHOWTIMES sh,MOVIETHEATRES mt,seats s
      WHERE b.SHOW_ID = sh.SHOW_ID
      AND sh.MT_ID = mt.MT_ID
      AND b.S_ID = s.S_ID 
      AND sh.G_ID = s.G_ID 
      AND m_id = ${m_id} 
      AND t_id = ${t_id}
      GROUP BY to_char(b.BOOK_DATE,'DD-MON-YY')
      ORDER BY dates DESC
    `
    stats = (await database.execute(sql,{})).rows;


    sql = 
    `
    SELECT sum(s.price) earning
    FROM bookings b,SHOWTIMES sh,MOVIETHEATRES mt,seats s
    WHERE b.SHOW_ID = sh.SHOW_ID
    AND sh.MT_ID = mt.MT_ID
    AND b.S_ID = s.S_ID 
    AND sh.G_ID = s.G_ID 
    AND m_id = ${m_id} 
    AND t_id = ${t_id}
    `

    total = (await database.execute(sql,{})).rows[0].EARNING ;

    res.json({stats:stats,total:total});

  }

  async function deleteMovie(req,res){

    const {m_id,t_id} = req.query;

    let sql = 
    `
    delete from 
    movieTheatres 
    where m_id= ${m_id} and t_id = ${t_id}`  

    await database.execute(sql,{});

    res.json({message:"movie deleted successfully"});
 
  }
 

module.exports = 
{getAllCities,
getTheatreByCity,
getTheatreMovies,
getCurrentMovies,
getComingSoonMovies,
getMovieShowtimes,
getMovieGalleries,
addTheatre,
addGallery,
addSeats,
addPremium,
editTheatre,
getTheatreDetails,
addMovieToTheatre,
deleteTheatre,
movieStat,
deleteMovie};