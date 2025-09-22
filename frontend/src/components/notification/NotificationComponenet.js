import { Notification } from "@mantine/notifications"; import { notifications } from "@mantine/notifications";


function NotificationComponent(title, message, color) {
  return (
    // <Notification color={color} title={title}>
    //   {message}{" "}
    // </Notification>
    notifications.show({
      title,
      message,
      color,
    })
  );
}

export default NotificationComponent;
