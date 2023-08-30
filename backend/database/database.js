const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

oracledb.autoCommit = true;


// setting up the dotenv

const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const envVars = result.parsed;
Object.assign(process.env, envVars);

// dotenv is set


// console.log("username: ",process.env.username);
// console.log("password: ",process.env.password);


async function getConnection() {
  let connection;

  try {
    console.log("before connection");

    connection = await oracledb.getConnection({

      user: process.env.username,
      password: process.env.password,
      connectString: "localhost/orclpdb"
      
    });

    console.log("database connected successfully");
  } catch (err) {
    console.log(err.message);
  }

  return connection;
}

async function execute(sql, binds) {
  let connection, result;

  try {
    connection = await getConnection();

    result = await connection.execute(sql, binds);

  } catch (err) {
    console.log(err.message);
  }

  finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.log(err.message);
        }
      }
    }

  return result;

}




module.exports = { execute }; 
