import React, { useLayoutEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import classnames from "classnames";
import RecipeReviewCard from '../../components/card/Publication'
import FormDialog from '../../components/card/newPublication'

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
  var [notificationsPosition, setNotificationPosition] = useState(2);
  var [errorToastId, setErrorToastId] = useState(null);

  let description = "Lorem ipsum dolor sit amet consectetur adipiscing elit cras, nascetur tellus metus duis dapibus per pellentesque ornare aptent, nisl est lobortis netus mus suscipit maecenas. Per elementum feugiat scelerisque semper massa rutrum aliquam, nibh imperdiet gravida aptent congue tempus vestibulum, magna volutpat ante maecenas hac condimentum. In purus nulla bibendum nibh tristique dictumst vestibulum."


  let data = [
  {
    name:'Lavadora',
    id: '1',
    userName: 'harold',
    date: 'Junio 11, 2021',
    description: description
  },
  {
    name:'Radio',
    id: '2',
    userName: 'Pepe',
    date: 'Junio 11, 2021',
    description: description
  },
  {
    name:'Bafle',
    id: '3',
    userName: 'Carlos',
    date: 'Junio 11, 2021',
    description: description
  },
  {
    name:'cable',
    id: '4',
    userName: 'Rodrigo',
    date: 'Junio 11, 2021',
    description: description
  },
  {
    name:'moden',
    id: '5',
    userName: 'Elver',
    date: 'Junio 11, 2021',
    description: description
  },
  {
    name:'pc',
    id: '6',
    userName: 'Jose',
    date: 'Junio 11, 2021',
    description: description
  },
  {
    name:'sim',
    id: '7',
    userName: 'Caremonda',
    date: 'Junio 11, 2021',
    description: description
  },
  ]
  return (
    <>
      <FormDialog />
      <PageTitle title="Publicaciones" />
      <Grid container spacing={4}  direction="row" justify="space-evenly">
        {data.map((x) => (
              <RecipeReviewCard datos={x}/>
        ))}
        </Grid>

    </>
  );

  // #############################################################
  function sendNotification(componentProps, options) {
    return toast(
      <Notification
        {...componentProps}
        className={classes.notificationComponent}
      />,
      options,
    );
  }

  function retryErrorNotification() {
    var componentProps = {
      type: "message",
      message: "Message was sent successfully!",
      variant: "contained",
      color: "success",
    };
    toast.update(errorToastId, {
      render: <Notification {...componentProps} />,
      type: "success",
    });
    setErrorToastId(null);
  }

  function handleNotificationCall(notificationType) {
    var componentProps;

    if (errorToastId && notificationType === "error") return;

    switch (notificationType) {
      case "info":
        componentProps = {
          type: "feedback",
          message: "New user feedback received",
          variant: "contained",
          color: "primary",
        };
        break;
      case "error":
        componentProps = {
          type: "message",
          message: "Message was not sent!",
          variant: "contained",
          color: "secondary",
          extraButton: "Resend",
          extraButtonClick: retryErrorNotification,
        };
        break;
      default:
        componentProps = {
          type: "shipped",
          message: "The item was shipped",
          variant: "contained",
          color: "success",
        };
    }

    var toastId = sendNotification(componentProps, {
      type: notificationType,
      position: positions[notificationsPosition],
      progressClassName: classes.progress,
      onClose: notificationType === "error" && (() => setErrorToastId(null)),
      className: classes.notification,
    });

    if (notificationType === "error") setErrorToastId(toastId);
  }

  function changeNotificationPosition(positionId) {
    setNotificationPosition(positionId);
  }
}

// #############################################################
function CloseButton({ closeToast, className }) {
  return <CloseIcon className={className} onClick={closeToast} />;
}
