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
    <React.Fragment>
      <nav className="navbar navbar-light bg-dark justify-content-between">
        <a className="ddd">
          <h5 className="navbar-title">Rick and Morty and GraphQL</h5>
        </a>
        <form class="form-inline">
          <input
            type="text"
            value={character}
            onChange={e => SetCharacter(e.target.value)}
            className="input-group-prepend form-control character-search-input"
          />
        </form>
      </nav>

      <div className="container">
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
              <div>
                {count > 0 && (
                  <p className="results-count text-center">{count} results</p>
                )}
                <div className="character-list-container container">
                  <div className="row">
                    {results ? (
                      results.map(({ name, image, status, id }) => (
                        <div className="col-md-3 single-character-container">
                          <img src={image} className="character-pic" />
                          <p key={id} className="character-name">
                            {name}
                          </p>{" "}
                        </div>
                      ))
                    ) : (
                      <p>No results found</p>
                    )}
                  </div>
                </div>
                <div className="page-buttons-container container">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setPage(prev)}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setPage(next)}
                  >
                    Next
                  </button>
                  <div className="btn-toolbar col-12">
                    <div className="btn-group">
                      {paginationButton(pages, setPage, page)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    </React.Fragment>
  );
};

const paginationButton = (pageCount, setPage, currentPage) => {
  const pageButtons = [];
  for (let i = 1; i <= pageCount; i++) {
    pageButtons.push(
      <div className="buttons-group">
      <button
        className={currentPage === i ? "active" : ""}
        key={i}
        onClick={() => setPage(i)}
      >
        {i}
      </button>
      </div>
    );
  }
  // console.log(pageButtons);
  return pageButtons;
};

export default SingleCharacter;
