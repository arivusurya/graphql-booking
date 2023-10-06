const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            creatEvent(name:String):String
        }
      

        schema {
            query: RootQuery
            mutation:RootMutation
            
        }  
    `),
    rootValue: {
      events: () => {
        return ["Elegent", "sailing", "All-night Coding"];
      },
      creatEvent: (args) => {
        const eventname = args.name;
        return eventname;
      },
    },
    graphiql: true,
  })
);

app.listen(3001, () => {
  console.log(`Server is running on: http://localhost:3001`);
});
