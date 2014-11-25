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
