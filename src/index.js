const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const TrackAPI = require('./datasources/track-api');
const { PORT } = require('./configs/env.config');

const startApolloServer = async (typeDefs, resolvers) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => {
            return {
                trackAPI: new TrackAPI()
            };
        },
    });

    const { url } = await server.listen({ port: PORT || 4000 });
    console.log(`	
          🚀  Server is running	
          📭  Server ready at ${url}	
    `);
};

startApolloServer(typeDefs, resolvers);