import knex from 'knex';
import createTable from '../utils/createTableProducts.js';
import insertNewElement from '../utils/insertElement.js';
import readAllElements from '../utils/readElements.js';

class ProductContainer {
  constructor(dbConfigs, tableName) {
    this.db = knex(dbConfigs);
    this.config = dbConfigs;
    this.tableName = tableName;
    this.#existTable();
  }

  async #existTable(){
    try {
      if (!(await this.db.schema.hasTable(this.tableName))) {
        createTable(this.config, this.tableName);
      }
    } catch (error) {
      throw error;
    }
  };

  async insertProduct(productData){
    try {
      await insertNewElement(this.config, this.tableName, productData);
    } catch (error) {
      throw `${error}`;
    }
  };

  async readProducts(){
    try {
      const products = await readAllElements(this.config, this.tableName);
      if (!products.length) {
        throw 'No se encontraron productos en la base de datos.';
      }
      return products;
    } catch (error) {
      throw `${error}`;
    }
  };
}
export default ProductContainer;
