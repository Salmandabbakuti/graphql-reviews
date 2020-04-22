const Movie = require('./models/mongoose_schema').Movies;
const resolvers = {
  Query: {
    getMovies: (parent, args) => {
      return Movie.find({});
    },
    getMovie: (parent, args) => {
      return Movie.findById(args.id);
    }
  },
  Mutation: {
    addMovie: (parent, args, { pubsub }) => {
      let movie = new Movie({
        name: args.name,
        producer: args.producer,
        rating: args.rating,
        rank: args.rank
      });
       pubsub.publish('notification', {
        notification:{
            event: 'New Movie Listed.',
            data: movie
        }
      })
      return movie.save();
    },
    updateMovie: (parent, args,{ pubsub }) => {
      if (!args.id) return;
        let data =  Movie.findOneAndUpdate(
         {
           _id: args.id
         },
         {
           $set: {
             name: args.name,
             producer: args.producer,
             rating: args.rating,
             rank: args.rank
           }
         }, {new: true}, (err, Movie) => {
           if (err) {
             console.log('Something went wrong when updating the movie');
           } else {
           	console.log("Movie Updated Successfully")
           }
         }
      );
        pubsub.publish('notification', {
        notification:{
            event: 'Movie Data Updated',
            data: {name: args.name,
             producer: args.producer,
             rating: args.rating,
             rank: args.rank
             }
        }
      })
      return data
    },
    deleteMovie: (parent, args, { pubsub }) => {
      if (!args.id) return;
         Movie.deleteOne(
         {
           _id: args.id
         },
         (err, Movie) => {
           if (err) {
             console.log('Something went wrong when deleting the movie');
           } else {
           	console.log('Movie Deletd Successfully')
           }
         }
      );
     pubsub.publish('notification', {
        notification:{
            event: 'Movie Deleted',
            data: {name:args.id}
                 }
              })
     return ({response:"Movie Deletd Successfully"})
   }
 },
   Subscription:{
    notification:{
      subscribe(parent, args, {pubsub}){
        return pubsub.asyncIterator('notification');
      }
    }
  }
 }
module.exports = resolvers;
