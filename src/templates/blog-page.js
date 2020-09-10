import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/PostList"
import styled from "styled-components"

const Pagination = styled.div`
  display: flex;
  margin-bottom: 1rem;
  width: 100%;
  justify-content: space-around;
  
  li {
    list-style: none;
    padding: 0 .5rem;
    margin: 0;
  }
`

const BlogPage = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges
  const { numPages, currentPage } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/blog" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout location={location} title={siteTitle} >
      <SEO title="All posts" />
      <div className="postsContainer">
        <h1>
          Blog
        </h1>
        <PostList posts={posts} />
      </div>

      <Pagination>
        {/* {!isFirst && (
          <Link to={prevPage} rel="prev">← Previous Page</Link>
        )} */}

        {isFirst
          ? <span style={{ opacity: '0.5' }}>← Prev</span>
          : <Link to={prevPage} rel="prev">← Prev</Link>
        }

        {Array.from({ length: numPages }, (_, i) => (
          <li key={`pagination-number${i + 1}`}>
            {i + 1 === currentPage
              ? <span>{currentPage}</span>
              : <Link to={`/blog/${i === 0 ? '' : i + 1}`}>{i + 1}</Link>
            }
          </li>
        ))}

        {isLast
          ? <span style={{ opacity: '0.5' }}>Next →</span>
          : <Link to={nextPage} rel="next">Next →</Link>
        }
      </Pagination>
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query blogPageQuery ($limit: Int!, $skip: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: {fields: frontmatter___date, order: DESC}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            tags
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`
