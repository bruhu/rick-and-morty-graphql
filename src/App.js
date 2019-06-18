import React, { useState } from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import SingleCharacter from "./components/SingleCharacter";

// import AllCharacters from "./components/allCharacters";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/"
});

function App() {
  // const [page, setPage] = useState(1);
 
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* <AllCharacters page={page} setPage={setPage} /> */}
        <SingleCharacter />
      </div>
    </ApolloProvider>
  );
 }

export default App;
