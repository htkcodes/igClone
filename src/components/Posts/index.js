import React, { Component } from 'react'
import './post.css'
import { Query } from "react-apollo";
import gql from "graphql-tag";



const Post=()=>{
    return(
        <Query
        query={gql`
             {
                post(user_id: "a", post_id: "a") {
                  image
                  caption
                  user {
                    alias
                    avatar
                  }
                }
              }
            `}
            >
           {({ loading, error, data }) => {
            if (loading) return <p>Loading Post...</p>;
            if (error) return <p>Error loading Post:(</p>;
            let image = data.post.image;
            let caption = data.post.caption;
            let user = data.post.user;

         
            return (
                <article className="post" ref="post">
                  <header>
                    <div className="user-post">
                      <div className="user-avatar">
                        <img src={user.avatar} alt={user.alias} />
                        <span>{user.alias}</span>   
                      </div>
                    </div>
                  </header>
                  <div className="post-image">
                    <div className="post-image-bg">
                      <img alt={caption} src={image} />
                    </div>
                  </div>
                  <div className="post-caption">
                    <strong>{user.alias}</strong> {caption}
                  </div>
                </article>
              );



           }}

        </Query>
    )
}


export default Post;
