import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useFormik } from "formik";
import * as yup from "yup";

export default function ConnectGusetModal({ open, onClose }) {
  const validationSchema = yup.object({
    name: yup.string("Enter name").required("Name is required"),
    mobile: yup.string("Enter mobile").required("Mobile is required"),
    link: yup.string("Enter any link"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      link: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      //TODO: Save this data to database
    },
  });

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">Host Information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Guest will contact you on below details, incase required.
            </DialogContentText>
            <TextField
              id="name"
              name="name"
              label="Name"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              id="mobile"
              name="mobile"
              label="Mobile"
              fullWidth
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
            <TextField
              id="link"
              name="link"
              label="Link"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.link}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
