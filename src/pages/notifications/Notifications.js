import React, { useLayoutEffect, useState } from "react";
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

  let description = "Lorem ipsum dolor sit amet consectetur adipiscing elit cras, nascetur tellus metus duis dapibus per pellentesque ornare aptent, nisl est lobortis netus mus suscipit maecenas. Per elementum feugiat scelerisque semper massa rutrum aliquam, nibh imperdiet gravida aptent congue tempus vestibulum, magna volutpat ante maecenas hac condimentum. In purus nulla bibendum nibh tristique dictumst vestibulum."

  async function traerData() {
    setdata(await services.get('publications'))
    console.log('-----------');
    console.log(data);
    console.log('-----------');
    setTimeout(() => {
      setIsLoading(false)
    }, 4000);
  }

  return (
    <>
      <FormDialog />
      <PageTitle title="Publicaciones" />
      <Grid container spacing={4} direction="row" justify="space-evenly">
        {isLoading  ? (
          <CircularProgress size={26} onClick={traerData} className={classes.loginLoader} />
        ) : (
          data.data.map((x) => <RecipeReviewCard datos={x} />)
        )}
      </Grid>
    </>
  );
}

