const { Team } = require('../db');
const axios = require('axios');
const URL = 'http://localhost:5000/drivers';

const teamClean = (drivers) => {
    const uniqueTeams = new Set();

    drivers.forEach((driver) => {
        if(driver.teams){
            const teamsArray = driver.teams.split(',').map((team) => team.trim());
            teamsArray.forEach((team) => {
                if(team.length > 0) {
                    uniqueTeams.add(team);
                }
            });
        }
    });
    return [...uniqueTeams];
};


const gTeams = async () => {
    const response = await axios(URL);
    const teams = teamClean(response.data);

    const inDbTeams = await Team.findAll();

    if(inDbTeams.length === 0){
        //* La base de datos está vacía, asi que creamos los equipos.
        await Promise.all(
            teams.map(async (team) => {
                try {
                    const [newTeam, created] = await Team.findOrCreate({
                        where: {name: team},
                        defaults: {name: team},
                    });

                } catch (error) {
                    throw new Error (`Error when creating the equipment ${team}:`, error);
                }
            })
        );
    }
    return teams;
};

module.exports = {
    gTeams
}