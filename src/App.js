import React, { useState } from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

import AllCharacters from "./components/allCharacters";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/"
});

function App() {
  const [page, setPage] = useState(1);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <AllCharacters page={page} setPage={setPage} />
      </div>
    </ApolloProvider>
  );
}

export default App;

{
  /* <Query
          query={gql`
            {
              characters(page: 1) {
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
          `}
        >
          {({
            loading,
            error,
            data: { characters: { info, results } = {} }
          }) => {
            console.log(loading, error, info, results);
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return results.map(({ name, id }) => <p key={id}>{name}</p>);
          }}
        </Query> */
}
