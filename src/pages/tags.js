import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagsBar from "../components/TagsBar"

const TagPage = ({ data }) => {
  const tagsGroup = data.allMdx
  return (
    <Layout>
      <SEO title="Tags" />
      <h1>Tags</h1>
      <TagsBar {...{ tagsGroup }} />
      <hr />
    </Layout>
  )
}

export default TagPage

export const TagPageQuery = graphql`
  query {
    allMdx {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
