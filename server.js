const { GraphQLServer, PubSub } = require('graphql-yoga')
const mongoose = require('mongoose');
const typeDefs = require("./src/typeDefs");
const resolvers = require("./src/resolvers");
const url = "<mongodb url>";
const connect = mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});
connect.then((db) => {
 console.log('Connected to the Database!');      
   }, (err) => {
      console.log(err);
 });
const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    pubsub
  }
});

/*
const options = {
  port: 8000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}
server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  ),
)
*/
server.start(() => console.log('Server is running on localhost:4000'))
