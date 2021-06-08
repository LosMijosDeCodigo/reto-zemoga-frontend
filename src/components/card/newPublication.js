import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Input } from '@material-ui/core';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Agrega tu publicacion!
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa estos datos para publicar tu publicacion!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="publicationTypeId"
            label="Tipo de publicación"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="nombre de su publiación"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="price"
            type="number"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="stock"
            label="Stock"
            type="number"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="contact"
            label="Contacto"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Descripcion"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}