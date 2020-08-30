import React from "react";
import Button from "@material-ui/core/Button";

export class DocusignCallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client_id: "c81fcda2-7535-447d-a957-6b8e7fa46fc8",
    };
  }
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("code")) {
      console.log(urlParams.get("code"));
      sessionStorage.setItem("docusign_code", urlParams.get("code"));
      var options_docutoken = {
        method: "POST",
        headers: {
          "Accept": "*/*",
          "origin":window.location.url,
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization":
            "Basic YzgxZmNkYTItNzUzNS00NDdkLWE5NTctNmI4ZTdmYTQ2ZmM4OmY2NGJlOWRjLWQ4NjEtNGRjNi1hOWVkLTBjMTZiY2NhMmU4NA==",
        },
        body: JSON.stringify({
          code: urlParams.get("code"),
          grant_type: "authorization_code",
        }),
      };
      const response = fetch(
        "https://cors-anywhere.herokuapp.com/https://account-d.docusign.com/oauth/token",
        options_docutoken
      )
        .then(() => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    }
  }
  render() {
    return <h4>{sessionStorage.getItem("docusign_code")}</h4>;
  }
}

export class DocusignRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client_id: "c81fcda2-7535-447d-a957-6b8e7fa46fc8",
    };
  }

  handleClick = () => {
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
