import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { datos } from './../../context/UserContext'
import { CircularProgress, Fade, Select, Typography } from '@material-ui/core';
import useStyles from "./../../pages/login/styles";
//helpers
function imageToBase64(files = []) {
  const base64Files = files.map((file) => {
    return new Promise((resolve, reject) => {
      try {
        let fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
          resolve(fileReader.result)
        }
      } catch (error) {
        reject(error)
      }
    })
  })
  return base64Files
}


//end
const documentsType = [
  {
    id: 1,
    name: "Necesidad"
  },
  {
    id: 2,
    name: "Producto"
  },
  {
    id: 3,
    name: "Servicio"
  }
];
const stylesImage = {
  borderBlockColor: "gray", borderStyle: "solid", width: "100px",
  margin: "4px"
};
export default function FormDialog() {

  const initState = {
    "userId": localStorage.getItem("userId"),
    "publicationTypeId": 1,
    "name": "",
    "price": "",
    "stock": 0,
    "contact": "",
    "description": ""
  };
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", "message": "" })
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({ ...initState })
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = async (e) => {
    const files = await Promise.all(imageToBase64(Array.from(e.target.files)))
    setFiles(files)
  }
  const handleSubmit = (e) => {

    e.preventDefault()
    if (files.length === 0) return alert("Añade imagenes")
    setIsLoading(true)
    form.userId = parseInt(localStorage.getItem("userId"))
    form.publicationTypeId = parseInt(form.publicationTypeId)
    form.stock = parseInt(form.stock)
    form.price = form.price.indexOf(".") === -1 ? form.price + ".0000" : form.price

    fetch(window.env.API_ENDPOINT + "publications", {
      headers: {
        "Authorization": "Bearer " + datos().isAuthenticated,
        "Content-Type": "application/json"
      }, method: "POST", body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then((res) => {
        if ("id" in res) {
          fetch(window.env.API_ENDPOINT + "publications/" + res.id + "/images", {
            headers: {
              "Authorization": "Bearer " + datos().isAuthenticated,
              "Content-Type": "application/json"
            }, method: "POST", body: JSON.stringify({ images: files })
          })
            .then((res) => {
              if (res.ok) {
                setForm({ ...initState })
                setFiles([])
                setIsLoading(false)
                setMessage({ type: "success", message: "Publicacion hecha correctamente" })
              } else {
                setIsLoading(false)
                setMessage({ type: "error", message: "Error al crear la publicacion" })
              }
            })
        } else {
          setIsLoading(false)
          setMessage({ type: "error", message: "Error al crear la publicacion" })

        }
      })
      .catch((err) => {
        setIsLoading(false)
        setMessage({ type: "error", message: "Error al crear la publicacion" })
      })

  }
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Agrega tu publicacion!
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Crear publicacion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa estos datos para crear tu publicacion!
          </DialogContentText>
          <Fade in={message.type == "error"}>
            <Typography color="secondary" className={classes.errorMessage}>
              {message.message}
            </Typography>
          </Fade>

          <Fade in={message.type == "success"}>
            <Typography style={{ color: "green" }} >
              Publicacion realizada correctamente.
            </Typography>
          </Fade>
          {files.map((file, i) => (<img key={i} style={stylesImage} src={file} />))}
          <form id="formSend" onSubmit={handleSubmit}>
            <Select
              required
              fullWidth
              native
              onChange={e => setForm({ ...form, publicationTypeId: e.target.value })}
              value={form.publicationTypeId}
              inputProps={{
                name: 'age',
                id: 'age-native-simple',
              }}
            >
              <option aria-label="None" value="" >--SELECCIONA--</option>
              {documentsType.map((item) => (<option value={item.id}>{item.name}</option>))}
            </Select>
            <TextField
              required
              onChange={e => setForm({ ...form, name: e.target.value })}
              autoFocus
              margin="dense"
              id="name"
              label="nombre de su publiación"
              type="text"
              fullWidth
            />
            <TextField
              required
              onChange={e => setForm({ ...form, price: e.target.value })}
              autoFocus
              margin="dense"
              id="price"
              label="price"
              type="number"
              fullWidth
            />
            <TextField
              required
              onChange={e => setForm({ ...form, stock: e.target.value })}
              autoFocus
              margin="dense"
              id="stock"
              label="Stock"
              type="number"
              fullWidth
            />
            <TextField
              required
              onChange={e => setForm({ ...form, contact: e.target.value })}
              autoFocus
              margin="dense"
              id="contact"
              label="Contacto"
              type="text"
              fullWidth
            />
            <TextField
              required
              onChange={e => setForm({ ...form, description: e.target.value })}
              autoFocus
              margin="dense"
              id="description"
              label="Descripcion"
              type="text"
              fullWidth
            />

            <Button variant="contained" color="secondary">
              <label for="photos-here">
                SUBIR FOTOS
            </label>
            </Button>
            <small>  - Minimo sube una imagen</small>
          </form>
          <input id="photos-here" style={{ display: "none" }} type="file" multiple accept="image/*" onChange={handleChange} />
        </DialogContent>


        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {isLoading ? (
            <CircularProgress size={26} className={classes.loginLoader} />
          ) : (
            <Button form="formSend" type="submit" color="primary">
              Añadir publicacion
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}