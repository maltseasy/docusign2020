import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { Flag } from "@material-ui/icons";
import { FlagOutlined } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";

const ListData = (props) => {
  const [currentData, setCurrentData] = useState(props.data);

  useEffect(() => {
    setCurrentData(props.data);
  }, [props.data]);

  const handleFlag = () => {
    console.log({
      ...currentData,
      flagged: !currentData.flagged,
    });

    setCurrentData({
      ...currentData,
      flagged: !currentData.flagged,
    });
    props.handleFlag(currentData);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <p>{`${currentData.name}: ${currentData.value}`}</p>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div style={{ float: "right" }}>
            <Button onClick={handleFlag}>
              {currentData.flagged ? <Flag /> : <FlagOutlined />}
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ListData;
