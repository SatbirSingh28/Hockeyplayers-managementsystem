import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Displaytable from "./Displaytable";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const TEAM_NAMES = [
  {
    name: "Calgary Flames",
  },
  {
    name: "Edmonton Oilers",
  },
];

const CITY_NAMES = [
  {
    name: "Calgary",
  },
  {
    name: "Edmonton",
  },
  {
    name: "Toronto",
  },
  {
    name: "Vancouver",
  },
  {
    name: "Montreal",
  },
];

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  root: {
    flexGrow: 1,
  },
  fullWidth: { width: "100%" }
}));

export default function Form() {
  const classes = useStyles();

  const [rowDataChanged, setRowDataChanged] = React.useState([]);
  const [formData, setFormData] = React.useState({});

  const updateFormData = (key, val) => {
    setFormData({
      ...formData,
      [key]: val,
    });
  };

  const mySubmitHandler = (event) => {
    event.preventDefault();

    // get records from localstorage
    let existingRecords = localStorage.getItem("data");

    if (!existingRecords) {
      existingRecords = []
    } else {
      existingRecords = JSON.parse(existingRecords);
    }

    // add current submission to the existing records
    existingRecords.push(formData);

    // write records back to local storage
    localStorage.setItem("data", JSON.stringify(existingRecords));

    setRowDataChanged(!rowDataChanged);
  };

  const handleUploadClick = (e) => {
    var file = e.target.files[0];
    updateFormData("filename", file.name);
  };

  return (
    <React.Fragment>
      <form
        className={classes.root}
        autoComplete="off"
        onSubmit={mySubmitHandler}
      >
        <Grid container justify="center" alignItems="center" alignContent="center" direction="column" spacing={2}>
          <Grid item className={classes.fullWidth} xs={12}>
            <Grid container spacing={1}>
              <Grid item>
                <Displaytable rowDataChanged={rowDataChanged}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.fullWidth} xs={12}>
            <Grid container direction="column" justify="center" alignContent="center" spacing={3}>
            <Grid item className={classes.fullWidth} xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-basic"
                name="outlined-basic"
                label="First Name"
                variant="outlined"
                onChange={(e) => updateFormData("firstname", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                onChange={(e) => updateFormData("lastname", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" variant="outlined">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  // value={value}
                  onChange={(e) => updateFormData("gender", e.target.value)}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="date"
                label="Date of Birth"
                type="date"
                InputLabelProps={{
                  shrink: true,

                }}
                onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                required
                fullWidth
                id="combo-box-demo1"
                options={CITY_NAMES}
                getOptionLabel={(option1) => option1.name}
                onChange={(e, val) => updateFormData("city", val.name)}
                renderInput={(params) => (
                  <TextField {...params}  label="City" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                required
                id="combo-box-demo"
                options={TEAM_NAMES}
                getOptionLabel={(option) => option.name}
                onChange={(e, val) => updateFormData("team", val.name)}
                renderInput={(params) => (
                  <TextField {...params} label="Team" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-number"
                label="Rank"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => updateFormData("rank", e.target.value < 0
                  ? (e.target.value = 0)
                  : e.target.value)

                }
                variant="outlined"

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-multiline-static"
                label="Achievements"
                multiline
                rows={4}
                variant="outlined"
                onChange={(e) => updateFormData("achievements", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" alignItems="center">
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleUploadClick}
                />
                <label htmlFor="contained-button-file">
                  <Fab component="span" className={classes.button}>
                    <AddPhotoAlternateIcon />
                  </Fab>
                </label>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                className={classes.button}
                color="primary"
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={12}>
        </Grid>
        </Grid>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
