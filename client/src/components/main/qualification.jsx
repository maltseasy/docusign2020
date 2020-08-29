import React from "react";
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CompanyView from './company_view';

const useStyles = (theme) => ({
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dataDisplay: {
    marginTop: theme.spacing(8),
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    padding: 10,
    align: "left",
    boxShadow:
      "0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07), 0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07)",
    // maxWidth: "50%",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    padding: 10,
    boxShadow:
      "0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07), 0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07)",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  table: {
    minWidth: 650,
  },
  mapView: {
    height: "400px",
    marginTop: theme.spacing(8),
    padding: 10,
  },
});

class Qualification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxSlide: 5,
      dropDownValue: "",
      slide: 1,
      answerList: [],
      buttonLabels: ["No", "Yes"],
      viewing: false,
      companyData: [
        {
          name: "Bob's Pizza",
          data: [
            {
              "name": "Data",
              "value": "some data here",
              "flags": [],
            },
            {
              "name": "Data",
              "value": "some data here",
              "flags": [],
            },
            {
              "name": "Data",
              "value": "some data here",
              "flags": [],
            },
          ]
        },
        {
          name: "Rob's Pizza",
          data: [
            {
              "name": "Data",
              "value": "some data here",
              "flags": [],
            },
            {
              "name": "Data",
              "value": "some data here",
              "flags": [],
            },
            {
              "name": "Data",
              "value": "some data here",
              "flags": [],
            },
          ]
        },
        {
          name: "Cob's Pizza",
          data: [
            {
              "name": "Data",
              "value": "some data here",
              "flags": [],
            },
            {
              "name": "Data",
              "value": "some data here",
              "flags": [],
            },
            {
              "name": "Data",
              "value": "some data here",
              "flags": [],
            },
          ]
        },
      ]
    };
  }

  handleSlideInc = () => {
    this.setState({
      answerList: [...this.state.answerList, 1],
    });
  };

  handleSlideDec = () => {
    this.setState({
      answerList: [...this.state.answerList, 0],
    });
  };

  handleAnswer = (answer) => {
    this.setState({
      answerList: [...this.state.answerList, answer],
    });
  };

  handleOverride = (e) => {
    this.setState({
      buttonLabels: [e[0], e[1]],
    });
  };

  handleCompanyView = (companyData) => {
    this.setState(
      {
        company: companyData,
      },
      () => {
        this.setState(
          {
            viewing: true,
          }
        );
      }
    );
  };

  handleCompanyClose = () => {
    this.setState(
      {
        viewing: false,
      },
      () => {
        this.setState({
          company: null,
        });
      }
    );
  };
//   handleFlag = (e) => {
//       e = {
//           name: "rufw",
//           flags: []
//       }
//       this.setState({
          
//       })
//   }

  render() {
    const { classes } = this.props;

    if (this.state.viewing) {
      return (
        <CompanyView company={this.state.company} />
      );
    } else {
      return (
        <Container component="main" maxWidth="md">
          <div className={classes.paper}>
            <TableContainer component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.companyData.map(company => (
                  <TableRow key={company.name}>
                    <TableCell
                      align="left"
                      onClick={() => this.handleCompanyView(company)}
                    >
                      {company.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </div>
        </Container>
      );
    }
  }
}

export default withStyles(useStyles)(Qualification);
