module.exports = (sequelize, Sequelize) => {
    const Testcase = sequelize.define("testcase", {
        explanation: {
            type: Sequelize.TEXT
        },
        isExample: {
            type: Sequelize.BOOLEAN
        },
        inp: {
            type: Sequelize.TEXT
        },
        out: {
            type: Sequelize.TEXT
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
