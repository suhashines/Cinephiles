const database = require('../database/database');


function getInsertionId(result,primaryKey){

    console.log(primaryKey);

    const len = result.length  ;

    const prevId = result[len-1].primaryKey ;

    const newId = prevId + 1;

    console.log(newId);

    return newId ;
}

module.exports = {getInsertionId};