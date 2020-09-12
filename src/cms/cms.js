import { MdxControl, MdxPreview } from "netlify-cms-widget-mdx"
import CMS, { init } from "netlify-cms-app"

CMS.registerWidget("mdx", MdxControl, MdxPreview)

// Start the CMS
init()
