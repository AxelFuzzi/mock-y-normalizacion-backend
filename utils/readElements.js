import mongoose from 'mongoose'
/*const readAllElements = async (option, tableName) => {
  const db = knex(option);
  try {
    const records = await db.from(tableName).select('*');
    return records;
  } catch (error) {
    throw error;
  } finally {
    db.destroy();
  }
};

export default readAllElements;*/
import conexion from '../databases/configSQLiteDB.js'

const readAllElements = ()=>{
  return conexion.find();
}
  
export default readAllElements