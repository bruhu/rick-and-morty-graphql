import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

//import style
import "./SingleCharacter.scss";

const SingleCharacterQuery = gql`
  query($page: Int!, $character: String!) {
    characters(page: $page, filter: { name: $character }) {
      info {
        count
        next
        prev
        pages
      }
      results {
        name
        id
        image
      }
    }
  }
`;

const SingleCharacter = () => {
  //useState Hook
  //my character is the state I am going to use
  const [page, setPage] = useState(1);
  const [character, SetCharacter] = useState("Rick");

  return (
    <div>
      <input
        type="text"
        value={character}
        onChange={e => SetCharacter(e.target.value)}
        className="input-group-prepend character-search-input"
      />
      {/* double curlies here so it is an object or else turned into an object */}
      <Query variables={{ page, character }} query={SingleCharacterQuery}>
        {/* callback inside the query variable - we destructure here */}
        {(
          //  bunch of variables:
          {
            loading,
            error,
            data: {
              characters: {
                info: { next, prev, pages, count } = {},
                results
              } = {}
            } = {}
          }
        ) => {
          console.log(loading, error, results);
          if (loading) return <p>Loading... wait!</p>;
          if (error) return <p>Oh! ERROR!</p>;

          next = next ? next : 1;
          prev = prev ? prev : 1;

          return (
            <React.Fragment>
              {count > 0 && <p className="results-count">{count} results</p>}
              <div className="character-list-container container">
                <div className="row">
                  {results ? (
                    results.map(({ name, image, status, id }) => (
                      <div className="col-md-3">
                        <img src={image} className="character-pic" />
                        <p key={id}>{name}</p>{" "}
                      </div>
                    ))
                  ) : (
                    <p>No results found</p>
                  )}
                </div>
              </div>
              <button type="button" onClick={() => setPage(prev)}>
                Prev
              </button>
              <button type="button" onClick={() => setPage(next)}>
                Next
              </button>
              <div>{paginationButton(pages, setPage, page)}</div>
            </React.Fragment>
          );
        }}
      </Query>
    </div>
  );
};

const paginationButton = (pageCount, setPage, currentPage) => {
  const pageButtons = [];
  for (let i = 1; i <= pageCount; i++) {
    pageButtons.push(
      <button
        className={currentPage === i ? "active" : ""}
        key={i}
        onClick={() => setPage(i)}
      >
        {i}
      </button>
    );
  }
  // console.log(pageButtons);
  return pageButtons;
};

export default SingleCharacter;
