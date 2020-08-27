import React from "react";
import { Container, ButtonGroup } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import LogoFSC from "../common/logo_fsc.png";
import App1QuestionTree from "../logic/App1Tree";

import List from "./list";

const useStyles = (theme) => ({
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
});

class PreAssessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxSlide: 5,
      dropDownValue: "",
      slide: 1,
      answerList: [],
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

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          
          {<List />}
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(PreAssessment);
