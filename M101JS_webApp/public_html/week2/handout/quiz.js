//NODE.JS DRIVER: FIND, FINDONE, AND CURSORS
//execute after import the grandes.json
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101js', function (err, db)
{
    console.log("conectou...");
    if (err)
        throw err;

    var query = {'grade': 100};

    function callback(err, doc) {
        if (err)
            throw err;
        console.dir(doc);

        db.close();
    }
    /* Answer */
    db.collection('grades').findOne(query, callback);
});