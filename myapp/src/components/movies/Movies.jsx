import React, { useState } from "react";
import AllNovies from "./AllMovies";
import Button from "@material-ui/core/Button";

function Movies(props) {
  const [handleShow, setHandleShow] = useState(true);

  return (
    <div>
      {/* <Button>ALL MOVIES</Button>
      <Button>ADD MOVIE</Button> */}
      <AllNovies  />
    </div>
  );
}

export default Movies;
