import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { rhythm } from "../utils/typography"

const PostHeader = styled.header`
 h3 {
   margin-bottom: ${rhythm(1 /4 )};
 }
`

const Excerpt = styled.p`
`

const PostTitleLink = styled(Link)`
  box-shadow: none;
`

const PostCard = props => {
  const { title, date, excerpt, slug, description } = props

  return (
    <article>
      <PostHeader>
        <h3>
          <PostTitleLink to={`/blog${slug}`}>
            {title}
          </PostTitleLink>
        </h3>
        <small>{date}</small>
      </PostHeader>

      <section>
        <Excerpt dangerouslySetInnerHTML={{ __html:  description || excerpt}} />
      </section>
    </article>
  )
}
export default PostCard
