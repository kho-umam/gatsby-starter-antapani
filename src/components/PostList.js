import React from 'react'
import PostCard from './PostCard'

const PostsList = ({ posts }) => {

  return (
    <>
      {posts.map(post => {
        const props = {
          title: post.node.frontmatter.title,
          excerpt: post.node.excerpt,
          date: post.node.frontmatter.date,
          description: post.node.frontmatter.description,
          slug: post.node.fields.slug,
        }
        return <PostCard key={props.slug} {...props} />
      })}
    </>
  )
}
export default PostsList
