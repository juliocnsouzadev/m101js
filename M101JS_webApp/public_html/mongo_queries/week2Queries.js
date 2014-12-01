//Insert():
db.fruit.insert({'name': 'apple', 'color': 'red', 'shape': 'round'})

//Find():
db.fruit.find().pretty()

//FindOne():
db.fruit.findOne()

//FindOne with (first argmument: where) (second argument: what to show)
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

/*
 Recall the documents in the scores collection:
 {
 "_id" : ObjectId("50844162cb4cf4564b4694f8"),
 "student" : 0,
 "type" : "exam",
 "score" : 75
 }
 Write a query that retrieves exam documents, sorted by score in descending order, skipping the first 50 and showing only the next 20.
 */
db.scores.find({type: "exam"}).sort({score: -1}).skip(50).limit(20);

//count
db.scores.count({type: "exam"});

//How would you count the documents in the scores collection where the type was "essay" and the score was greater than 90?
db.scores.count({type: "essay", score: {$gt: 90}});

//update
/*
 Let's say you had a collection with the following document in it:
 { "_id" : "Texas", "population" : 2500000, "land_locked" : 1 }
 and you issued the query:
 db.foo.update({_id:"Texas"},{population:30000000})
 What would be the state of the collection after the update?
 */
//{ "_id" : "Texas", "population" : 30000000 }

//update just a part of the objetc, not replace all
//set -> subtitute or add just the value
db.users.update({name: "Jordan"}, {$set: {age: 28}});
//inc -> increment
db.users.update({name: "Jordan"}, {$inc: {age: 1}}); //now the age is 29

/*
 For the users collection, the documents are of the form
 {
 "_id" : "myrnarackham",
 "phone" : "301-512-7434",
 "country" : "US"
 }
 Please set myrnarackham's country code to "RU" but leave the rest of the document (and the rest of the collection) unchanged.
 */
db.users.update({_id: "myrnarackham"}, {$set: {country: "RU"}});

//remove fields
db.users.update({name: "Jordan"}, {$unset: {age: 1}});

/*
 Write an update query that will remove the "interests" field in the following document in the users collection.
 {
 "_id" : "jimmy" ,
 "favorite_color" : "blue" ,
 "interests" : [ "debating" , "politics" ]
 }
 Do not simply empty the array. Remove the key : value pair from the document.
 */
db.users.update({_id: "jimmy"}, {$unset: {interests: 1}});

/*
 * USING $PUSH, $POP, $PULL, $PUSHALL, $PULLALL, $ADDTOSET
 Suppose you have the following document in your friends collection:
 { _id : "Mike", interests : [ "chess", "botany" ] }
 What will the result of the following updates be?
 db.friends.update( { _id : "Mike" }, { $push : { interests : "skydiving" } } );
 db.friends.update( { _id : "Mike" }, { $pop : { interests : -1 } } );
 db.friends.update( { _id : "Mike" }, { $addToSet : { interests : "skydiving" } } );
 db.friends.update( { _id : "Mike" }, { $pushAll: { interests : [ "skydiving" , "skiing" ] } } );
 */
//{ _id : "Mike" , "interests" : [ "botany", "skydiving", "skydiving", "skiing" ] }

//upsert add and document does not exist, something like "create or update"
/*
 After performing the following update on an empty collection
 What could be a document in the collection?
 */
db.foo.update({username: 'bar'}, {'$set': {'interests': ['cat', 'dog']}}, {upsert: true});
db.foo.find().pretty();
//result:
/*
 {
 "_id" : ObjectId("547a41dea22b8d44d3cb9f3f"),
 "interests" : [
 "cat",
 "dog"
 ],
 "username" : "bar"
 }
 */