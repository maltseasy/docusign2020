import React from "react";
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CompanyView from "./company_view";
import Button from "@material-ui/core/Button";
import DummyData from "../data/dummy_data.json";
import { getCompanyList, organizationType } from "../data/dynamics";

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
    padding: 20,
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
      companyData: null,
    };
  }

  componentDidMount() {
    getCompanyList().then((data) => {
      console.log(data);
      this.setState({
        companyData: data.value,
      });
    });
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

  handleCompanyView = (companyData, index) => {
    console.log(index);
    this.setState(
      {
        company: companyData,
        companyIndex: index,
      },
      () => {
        this.setState({
          viewing: true,
        });
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
          companyIndex: null,
        });
      }
    );
  };

  render() {
    const { classes } = this.props;

    if (this.state.viewing) {
      return (
        <CompanyView
          company={this.state.company}
          handleCompanyClose={this.handleCompanyClose}
          index={this.state.companyIndex}
        />
      );
    } else {
      return (
        <Container component="main" maxWidth="md">
          <div className={classes.paper}>
            <TableContainer
              component={Paper}
              style={{ padding: 15, width: "100%" }}
            >
              <TableHead style={{ width: "100%" }}>
                <TableRow style={{ width: "100%" }}>
                  <TableCell style={{ fontSize: 20, width: "100%" }}>
                    Company Name
                  </TableCell>
                  <TableCell style={{ fontSize: 20, width: "100%" }}>Organization Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ width: "100%" }}>
                {this.state.companyData &&
                  this.state.companyData.map((company, index) => (
                    
                    <TableRow key={company.name} style={{ width: "100%" }}>
                        <TableCell
                          style={{ width: "100%", fontSize: 14, height:'100%' }}
                          align="left"
                          onClick={() => this.handleCompanyView(company, index)}
                          className="hvr-grow"
                        >
                          {company.name}
                        </TableCell>
                        
                      <TableCell align="left" style={{height:'100%'}}>
                        {`${organizationType(company.fsc_organizationtype)}`}
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
