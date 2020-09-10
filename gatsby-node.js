const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPage = path.resolve(`./src/templates/blog-page.js`)
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagPage = path.resolve(`./src/templates/tag-template.js`)
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allMdx.edges
  const tagSet = new Set();

  posts.forEach((post, index) => {
    // Create blog posts pages.
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: `blog${post.node.fields.slug}`,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })

    // Create blog page per 3 posts.
    const postsPerPage = 3
    const numPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: blogPage,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        },
      })
    })

    // Collect tags from posts then create tags
    if (post.node.frontmatter.tags) {
      post.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    // Create Tag page for each tag
    tagSet.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagPage,
        context: {
          tag
        }
      });
    });
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
