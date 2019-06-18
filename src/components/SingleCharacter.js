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
      }
    }
  }
`;

const SingleCharacter = () => {
  //useState Hook
  //my character is the state I am going to use
  const [page, setPage] = useState(1);
  const [character, SetCharacter] = useState("Morty");

  return (
    <div>
      <input
        type="text"
        value={character}
        onChange={e => SetCharacter(e.target.value)}
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
            <div>
              {count > 0 && count}
              {results ? (
                results.map(({ name, id }) => <p key={id}>{name}</p>)
              ) : (
                <p>No results found</p>
              )}
              <button type="button" onClick={() => setPage(prev)}>
                Prev
              </button>
              <button type="button" onClick={() => setPage(next)}>
                Next
              </button>
              <div>{paginationButton(pages, setPage, page)}</div>
            </div>
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
