import React from "react";
import Button from "@material-ui/core/Button";

export class DocusignCallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    sessionStorage.setItem("docusign_loggedin", true);
    //console.log('set item into storage')
    // window.close();
  }
  
  render() {
    return <h4>Redirecting...</h4>;
  }
}

export class DocusignRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client_id: "e43b1a3d-91a3-4ed2-969d-d00dda3185ba",
    };
  }

  handleClickLogin = () => {
    window.open("https://localhost:5000/ds/login", "_blank");
  };

  handleCeremony = () => {
    window.open("https://localhost:5000/dataSharing", "_blank");
  };

  render() {
    return (
      <>
        {/* <Button onClick={this.handleClickLogin} style={{
                        margin: 10,
                        borderRadius: 5,
                        padding: 20,
                      }}>Sign In to Docusign</Button> */}
        <Button onClick={this.handleCeremony} style={{
                        margin: 10,
                        borderRadius: 5,
                        padding: 20,
                      }}>Sign With Docusign</Button>
      </>
    )
    
  }
}
