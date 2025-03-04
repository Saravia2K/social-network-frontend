import { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import EmojiPicker from "emoji-picker-react";
import { FiSend, FiSmile } from "react-icons/fi";
import COLORS from "../../utils/colors";
import useUsers from "../../hooks/useUsers";
import Avatar from "../../components/Avatar";
import useMyMessages from "../../hooks/useMyMessages";
import useUser from "../../hooks/useUser";
import MessageServices from "../../services/MessageServices";

const ChatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "90vh",
  gap: 2,
  padding: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    height: "100vh",
  },
}));

const MessageArea = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  maxHeight: "100%",
});

const MessageContainer = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "16px",
});

const Message = styled(Paper)<{ isOwn: boolean }>(({ theme, isOwn }) => ({
  padding: theme.spacing(1, 2),
  marginBottom: theme.spacing(1),
  maxWidth: "70%",
  alignSelf: isOwn ? "flex-end" : "flex-start",
  backgroundColor: isOwn ? COLORS.MAIN_BLUE : COLORS.SOFT_GREY,
  color: isOwn ? "#fff" : "inherit",
  width: "auto",
}));

const ChatUI = () => {
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { users } = useUsers();
  const { user } = useUser();
  const { messages, reloadMessages } = useMyMessages(+user!.id);
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id ?? 0);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await MessageServices.sendMessage(user!.id, selectedUserId, newMessage);
      setNewMessage("");
      reloadMessages();
    }
  };

  return (
    <ChatContainer>
      {!isMobile && (
        <Paper elevation={3} sx={{ width: 280, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Usuarios
          </Typography>
          <List>
            {users
              .filter((u) => u.id != user?.id)
              .map((u) => (
                <ListItem
                  key={u.id}
                  sx={{ cursor: "pointer" }}
                  onClick={() => setSelectedUserId(u.id)}
                >
                  <ListItemAvatar>
                    <Avatar name={u.username} />
                  </ListItemAvatar>
                  <ListItemText primary={u.username} />
                </ListItem>
              ))}
          </List>
        </Paper>
      )}

      <MessageArea>
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <MessageContainer>
            {messages
              .filter(
                (m) =>
                  m.idUsuarioTo.id == selectedUserId ||
                  m.idUsuarioFrom.id == selectedUserId
              )
              .map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: "flex",
                    flexDirection:
                      message.idUsuarioFrom.id == user?.id
                        ? "row-reverse"
                        : "row",
                    mb: 2,
                  }}
                >
                  <Avatar name={message.idUsuarioFrom.username} />
                  <Box>
                    <Message isOwn={message.idUsuarioFrom.id == user?.id}>
                      <Typography variant="body1">{message.message}</Typography>
                    </Message>
                    <Typography
                      variant="caption"
                      sx={{ ml: 1, color: "text.secondary" }}
                    >
                      {new Date(message.date).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Box>
              ))}
            {isTyping && (
              <Typography
                variant="caption"
                sx={{ ml: 1, color: "text.secondary" }}
              >
                Someone is typing...
              </Typography>
            )}
            <div ref={messageEndRef} />
          </MessageContainer>

          <Stack
            direction="row"
            spacing={1}
            sx={{ p: 2, borderTop: 1, borderColor: "divider" }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    aria-label="emoji picker"
                  >
                    <FiSmile />
                  </IconButton>
                ),
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              aria-label="send message"
            >
              <FiSend />
            </IconButton>
          </Stack>
          {showEmojiPicker && (
            <Box sx={{ position: "absolute", bottom: "100%", right: 0 }}>
              <EmojiPicker
                onEmojiClick={(emojiObject) =>
                  setNewMessage((prev) => prev + emojiObject.emoji)
                }
              />
            </Box>
          )}
        </Paper>
      </MessageArea>
    </ChatContainer>
  );
};

export default ChatUI;
