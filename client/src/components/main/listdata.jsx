import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { Flag } from "@material-ui/icons";
import { FlagOutlined } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import { getRequirementName } from "../data/dynamics";

const ListData = (props) => {
  const [currentData, setCurrentData] = useState(props.data);
  const [requirementInfo, setRequirementInfo] = useState(null);
  const [cocInput, setCocInput] = useState("");

  useEffect(() => {
    setCurrentData(props.data);
    getRequirementName(
      currentData._new_fsc_requirment_type_per_coc_scenario_value
    ).then((data) => {
      setRequirementInfo(data.value[0]);
    });
    setCocInput(currentData.new_coc_input);
  }, [props.data]);

  const handleFlag = () => {
    console.log({
      ...currentData,
      new_requirement_flag: !currentData.new_requirement_flag,
    });

    setCurrentData({
      ...currentData,
      new_requirement_flag: !currentData.new_requirement_flag,
    });
    // props.handleFlag(currentData, props.index);
  };

  const handleNote = (e) => {
    console.log(currentData);
    setCurrentData({
      ...currentData,
      new_requirement_notes: e.target.value,
    });
    // props.handleNote(e.target.value,props.index);
  }

  const handleSave = (e) => {
    console.log(props.data);
    props.handleSave(currentData,props.index);
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          {currentData !== props.data ? (
            <h5 color="red">You have unsaved changes!</h5>
          ):null}
          {requirementInfo ? (
            <>
              <h2>{requirementInfo.fsc_standard_title}</h2>
              <p style={{fontSize:"0.5rem"}}>{requirementInfo.fsc_standard_comments}</p>
              <h5>{cocInput}</h5>
            </>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <div style={{ float: "right" }}>
            <TextField 
              variant="outlined" 
              label="Notes"
              value={currentData.new_requirement_notes}
              onChange={handleNote}
            />
            <Button onClick={handleFlag}>
              {currentData.new_requirement_flag ? <Flag /> : <FlagOutlined />}
            </Button>
          </div>
        </Grid>
      </Grid>
      <Button onClick={handleSave}>Save</Button>
    </>
  );
};

export default ListData;
