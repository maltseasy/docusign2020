import React, { useState } from "react";
import Button from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";

const ListData = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <li>
        <p>{`${props.data.name}: ${props.data.value}`}</p>
        <Button onClick={handleOpen}>Edit Flags</Button>
      </li>
      <Modal open={open} onClose={handleClose}></Modal>
    </>
  );
};

export default ListData;
