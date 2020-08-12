import { MDXProvider } from "@mdx-js/react"
import React from "react"

const components = {
	h4: ({ children }) => (
		<h4 style={{ color: "green"}}>{children}</h4>
	),
	'p.inlineCode' : props => (
		<code {...props} style= {{ backgroundColor : 'lightgrey' }}></code>
	)
}

export const wrapRootElement = ({ element }) => ( <MDXProvider components={components}> {element} </MDXProvider>)