const db = require("../../models");

const Category = db.category;
const Problem = db.problem;

exports.addProblem = async (req, res) => {
    let {
        problemName,
        description,
        hardLevel,
        statement,
        input,
        output,
        constraint,
        categories
    } = req.body;

    let problem;
    try {
        problem = await Problem.create({
            problemName : problemName,
            hardLevel : hardLevel,
            description : description,
            statement : statement,
            input : input,
            output : output,
            constraint : constraint
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the problem."
        });
        return;
    }

    let listWrongCate = [];
    if (categories) {
        for (let category of categories) {
            let cateObj = await Category.findOne({
                where : {
                    type : category
                }
            });
            if (cateObj) {
                problem.addCategory(cateObj);
            } else {
                listWrongCate.push(category);
            }
        }
    }

    if (listWrongCate.length !== 0) {
        res.status(200).send({
            listWrongCate : listWrongCate,
            message : "Add successfully but these categories is not added"
        })
    } else {
        res.status(200).send({
            message : "Add problem successfully"
        })
    }
};

exports.editProblem = async (req, res) => {
    const { problemId, problemName, description, statement, input, output, constraint, categories } = req.body;

    try {
        const problem = await Problem.findByPk(problemId);

        if (!problem) {
            res.status(404).send({
                message: `Problem with id ${problemId} not found.`,
            });
            return;
        }

        await problem.update({
            problemName: problemName,
            description: description,
            statement: statement,
            input: input,
            output: output,
            constraint: constraint,
        });

        // Xóa tất cả các categories hiện tại của problem
        await problem.setCategories([]);

        // Thêm các categories mới vào problem
        let listWrongCate = [];
        if (categories) {
            for (let category of categories) {
                let cateObj = await Category.findOne({
                    where: {
                        type: category,
                    },
                });

                if (cateObj) {
                    await problem.addCategory(cateObj);
                } else {
                    listWrongCate.push(category);
                }
            }
        }

        if (listWrongCate.length !== 0) {
            res.status(200).send({
                listWrongCate: listWrongCate,
                message: "Problem updated successfully, but these categories were not added.",
            });
        } else {
            res.status(200).send({
                message: "Problem updated successfully.",
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while updating the problem.",
        });
    }
};

exports.addLanguage = async (req, res) => {
}

