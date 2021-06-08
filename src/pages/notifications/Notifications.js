import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import RecipeReviewCard from '../../components/card/Publication'
import FormDialog from '../../components/card/newPublication'
import services from '../../services/services'
import {
  CircularProgress,
} from "@material-ui/core";
// styles
import "react-toastify/dist/ReactToastify.css";
import useStyles from "./styles";


// components
import PageTitle from "../../components/PageTitle/PageTitle";

export default function NotificationsPage(props) {
  var classes = useStyles();

  // local
  var [isLoading, setIsLoading] = useState(true);

  var [data, setdata] = useState([]);

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
  useEffect(() => {
    getDataPublish();
  }, []);

  return (
    <>
      <FormDialog getDatos={getDataPublish}/>
      <PageTitle title="Publicaciones" />
      <Grid container spacing={4} direction="row" justify="space-evenly">
        {isLoading ? (
          <CircularProgress size={26} className={classes.loginLoader} />
        ) : (
          data.data.reverse().map((x) => <RecipeReviewCard datos={x} key={x.id}/>)
        )}
      </Grid>
    </>
  );
}