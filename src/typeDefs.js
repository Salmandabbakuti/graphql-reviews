const typeDefs = `
   type Movie {
     id: ID!
     name: String!
     producer: String!
     rating: Float!
     rank:Int!
   }
   type response{
     response:String!
   }
   type Query {
     getMovies: [Movie]
     getMovie(id: ID!): Movie
   }
   type Mutation {
     addMovie(name: String!, producer: String!, rating: Float!,rank:Int!):Movie
     updateMovie(id:String!, name: String!, producer: String!, rating: Float,rank:Int!):Movie
     deleteMovie(id: ID!):response
   }
   type Subscription {
        notification: notificationPayload
    }
    
    type notificationPayload {
        event: String!
        data: Movie
    }
`
module.exports = typeDefs
