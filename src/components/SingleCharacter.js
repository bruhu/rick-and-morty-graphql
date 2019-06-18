import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const SingleCharacterQuery = gql`
  query($character: String!) {
    characters(filter: { name: $character }) {
      info {
        count
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
  const [character, SetCharacter] = useState("Morty");

  return (
    <div>
      <input
        type="text"
        value={character}
        onChange={e => SetCharacter(e.target.value)}
      />
      {/* double curlies here so it is an object or else turned into an object */}
      <Query variables={{ character }} query={SingleCharacterQuery}>
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

export default SingleCharacter;
