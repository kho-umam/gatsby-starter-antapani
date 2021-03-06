import React from "react"
import { kebabCase } from "lodash"
import { Link } from "gatsby"

export const TagCount = ({ tag, isLast, isActive }) => {
  return (
    <>
      <Link
        style={{
          fontWeight: isActive ? "bold" : "normal"
        }}
        to={`/tags/${kebabCase(tag.fieldValue)}`}>
        #{tag.fieldValue} ({tag.totalCount})
      </Link>{isLast && ", "}
    </>
  )
}

export const TagsBar = ({ tagsGroup, activeTag }) => {
  return (
    <p>
      {
        tagsGroup.group.map((tag, i) => (
          <TagCount
            key={i}
            tag={tag}
            isLast={i < tagsGroup.group.length - 1}
            isActive={tag.fieldValue === activeTag}
          />
        ))
      }
    </p>
  )
}

export const Tag = props => {
  const { tags } = props;

  return (
    <>
      {tags && tags.map(tag => (
        <Link key={tag} to={`/tags/${kebabCase(tag)}`}>
          #{tag}
        </Link>
      ))}
    </>
  )
}
