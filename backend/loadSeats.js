const db = require('./database/database');


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

function generateLabels(row, col) {
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

  async function load(){

    const arr = [{category:"Regular",price:350},{category:"Premium",price:450}];

    let sql,galleries;

    sql = ' SELECT * FROM galleries g WHERE NOT exists(SELECT * FROM seats s WHERE s.g_id=g.g_id)'

    galleries = (await db.execute(sql,{})).rows ;

    let n = galleries.length;


    for(let i=0;i<n;i++){

        let index = i ;

        let g_id = galleries[i].G_ID  ;

        console.log(g_id);

        let rows = galleries[index].TIERS;

        let columns = galleries[index].COLUMNS ;

        console.log(rows,columns);

        let seats = generateLabels(rows,columns);

        console.log(seats) ;

        for(let j=0;j<seats.length;j++){

            index = getRandomInt(0,1);

            let category = arr[index].category;

            let price = arr[index].price ;

            let s_id = seats[j] ;

            console.log("seat_id: ",s_id,"g_id: ",g_id);

            sql = `insert into seats(s_id,category,price,g_id)values(:s_id,:category,:price,:g_id)` ;

            binds = {s_id:s_id,category:category,price:price,g_id:g_id};

            (await db.execute(sql,binds)) ;

        }
    }
  }

  load();