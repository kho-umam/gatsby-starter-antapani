import React from "react"
import { TagCount } from "./Tag"

const TagsBar = ({ tagsGroup, activeTag }) => {
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
export default TagsBar
