module.exports = (sequelize, Sequelize) => {
    const Problem = sequelize.define("problems", {
        problemName: {
            type: Sequelize.TEXT
        },
        description: {
            type: Sequelize.TEXT
        },
        statement: {
            type: Sequelize.TEXT
        },
        input: {
            type: Sequelize.TEXT
        },
        output: {
            type: Sequelize.TEXT
        },
        constraint: {
            type: Sequelize.TEXT
        },
        ownerId : {
            type : Sequelize.INTEGER
        }

    });

    return Problem;
};
