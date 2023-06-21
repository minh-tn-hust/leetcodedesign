module.exports = (sequelize, Sequelize) => {
    const Testcase = sequelize.define("testcase", {
        explanation: {
            type: Sequelize.TEXT
        },
        isExample: {
            type: Sequelize.BOOLEAN
        },
        inp: {
            type: Sequelize.TEXT('long')
        },
        out: {
            type: Sequelize.TEXT('long')
        },
        ownerId : {
            type: Sequelize.INTEGER
        },
        problemId : {
            type : Sequelize.INTEGER
        }
    });

    return Testcase;
};
