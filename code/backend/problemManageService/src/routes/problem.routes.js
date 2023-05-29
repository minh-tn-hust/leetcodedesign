const controller = require('../controllers/problems/problems.controller');
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
        "/api/problem/create",
        middleware.problem.checkNullFields,
        controller.addProblem
    );

    app.post(
        "/api/problem/edit",
        controller.editProblem
    );

};
