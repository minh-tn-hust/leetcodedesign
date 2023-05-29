module.exports = (sequelize, Sequelize) => {
    const TestcaseFile = sequelize.define("testcasefile", {
        filename : {
            type : Sequelize.TEXT
        },
        originalFile : {
            type : Sequelize.TEXT
        },
        mimetype : {
            type : Sequelize.TEXT
        },
        path: {
            type : Sequelize.TEXT
        }
    });

    return TestcaseFile;
};
