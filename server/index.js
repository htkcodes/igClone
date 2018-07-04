const express=require("express");
const graphqlHTTP=require("express-graphql");
const buildSchema=require("graphql").buildSchema;
const cors=require("cors");


let schema=buildSchema(`
type User{
    id:String!
alias:String!
avatar:String!
}
type Post{
    id:String!
user:User!
caption:String!
image:String!}

type Query{
    user(id:String):User!
post(user_id:String,post_id:String):Post!
posts(user_id:String):[Post]}

`)

// Maps id to User object
let userslist = {
    a: {
      id: "a",
      alias: "htk_codes",
      avatar: "https://www.laravelnigeria.com/img/chris.jpg"
    },
    b: {
      id: "b",
      alias: "OG",
      avatar:
        "http://res.cloudinary.com/og-tech/image/upload/q_40/v1506850315/contact_tzltnn.jpg"
    }
  };
  
  let postslist = {
    a: {
      a: {
        id: "a",
        user: userslist["b"],
        caption: "Moving the community!",
        image: "https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg"
      },
      b: {
        id: "b",
        user: userslist["a"],
        caption: "Angular Book :)",
        image:
          "https://cdn-images-1.medium.com/max/1000/1*ltLfTw87lE-Dqt-BKNdj1A.jpeg"
      },
      c: {
        id: "c",
        user: userslist["a"],
        caption: "Me at Frontstack.io",
        image: "https://pbs.twimg.com/media/DNNhrp6W0AAbk7Y.jpg:large"
      },
      d: {
        id: "d",
        user: userslist["a"],
        caption: "Moving the community!",
        image: "https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg"
      }
    }
  };

  let root={
      user:function({id})
      {
          return userslist[id];
      },
      post:function({user_id,post_id})
      {
          return postslist[user_id][post_id];
      },
      posts:function({user_id})
      {
          return Object.values(postslist[user_id])
      }
  }

  let app=express();

  app.use(cors());

  app.use(
      "/graphql",
      graphqlHTTP({
          schema,
          rootValue:root,
          graphiql:true
      })
  )

  app.listen(4000)