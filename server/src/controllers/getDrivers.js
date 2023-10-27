const axios = require('axios');
const { Driver, Team } = require('../db');

const mapDrivers = (drivers) => {
    return drivers.map((driver) => {
        if(driver){
            let teams = [];
            let fromDb = false;

            if(driver.id && typeof driver.id === 'string'){
                fromDb = true;

                //! Si el id es un UUID entonces es un conductor de la DB.
                if(driver.Team && Array.isArray(driver.Team)){
                    teams = driver.Team.map((team) => team.name);
                }
            }else{
                //! Si el id es un número, entonces es un conductor de la API.
                if(typeof driver.teams === 'string'){
                    
                    //* Verificamos que 'driver.teams' sea una cadena antes de intentar dividirla.
                    teams = driver.teams.split(',').map((team) => team.trim());
                }
                if(typeof driver.name === 'string'){
                    //! Si el nombre es una cadena de texto no se puede dividir en nombre y apellido.
                    driver.name = { forename: driver.name, surname: driver.lastname};
                }
            }

            const name = driver.name.forename || driver.name;
            const lastname = driver.name.surname || driver.lastname;

            return {
                id: driver.id,
                name: name,
                lastname: lastname,
                description: driver.description,
                image: driver.image.url || driver.image,
                teams: teams,
                nationality: driver.nationality,
                birthDate: driver.dob || driver.birthdate,
                fromDb: fromDb,
            };
        }else{
            return null;
        }
    }).filter(driver => driver !== null);
};




const getDriversDb = async () => {
   const driverDb = await Driver.findAll({
    include: {
        model: Team,
        attributes: ['name', 'id'],
        through: {
            attributes: [],
        }
    }
   });
  return mapDrivers(driverDb);
} 


const getDriversApi = async () => {
   const { data } = await axios.get('http://localhost:5000/drivers');
   return data;
}

const getDrivers = async (name) => {
    const driversDb = await getDriversDb();
    const driversApi = await getDriversApi();
    const allDrivers = [...driversDb, ...driversApi];

    if(name){
        const driverFound = allDrivers.filter((driver) => {
            if(driver.name){
                if(typeof driver.name === 'string'){
                    return driver.name.toLowerCase().includes(name.toLowerCase());
                } else if (driver.name.forename && driver.name.surname){
                    const fullName = `${driver.name.forename} ${driver.name.surname}`;
                    return fullName.toLowerCase().includes(name.toLowerCase());
                }
            }
            return false;
        });

        if(driverFound.length > 0){
            return mapDrivers(driverFound.slice(0, 15));
        }else{
            return {error: 'No drivers were found with this name'};
        }
        
    }
    return mapDrivers(allDrivers);
}

module.exports = {
    getDrivers,
    mapDrivers
}