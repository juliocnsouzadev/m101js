//Insert:
db.fruit.insert({'name': 'apple', 'color': 'red', 'shape': 'round'})

//Find all:
db.fruit.find().pretty()

//Find one:
db.fruit.findOne()

//Find one with (first argmument: where) (second argument: what to show)
db.fruit.findOne({'name': 'apple'}, {'name': true, '_id': false})

//Use findOne on the collection users to find one document where the key username is "dwight", and retrieve only the key named email.
db.users.findOne({'username': 'dwight'}, {'email': true, '_id': false})

//Supposing a scores collection similar to the one presented, how would you find all documents with type: essay and score: 50 and only retrieve the student field?
db.scores.find({'type': 'essay', 'score': 50}, {'_id': false, 'student': true})

//$gt greater than - $less than
db.scores.find({score: {$gt: 95, $lt: 98}})

//finds documents with a score between 50 and 60, inclusive
db.scores.find({score: {$gte: 50, $lte: 60}});

//Which of the following will find all users with name between "F" and "Q" (Inclusive)?
db.users.find({name: {$gte: "F", $lte: "Q"}});
//or
db.users.find({name: {$gte: "F", $lte: "Q"}});

//find all that have names
db.users.find({name: {$exists: true}});

//find all that have names of string type
db.users.find({name: {$type: 2}});

//using regex -> all names with 'a' in anywhere in the name
db.users.find({name: {$regex: 'a'}});

//using regex -> all names with 'a' at the end
db.users.find({name: {$regex: 'a$'}});

//using regex -> all names with 'a' as first char
db.users.find({name: {$regex: '^a'}});

//Write a query that retrieves documents from a users collection where the name has a "q" in it, and the document has an email field.
db.users.find({name: {$regex: "q"}, email: {$exists: true}});

//How would you find all documents in the scores collection where the score is less than 50 or greater than 90?
db.scores.find({$or: [{score: {$lt: 50}}, {score: {$gt: 90}}]});

//Find all documents with score between 50 and 60
db.scores.find({score: {$gt: 50}, score : {$lt: 60}}); //won't work
db.scores.find({$and: [{score: {$gt: 50}}, {score: {$lt: 60}}]}); //ok

//find in arrays
db.products.find({tags: "shiny"});
//can return this :{ _id : 1040 , name : "Snappy Snap-o-lux", tags : "shiny" }
//or :{ _id : 42 , name : "Whizzy Wiz-o-matic", tags : [ "awesome", "shiny" , "green" ] }

//do this inserts
db.users.insert(
        {name: "William", friends: ["Bob", "Fred"], favorites: ["hamburgers", "running"]});
db.users.insert({name: "Stephen", friends: ["Joe", "Pete"], favorites: ["pickles", "swimming"]});
db.users.insert({name: "Cliff", friends: ["Pete", "Joe", "Tom", "Bob"], favorites: ["pickles", "cycling"]});
db.users.insert({name: "Harry", friends: ["Joe", "Bob"], favorites: ["hot dogs", "swimming"]});
//than if you do the query:
db.users.find({friends: {$all: ["Joe", "Bob"]}, favorites: {$in: ["running", "pickles"]}});
//what's the result?
//this: { name : "Cliff" , friends : [ "Pete" , "Joe" , "Tom" , "Bob" ] , favorites : [ "pickles", "cycling" ] }
//$all must have all parameters in the array, $in must hava at least one

/*
 * Suppose a simple e-commerce product catalog called catalog with documents that look like this:
 { product : "Super Duper-o-phonic",
 price : 100000000000,
 reviews : [ { user : "fred", comment : "Great!" , rating : 5 },
 { user : "tom" , comment : "I agree with Fred, somewhat!" , rating : 4 } ],
 ... }
 Write a query that finds all products that cost more than 10,000 and that have a rating of 5 or better.
 */
db.catalog.find({price: {$gt: 10000}, "reviews.rating": {$gte: 5}});