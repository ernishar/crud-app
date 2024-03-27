const sequelize = require('../model/index');
const {QueryTypes} = require('sequelize');

require('../model/index')
exports.fetchData = async (req, res) => {
    try {
        const empData = await sequelize.query('SELECT * FROM `employees`', { type: QueryTypes.SELECT });
        res.json(empData)
  
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
  }

