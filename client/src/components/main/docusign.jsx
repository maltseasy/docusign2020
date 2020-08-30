import React from "react";
import Button from "@material-ui/core/Button";

export class DocusignCallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client_id: "c81fcda2-7535-447d-a957-6b8e7fa46fc8",
    };
  }
  async componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("code")) {
      console.log(urlParams.get("code"));
      sessionStorage.setItem("docusign_code", urlParams.get("code"));
      var formBody =
        "grant_type=authorization_code&code=" + urlParams.get("code");
      var options_docutoken = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic YzgxZmNkYTItNzUzNS00NDdkLWE5NTctNmI4ZTdmYTQ2ZmM4OmY2NGJlOWRjLWQ4NjEtNGRjNi1hOWVkLTBjMTZiY2NhMmU4NA==",
        },
        body: formBody,
      };

      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://account-d.docusign.com/oauth/token",
        options_docutoken
      );
      const data = await response.json();
      sessionStorage.setItem("docusign_accesstoken", data.access_token);
      console.log(data);

      var options_getUser = {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " + data.access_token,
        }};

      const getUser = await fetch("https://cors-anywhere.herokuapp.com/https://account-d.docusign.com/oauth/userinfo",options_getUser);

      const getUserData = await getUser.json()

      sessionStorage.setItem("docusign_user", getUserData);

      var eSigURL = "https://account-d.docusign.com/restapi/v2/accounts/"+getUserData.accounts[0].account_id+"/brands"

      console.log(getUserData);
    }
  }
  render() {
    return <h4>Redirecting...</h4>;
  }
}

export class DocusignRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client_id: "c81fcda2-7535-447d-a957-6b8e7fa46fc8",
    };
  }

  handleClick = async () => {
    const url =
      "https://account-d.docusign.com/oauth/auth?response_type=code&scope-signature&client_id=" +
      this.state.client_id +
      "&redirect_uri=http://localhost:3000/callback";
    window.open(url, "_blank");
  };

  render() {
    return <Button onClick={this.handleClick}>Docusign</Button>;
  }
}
