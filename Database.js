const oracledb = require("oracledb");

const dbConfig = {
  user: "system",
  password: "manager",
  connectString: "localhost:/XEXDB",
};

const Query = async (sql, binds = []) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('Connected to Oracle Database');

    const result = await connection.execute(sql, binds, { autoCommit: true });

    return result.rows;  
  } catch (error) {
    console.error('Error executing query:', error);
    return error;
  } 
};

module.exports = Query;