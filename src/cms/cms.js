import React, { Component } from "react"
import { MdxControl, MdxPreview } from "netlify-cms-widget-mdx"
import { StyleSheetManager } from "styled-components"
import { Theme, LayoutComponents, UIComponents } from "../theme/Theme"
import CMS, { init } from "netlify-cms-app"

class StyledMdxControl extends Component {
  render() {
    return (
      <Theme>
        <MdxControl {...this.props} />
      </Theme>
    )
  }
}

const StyledMdxPreview = props => {
  const iframe = document.getElementsByTagName("iframe")[0]
  const iframeHeadElem = iframe.contentDocument.head

  const mdxProps = {
    // This key represents html elements used in markdown; h1, p, etc
    components: LayoutComponents,
    // Pass components used in the editor (and shared throughout mdx) here:
    scope: UIComponents,

    mdPlugins: [],
  }

  return (
    <StyleSheetManager target={iframeHeadElem}>
      <Theme>
        <MdxPreview mdx={mdxProps} {...props} />
      </Theme>
    </StyleSheetManager>
  )
}

CMS.registerWidget("mdx", StyledMdxControl, StyledMdxPreview)
// CMS.registerWidget("mdx", MdxControl, MdxPreview)
// Start the CMS
init()
