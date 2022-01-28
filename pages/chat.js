import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { fetchMessages } from "../utils/RequestHandler";

export default function ChatPage() {
  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);

  //console.log(fetchMessages());

  function handleNewMessage(newMessage) {
    const messageObj = {
      text: newMessage,
      from: "felipexlr50",
      id: messageList.length.toString() + new Date().getTime().toString(),
    };

    setMessageList([messageObj, ...messageList]);
    setMessage("");
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage:
          "url(https://cutewallpaper.org/21/matrix-wallpaper-animated/Animated-Matrix-Code-Backgroundhd-wallpaperdownload-free-.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "65%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList messages={messageList} setList={setMessageList} />
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNewMessage(message);
                }
              }}
              placeholder="Insira sua message aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              onClick={(event) => {
                handleNewMessage(message);
              }}
              value="Enviar"
              variant="tertiary"
              colorVariant="neutral"
              label="Enviar"
              styleSheet={{
                width: "100px",
                height: "40px",
                borderRadius: "5px",
                backgroundColor: appConfig.theme.colors.primary[500],
                color: appConfig.theme.colors.neutrals["000"],
                marginLeft: "12px",
                textAlign: "center",
                textTransform: "uppercase",
                textColor: appConfig.theme.colors.neutrals["000"],
                hover: {
                  backgroundColor: appConfig.theme.colors.primary[600],
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.messages.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={"https://github.com/" + message.from + ".png"}
              />
              <Text tag="strong">{message.from}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
              <Button
                label="X"
                variant="tertiary"
                onClick={() => {
                  var filteredList = props.messages.filter(
                    (item) => item.id !== message.id
                  );
                  props.setList(filteredList);
                  console.log(filteredList);
                }}
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "8px",
                  borderRadius: "20%",
                }}
              />
            </Box>

            {message.text}
          </Text>
        );
      })}
    </Box>
  );
}
