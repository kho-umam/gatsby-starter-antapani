import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import { TagsBar } from "../components/Tag"

const TagTemplate = ({ pageContext, data }) => {
  const tagsGroup = data.allMdx
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`

  // console.log(pageContext)

  return (
    <Layout>
      <SEO title={tag} description={tagHeader} />
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={`/blog${slug}`}>{title}</Link>
            </li>
          )
        })}
        <TagsBar {...{ tagsGroup, activeTag: tag }} />
      </ul>
    </Layout>
  )
}

export default TagTemplate

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`