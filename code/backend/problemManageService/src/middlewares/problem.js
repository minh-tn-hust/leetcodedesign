checkNullFields = (req, res, next) => {
    const requiredFields = [
        'problemName',
        'description',
        'statement',
        'input',
        'output',
        'hardLevel'
    ];
    const missingFields = [];

    for (let field of requiredFields) {
        if (!req.body[field]) {
            missingFields.push(field);
        }
    }

    if (missingFields.length > 0) {
        res.status(400).json({
            listFields : missingFields,
            message: `Missing required fields`
        });
    } else {
        next();
    }
};


const problemMiddleware = {
    checkNullFields: checkNullFields
};
module.exports = problemMiddleware;
