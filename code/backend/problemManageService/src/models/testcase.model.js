module.exports = (sequelize, Sequelize) => {
    const Testcase = sequelize.define("testcases", {
        explanation: {
            type: Sequelize.TEXT
        },
        isExample: {
            type: Sequelize.BOOLEAN
        },
        inp: {
            type: Sequelize.BLOB('long')
        },
        out: {
            type: Sequelize.BLOB('long')
        },
        ownerId : {
            type: Sequelize.INTEGER
        }
    });

    return Testcase;
};
