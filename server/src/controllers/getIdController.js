const axios = require('axios');
const { Driver, Team } = require('../db');
const { mapDrivers } = require('../controllers/getDrivers');

const gId = async ( id, source ) => {
    let driver;
    if(source === 'api'){
        const response = await axios.get(`http://localhost:5000/drivers/${id}`)
        driver = response.data;
    }else{
        driver = await Driver.findByPk(id, {include: [Team]});
    }

    if(driver){
        const drivers = mapDrivers([driver]);
        return drivers[0];
    }else{
        throw new Error(`Driver with ID ${id} not found`);
    }
};

module.exports = {
    gId
}