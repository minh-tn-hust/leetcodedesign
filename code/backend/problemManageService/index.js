const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: false
}));
app.use(bodyParser.json({limit: "50mb"}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.get("/", (req, res) => {
    res.json({message: "Welcome to minhtn3 authentication server"});
});
require('./src/routes/problem.routes')(app);
require('./src/routes/testcase.routes')(app);


// DB CONNECT
const db = require("./src/models");
const Categories = db.category;


console.log('Delay 10s before connect to DB');
setTimeout(function () {
    db.sequelize.sync({force: true}).then(() => {
        console.log('Drop and Resync Db');
        initial();
    }).catch((error) => {
        console.log(error);
    })
}, 1000)

async function initial() {
    let categories = ['array', 'string', 'hashtable', 'dynamicprogramming', 'math', 'greedy', 'sorting', 'depthfirstsearch', 'binarysearch', 'database', 'breadthfirstsearch', 'tree', 'matrix', 'twopointers', 'binarytree', 'bitmanipulation', 'heap', 'stack', 'prefixsum', 'graph', 'design', 'simulation', 'counting', 'backtracking', 'slidingwindow', 'unionfind', 'linkedlist', 'orderedset', 'monotonicstack', 'enumeration', 'recursion', 'trie', 'divideandconquer', 'binarysearchtree', 'bitmask', 'queue', 'numbertheory', 'segmenttree', 'memoization', 'geometry', 'topologicalsort', 'binaryindexedtree', 'hashfunction', 'gametheory', 'shortestpath', 'combinatorics', 'datastream', 'interactive', 'stringmatching', 'rollinghash', 'brainteaser', 'randomized', 'monotonicqueue', 'mergesort', 'iterator', 'concurrency', 'doublylinkedlist', 'probabilityandstatistics', 'quickselect', 'bucketsort', 'suffixarray', 'minimumspanningtree', 'countingsort', 'shell', 'linesweep', 'reservoirsampling', 'euleriancircuit', 'radixsort', 'stronglyconnectedcomponent', 'rejectionsampling', 'biconnectedcomponent'];
    for (let category of categories) {
        await Categories.create({
            type : category,
            ownerId : 0,
        });
    }
};

const rpcServer = require('./src/grpc/index');
rpcServer.start(50051);