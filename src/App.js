import React from "react";
import Container from "@material-ui/core/Container";
import Header from "./components/Header";
import Form from "./components/Form";
import Grid from "@material-ui/core/Grid";
import Image from "./main.jpg";
import Paper from "@material-ui/core/Paper";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
  },
};

export default function App() {
  return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item style={{ width: "100%"}}>
            <Header />
          </Grid>
          <Grid item>
            <Form />
          </Grid>
        </Grid>
  );
}
