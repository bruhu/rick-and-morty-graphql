import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

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
          { loading, error, data: { characters: { info, results } = {} } = {} }
        ) => {
          console.log(loading, error, results);
          if (loading) return <p>Loading... wait!</p>;
          if (error) return <p>Oh! ERROR!</p>;

          return (
            <p>
              {results ? (
                results.map(({ name, id }) => <p key={id}>{name}</p>)
              ) : (
                <p>No results found</p>
              )}
            </p>
          );
        }}
      </Query>
    </div>
  );
};

// const paginationButton = (pageCount, setPage, currentPage)

export default SingleCharacter;
