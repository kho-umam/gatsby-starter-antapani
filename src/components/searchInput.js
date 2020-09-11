import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from "styled-components"

const SearchWrapper = styled.div`
  display: inline-flex;
  position: relative;

  input {
    width: 8rem;
    border: none;
    border-bottom: 1px solid #007acc;
  }

  input:focus {
    outline: none;
    border: none;
    border-bottom: 1px solid blue;
  }

  div {
    border-radius: 0 0 6px 6px;
    box-shadow: 0 8px 8px rgba(10,10,10,.1);
    font-size: .875rem;
    left: 0;
    min-width: 100%;
    position: absolute;
    top: 100%;
    z-index: 20;

    a {
      color: #4a4a4a;
      display: block;
      line-height: 1.5;
      padding: .5rem .75rem;
      position: relative;
      box-shadow: none;
    }

    a:hover {
      background-color: #b4e1ff;
    }
  }

  ul {
    margin: 0;
  }
  
  li {
    list-style: none;
    padding: 0 .5rem;
    margin: 0;
  }
`

export default class Pencarian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ``,
      results: []
    };
  }

  render() {
    return (
      <SearchWrapper>
        <input
          type='text'
          placeholder='Search'
          value={this.state.query}
          onChange={this.search}
        />
        <div>
          {this.state.results.map(post => (
            <Link
              key={post.url}
              to={`/blog${post.url}`}>
              {post.title}
            </Link>
          ))}
        </div>
      </SearchWrapper>
    )
  }

  getSearchResults(query) {
    if (!query || !window.__LUNR__) return []
    const lunrIndex = window.__LUNR__["en"]
    const results = lunrIndex.index.search(query)
    return results.map(({ ref }) => lunrIndex.store[ref])
  }

  search = event => {
    const query = event.target.value
    const results = this.getSearchResults(query)

    this.setState(s => {
      return {
        results,
        query
      };
    });
  };
}
