import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Displaytable({rowDataChanged}) {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    let localStorageRows = localStorage.getItem("data");

    if (!localStorageRows) {
      localStorageRows = []
    } else {
      localStorageRows = JSON.parse(localStorageRows);
    }
    setRows(localStorageRows)
  }, [rowDataChanged]);

  const removeRecord = (index) => {
    let tempRows = [...rows];
    tempRows.splice(index, 1)

    // update localStorage
    localStorage.setItem("data", JSON.stringify(tempRows));

    // update rows state variable
    setRows(tempRows);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>Date of Birth</StyledTableCell>
            <StyledTableCell>City</StyledTableCell>
            <StyledTableCell>Team</StyledTableCell>
            <StyledTableCell>Rank</StyledTableCell>
            <StyledTableCell>Achievements</StyledTableCell>
            <StyledTableCell>Photo</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, key) => {
            return (
              <StyledTableRow key={key}>
                <StyledTableCell align="center">{row.firstname}</StyledTableCell>
                <StyledTableCell align="center">{row.lastname}</StyledTableCell>
                <StyledTableCell align="center">{row.gender}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.dateOfBirth}
                </StyledTableCell>
                <StyledTableCell align="center">{row.city}</StyledTableCell>
                <StyledTableCell align="center">{row.team}</StyledTableCell>
                <StyledTableCell align="center">{row.rank}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.achievements}
                </StyledTableCell>
                <StyledTableCell align="center">{row.filename}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button variant="contained" color="inherit" onClick={() => removeRecord(key)}>Remove</Button>
                </StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
