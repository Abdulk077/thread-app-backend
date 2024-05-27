import express from 'express'
import { ApolloServer } from '@apollo/server';

import { expressMiddleware } from '@apollo/server/express4';

async function init() {
    const app = express();
    const PORT = Number(process.env.Port) || 8000;
    app.use(express.json());
// Create Graphql server 
    const gqlServer = new ApolloServer({
    typeDefs:`
        type Query {
            hello: String
        }
    `, //schema
    resolvers:{
        Query: {
            hello: () => `Hey There, i am abdul`
        }
    }, // resolver
    });

    await gqlServer.start();
    app.get("/", (req,res) => {
    res.json({ message: "Server is up and running"});
    });

    app.use("/graphql", expressMiddleware(gqlServer));
    app.listen(PORT , () => console.log(`Server started at Port:${PORT}`));
    
}
init();