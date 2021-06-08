import React, { useLayoutEffect, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import classnames from "classnames";
import RecipeReviewCard from '../../components/card/Publication'
import FormDialog from '../../components/card/newPublication'
import services from '../../services/services'
import {
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
// styles
import "react-toastify/dist/ReactToastify.css";
import useStyles from "./styles";


// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import Notification from "../../components/Notification";

const positions = [
  toast.POSITION.TOP_LEFT,
  toast.POSITION.TOP_CENTER,
  toast.POSITION.TOP_RIGHT,
  toast.POSITION.BOTTOM_LEFT,
  toast.POSITION.BOTTOM_CENTER,
  toast.POSITION.BOTTOM_RIGHT,
];

export default function NotificationsPage(props) {
  var classes = useStyles();

  // local
  var [isLoading, setIsLoading] = useState(true);

  var [data, setdata] = useState([])

  useEffect(() => {
    const getDataPublish = async () => {
      await services
        .get("publications")
        .then((res) => {
          setdata(res);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getDataPublish();
  },[])

  return (
    <>
      <FormDialog />
      <PageTitle title="Publicaciones" />
      <Grid container spacing={4} direction="row" justify="space-evenly">
        {isLoading  ? (
          <CircularProgress size={26} className={classes.loginLoader} />
        ) : (
          data.data.map((x) => <RecipeReviewCard datos={x} />)
        )}
      </Grid>
    </>
  );
}

