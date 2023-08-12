const axios = require('axios');


async function populate(){
    const options = {
        method: 'GET',
        url: 'https://moviesdatabase.p.rapidapi.com/titles',
        headers: {
          'X-RapidAPI-Key': '0d447f2587msh89d82b3654d9521p1c611ejsn914d1101a1be',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data[0].titleText);
      } catch (error) {
          console.error(error);
      }
}

populate();

