import React from "react";

import { AiOutlineLike , AiOutlineDisconnect} from "react-icons/ai";
import { FiGift } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
const options = [
  {
    title: "Like",
    id: 1,
    icon: <AiOutlineLike size={22} />,
  },
  {
    title: "Gift",
    id: 2,
    icon: <FiGift size={22} />,
  },
  {
    title: "Host Connect",
    id: 3,
    icon: <AiOutlineDisconnect size={22} />,
  },
];

const OptionModal = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Options</DialogTitle>
      <List sx={{ pt: 0 }}>
        {options.map((option) => (
          <ListItem
            button
            onClick={() => handleListItemClick(option)}
            key={option.id}
          >
            <ListItemAvatar>{option.icon}</ListItemAvatar>
            <ListItemText primary={option.title} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default OptionModal;
