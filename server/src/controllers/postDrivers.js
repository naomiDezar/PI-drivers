const axios = require('axios');
const { Driver, Team } = require('../db');
const { mapDrivers } = require('./getDrivers');

const createDriv = async (name, lastName, description, image, nationality, birthDate ) => {
    const newDriv = await Driver.create({
    name,
    lastName,
    description,
    image,
    nationality,
    birthDate
    });

    Team.forEach(async (teams) => {
        let teamsDb = await Team.findAll({
            where: {
                name: teams
            },
        });
        await newDriv.addTeams(teamsDb);
    });

    //! REVISAR ESTE PEDAZO DE CÓDIGO
    const teamDb = await Team.findAll({
        where: {
            name: Team
        }
    });

    await newDriv.addTeams(teamDb);

    await newDriv.reload({
        include: {
            model: Team,
            attibutes: ['name'],
            through: {
                attibutes: []
            }
        }
    });
    return mapDrivers(newDriv);
};


module.exports = {
    createDriv
}