import React, { useState } from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import styled from "styled-components"
import media from "../utils/media"
import { rhythm } from "../utils/typography"

const SiteHeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  min-height: ${rhythm(2)};
  margin-bottom: ${rhythm(1)};
  @media ${media.maxPhone} {
    display: flex;
  }

  > a {
    white-space: nowrap;
  }
`

const HeaderMenus = styled.div`
  display: flex;
  @media ${media.maxPhone} {
    ${props =>
    props.isToggled
      ? 'display: block !important'
      : `display: none`};
  }

  a:not(:last-child) {
    margin-right: 0.8rem;
  }
`

const BurgerButton = styled.button`
  z-index: 30;
  top: 0px;
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  outline: none;
  display: block;
  margin-left: auto;
  @media ${media.minPhone} {
    display: none;
  }
`

const BurgerContent = styled.div`
  width: 24px;
  height: 2px;
  position: absolute;
  left: 0;
  ${props =>
    props.isToggled
      ? 'background: transparent'
      : `background: black`};
  transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);

  ::before {
    content: '';
    top: -8px;
    width: 24px;
    height: 2px;
    background: black;
    position: absolute;
    left: 0;
    ${props =>
    props.isToggled
      ? 'transform: rotate(45deg); top: 0;'
      : 'transform: rotate(0)'};
    transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);
  }

  ::after {
    top: 8px;
    content: '';
    width: 24px;
    height: 2px;
    background: black;
    position: absolute;
    left: 0;
    ${props =>
    props.isToggled
      ? 'transform: rotate(-45deg); top: 0;'
      : 'transform: rotate(0)'};
    transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);
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

  const [isToggled, setToggle] = useState(false)
  const toggle = () => setToggle(!isToggled)

  return (
    <SiteHeaderContainer className="site-menu">
      <Link to="/" className="site-title">{site.siteMetadata.title}</Link>
      <BurgerButton onClick={toggle} aria-label={`${isToggled ? 'close menu' : 'open menu'}`} >
        <BurgerContent isToggled={isToggled} />
      </BurgerButton>

      <HeaderMenus isToggled={isToggled}>
        <Link to={`/blog`}>Blog</Link>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </HeaderMenus>
    </SiteHeaderContainer>
  )
}

export default SiteHeader