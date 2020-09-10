import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'
import { Tag } from "./Tag"

const PostHeader = styled.header`
 h3 {
   margin-bottom: ${rhythm(1 / 4)};
 }

 small {
   margin-right: .5rem;
  a {
    margin-right: .5rem;
    box-shadow: none;
  }
 }
`

const Excerpt = styled.p`
`

const PostTitleLink = styled(Link)`
  box-shadow: none;
`

const PostList = props => {
  const { posts } = props

  const mapPost = posts.map((post) => {
    const title = post.node.frontmatter.title
    const tags = post.node.frontmatter.tags
    const excerpt = post.node.excerpt
    const date = post.node.frontmatter.date
    const description = post.node.frontmatter.description
    const slug = post.node.fields.slug

    return (
      <article key={slug}>
        <PostHeader>
          <h3>
            <PostTitleLink to={`/blog${slug}`}>
              {title}
            </PostTitleLink>
          </h3>
          <small>{date}</small>
          <small className="adah">
            {tags && tags.length > 0 // don't render tag-container if there is no tag
              ? <Tag tags={tags} />
              : null}
          </small>
        </PostHeader>
        <section>
          <Excerpt dangerouslySetInnerHTML={{ __html: description || excerpt }} />
        </section>
      </article>
    )
  })
  return <div>{mapPost}</div>;
}

export default PostList
