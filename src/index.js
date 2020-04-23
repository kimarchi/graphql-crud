const {GraphQLServer} = require('graphql-yoga')

let links = new Map([ [
    'link-0',
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL'
      }
]]);

const resolvers = {
    Query: {
        link: (parent, args) => {
        console.log(`Query:link id=${args.id}`);
        return links.get(args.id);
    },
        links: () => links.values(),
    },
    Mutation: {
        createLink: (parent, args) => {
            let link = {id: args.id, description: args.description, url: args.url};
            links.set(link.id, link);
            return link
        },
        updateLink: (parent, args) => {
            let link = links.get(args.id);
            link.id = args.id
            link.description = args.description
            link.url = args.url
            return link
        },
        deleteLink: (parent, args) => {
            let link = links.get(args.id);
            links.delete(args.id);
            return link;
        },


    }
}


const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    })
server.start( () => console.log(`server in running on http://localhost:4000`) );