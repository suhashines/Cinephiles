const db = require('../database/database');

async function genre(req,res){

    let name = req.body.genre ;


    let sql,current,upcoming ;

    sql = 
    `
    SELECT *
    FROM movies m
    WHERE m_id IN 
    (SELECT m_id
    FROM MOVIEGENRES mg,genres g
    WHERE mg.gn_id = g.gn_ID
    AND  (utl_match.edit_distance(lower(g.name),lower(:name)) <= 3
            OR instr(lower(g.name),lower(:name))=1 )
    )
     and 
        
        (m_id IN 
        (
        SELECT m_id FROM MOVIETHEATRES mt WHERE mt.MT_ID
        in 
       (SELECT mt_id FROM SHOWTIMES s WHERE s.DATE_TIME>=sysdate and s.date_time <= sysdate + 14) ) )
       
        order by release_date desc  ` ;

    current = (await db.execute(sql,{name:name})).rows ;


    sql = 
    `
    SELECT *
    FROM movies m
    WHERE m_id IN 
    (SELECT m_id
    FROM MOVIEGENRES mg,genres g
    WHERE mg.gn_id = g.gn_ID
    AND  (utl_match.edit_distance(lower(g.name),lower(:name)) <= 3
            OR instr(lower(g.name),lower(:name))=1 )
    )
     and 
        NOT EXISTS (
        
            SELECT *
            FROM SHOWTIMES s,MOVIETHEATRES mt
            WHERE s.MT_ID = mt.MT_ID 
            AND s.DATE_TIME >=sysdate AND s.DATE_TIME <=sysdate+14
            AND mt.M_ID = m.m_id
            ) 
            
            AND EXISTS (
            
            
            SELECT *
            FROM SHOWTIMES s,MOVIETHEATRES mt
            WHERE s.MT_ID = mt.MT_ID 
            AND s.DATE_TIME >sysdate+14
            AND mt.M_ID = m.m_id
            
            ) 
         ORDER BY RELEASE_DATE DESC
    
    `
    
    upcoming = (await db.execute(sql,{name:name})).rows ;

    res.json({current:current,upcoming:upcoming});

}


async function director(req,res){

    const name = req.body.director ;

    console.log("got director name ",name);

    let sql,current,upcoming ;

    sql = 
    `
    SELECT * 
    FROM movies
    WHERE d_id in 
    (SELECT d_id 
        FROM directors d
        where utl_match.edit_distance(lower(name),lower(:name)) <= 10
        OR instr(lower(d.name),lower(:name))>0
    ) and 
    m_id IN 
    (SELECT m_id FROM MOVIETHEATRES mt WHERE mt.MT_ID  in 
    (SELECT mt_id FROM SHOWTIMES s WHERE s.DATE_TIME>=sysdate and s.date_time <= sysdate + 14) )
    order by release_date desc ` ;

    current = (await db.execute(sql,{name:name})).rows ;


    sql = 
    `
    SELECT *
    FROM movies m
    
    WHERE NOT EXISTS (
    
    SELECT *
    FROM SHOWTIMES s,MOVIETHEATRES mt
    WHERE s.MT_ID = mt.MT_ID 
    AND s.DATE_TIME >=sysdate AND s.DATE_TIME <=sysdate+14
    AND mt.M_ID = m.m_id
    ) 
    
    AND EXISTS (
    
    
    SELECT *
    FROM SHOWTIMES s,MOVIETHEATRES mt
    WHERE s.MT_ID = mt.MT_ID 
    AND s.DATE_TIME >sysdate+14
    AND mt.M_ID = m.m_id
    
    ) AND 
    d_id in
    (SELECT d_id 
        FROM directors d
        where utl_match.edit_distance(lower(name),lower(:name)) <= 10
        OR instr(lower(d.name),lower(:name))>0
    )
    
    `
    
    upcoming = (await db.execute(sql,{name:name})).rows ;

    res.json({current:current,upcoming:upcoming});

}


async function range(req,res){

    const {start,finish} = req.body ;

    let sql,current,upcoming ;

    sql = 
    `
    SELECT *
   FROM movies m
   WHERE duration BETWEEN ${start} AND ${finish}
   and 
   m_id IN 
    (SELECT m_id FROM MOVIETHEATRES mt WHERE mt.MT_ID  in 
    (SELECT mt_id FROM SHOWTIMES s WHERE s.DATE_TIME>=sysdate and s.date_time <= sysdate + 14) )
    order by release_date desc`

    current = (await db.execute(sql,{})).rows ;

    sql=
    `
   
    SELECT *
    FROM movies m
    
    WHERE NOT EXISTS (
    
    SELECT *
    FROM SHOWTIMES s,MOVIETHEATRES mt
    WHERE s.MT_ID = mt.MT_ID 
    AND s.DATE_TIME >=sysdate AND s.DATE_TIME <=sysdate+14
    AND mt.M_ID = m.m_id
    ) 
    
    AND EXISTS (
    
    
    SELECT *
    FROM SHOWTIMES s,MOVIETHEATRES mt
    WHERE s.MT_ID = mt.MT_ID 
    AND s.DATE_TIME >sysdate+14
    AND mt.M_ID = m.m_id
    
    ) and 

    m.duration >=${start} AND m.duration <=${finish}

    `

    upcoming = (await db.execute(sql,{})).rows;

    res.json({current,upcoming}); 

}


async function title(req,res){

   const title = req.body.title ;

   let sql,upcoming,current;

   sql = 
   `
      
  SELECT * 
  FROM movies m
  WHERE
  ( lower(m.title) LIKE generate_format(lower(:title)) or utl_match.edit_distance(lower(m.title),lower(:title)) <= 4 )
    and 
    
    (m_id IN 
    (
    SELECT m_id FROM MOVIETHEATRES mt WHERE mt.MT_ID
    in 
   (SELECT mt_id FROM SHOWTIMES s WHERE s.DATE_TIME>=sysdate and s.date_time <= sysdate + 14) ) )
   
    order by release_date desc  
   
   `

   current = (await db.execute(sql,{title:title})).rows ;


   sql = 
   `
   SELECT * 
  FROM movies m
  WHERE
  ( lower(m.title) LIKE generate_format(lower(:title)) or utl_match.edit_distance(lower(m.title),lower(:title)) <= 4 )
    and 
    NOT EXISTS (
    
        SELECT *
        FROM SHOWTIMES s,MOVIETHEATRES mt
        WHERE s.MT_ID = mt.MT_ID 
        AND s.DATE_TIME >=sysdate AND s.DATE_TIME <=sysdate+14
        AND mt.M_ID = m.m_id
        ) 
        
        AND EXISTS (
        
        
        SELECT *
        FROM SHOWTIMES s,MOVIETHEATRES mt
        WHERE s.MT_ID = mt.MT_ID 
        AND s.DATE_TIME >sysdate+14
        AND mt.M_ID = m.m_id
        
        ) `


        upcoming = (await db.execute(sql,{title:title})).rows;

      res.json({current,upcoming});

}


async function getAllMovies(req,res){

    const title = req.body.title ;

   let sql;

   sql = 
   `SELECT * 
  FROM movies m
  WHERE
  lower(m.title) LIKE generate_format(lower(:title))
  or utl_match.edit_distance(lower(m.title),lower(:title)) <= 4 `

  let movies = (await db.execute(sql,{title:title})).rows ;

  res.json({movies});


}



async function actor(req,res){


    let name = req.body.actor ;


    let sql,current,upcoming ;

    sql = 
    `
    

SELECT *
FROM movies 
WHERE m_id IN 
(SELECT m_id
FROM MOVIEACTORS ma,actors a
WHERE ma.a_id = a.A_ID
AND  (utl_match.edit_distance(lower(a.name),lower(:name)) <= 5
        OR instr(lower(a.name),lower(:name))=1 )
)
 and 
    
    (m_id IN 
    (
    SELECT m_id FROM MOVIETHEATRES mt WHERE mt.MT_ID
    in 
   (SELECT mt_id FROM SHOWTIMES s WHERE s.DATE_TIME>=sysdate and s.date_time <= sysdate + 14) ) )
   
    order by release_date desc   ` ;

    current = (await db.execute(sql,{name:name})).rows ;


    sql = 
    `
    
SELECT TITLE,GETaLLACTORS(M_ID)
FROM movies M
WHERE m_id IN 
(SELECT m_id
FROM MOVIEACTORS ma,actors a
WHERE ma.a_id = a.A_ID
AND  (utl_match.edit_distance(lower(a.name),lower(:name)) <= 5
        OR instr(lower(a.name),lower(:name))=1 )
)
 and 
    NOT EXISTS (
    
        SELECT *
        FROM SHOWTIMES s,MOVIETHEATRES mt
        WHERE s.MT_ID = mt.MT_ID 
        AND s.DATE_TIME >=sysdate AND s.DATE_TIME <=sysdate+14
        AND mt.M_ID = m.m_id
        ) 
        
        AND EXISTS (
        
        
        SELECT *
        FROM SHOWTIMES s,MOVIETHEATRES mt
        WHERE s.MT_ID = mt.MT_ID 
        AND s.DATE_TIME >sysdate+14
        AND mt.M_ID = m.m_id
        
        ) 
     ORDER BY RELEASE_DATE DESC
    
    `
    
    upcoming = (await db.execute(sql,{name:name})).rows ;

    res.json({current:current,upcoming:upcoming});

}
module.exports =
{title,genre,director,range,actor,getAllMovies};