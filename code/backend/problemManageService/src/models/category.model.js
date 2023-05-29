module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("categories", {
        type: {
            type: Sequelize.TEXT
        },
        ownerId : {
            type : Sequelize.INTEGER
        }
    });

    return Category;
};
