const controller = require('../controllers/testcases/testcases.controller');
const middleware = require('../middlewares')

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/testcase/createFile",
        controller.uploadTestcaseFile
    );

    app.post(
        "/api/testcase/addTestcase",
        middleware.auth.getAuthInfoFromGateway,
        middleware.auth.isAdminOrMod,
        middleware.testcase.checkNullFields,
        controller.addTestcase
    )
};
