import React from 'react';
import { useStaticQuery, Link, graphql } from 'gatsby';
import styled from 'styled-components';
import media from '../utils/media';
import { rhythm } from "../utils/typography"

const SiteHeaderContainer = styled.header `
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  min-height: ${rhythm(2)};
  margin-bottom: ${rhythm(1)};

  > a {
    white-space: nowrap;
  }

  > div {
    display: flex;

    a:not(:last-child) {
      margin-right: 0.8rem;
    }

    ${media.phone`
      background-color: black;
    `}
  }
`
const SiteHeader = () => {
  const { site } = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <SiteHeaderContainer className="site-menu">
      <Link to="/" className="site-title">{site.siteMetadata.title}</Link>
      <div>
        <Link to={`/blog`}>Blog</Link>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </SiteHeaderContainer>
  )
}

export default SiteHeader