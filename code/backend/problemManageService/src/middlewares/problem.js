checkNullFields = (req, res, next) => {
    const requiredFields = [
        'problemName',
        'description',
        'statement',
        'input',
        'output',
        'constraint'
    ];
    const missingFields = [];

    for (let field of requiredFields) {
        if (!req.body[field]) {
            missingFields.push(field);
        }
    }

    if (missingFields.length > 0) {
        res.status(400).json({
            message: `Missing required fields: ${missingFields.join(', ')}`,
        });
    } else {
        next();
    }
};


const problemMiddleware = {
    checkNullFields: checkNullFields
};
module.exports = problemMiddleware;
