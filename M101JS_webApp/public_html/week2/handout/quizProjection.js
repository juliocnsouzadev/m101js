/*
 QUIZ: NODE.JS DRIVER: USING FIELD PROJECTION

 Which of the following queries will cause only the 'grade' field to be returned?

 db.collection('grades')find({'grade':0,"_id:1}, callback);
 db.collection('grades')find({'grade':1,"_id:0}, callback);
 db.collection('grades')find({}, {'grade':1, '_id':0}, callback); <-
 db.collection('grades')find({}, {'grade':1}, callback);
 */

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101js', function (err, db) {
    if (err)
        throw err;



    var query = {'grade': 100};
    var projection = {'student': 1, '_id': 0};

    db.collection('grades').find(query, projection).toArray(function (err, docs) {
        if (err)
            throw err;

        docs.forEach(function (doc) {
            console.dir(doc);
            console.dir(doc.student + " got a good grade!");
        });

        db.close();
    });
});
