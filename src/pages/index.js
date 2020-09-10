import React from "react"
import { graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/PostList"

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <section><Bio /></section>
      <section>
        <h1>Latest Posts</h1>
        <PostList posts={posts} />
      </section>
    </Layout>
  )
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 3,
      sort: {fields: frontmatter___date, order: DESC}
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