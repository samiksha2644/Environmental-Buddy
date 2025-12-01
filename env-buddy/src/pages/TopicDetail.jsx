// src/pages/TopicDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import { topicsData } from "../data/topics";
import Kid from "../assets/kid.png";
import Buddy from "../assets/buddy.png";

export default function TopicDetail() {
  const { topic } = useParams();
  const navigate = useNavigate();
  const topicInfo = topicsData[topic];
  const [messages, setMessages] = useState([
    { sender: "buddy", text: topicInfo.questions[0].question },
  ]);
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  if (!topicInfo) return <h1>Topic Not Found</h1>;

  const current = topicInfo.questions[index];

  const handleAnswer = (opt, i) => {
    // Show Kid answer
    setMessages((prev) => [...prev, { sender: "kid", text: opt }]);

    if (i === current.answer) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (index + 1 < topicInfo.questions.length) {
        const newIdx = index + 1;
        setIndex(newIdx);

        // Next question (from Buddy)
        setMessages((prev) => [
          ...prev,
          { sender: "buddy", text: topicInfo.questions[newIdx].question },
        ]);
      } else {
        // Quiz Completed
        setMessages((prev) => [
          ...prev,
          { sender: "buddy", text: "🎉 You finished the challenge!" },
        ]);
        setCompleted(true);
      }
    }, 600);
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        p: 2,
        bgcolor: "#e6ffe6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Chat box */}
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 520,
          p: 2,
          bgcolor: "white",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          height: "75vh",
          overflowY: "auto",
          gap: 1.5,
        }}
      >
        {messages.map((msg, i) => {
          const isBuddy = msg.sender === "buddy";
          const showAvatar =
            i === 0 || messages[i - 1].sender !== msg.sender;
          return (
            <Stack
              key={i}
              direction={isBuddy ? "row" : "row-reverse"}
              gap={1}
              alignItems="flex-start"
              sx={{ animation: "fadeIn 0.4s ease" }}
            >
              {showAvatar && (
                <Avatar
                  src={isBuddy ? Buddy : Kid}
                  sx={{
                    width: 40,
                    height: 40,
                    border: isBuddy
                      ? "2px solid #4caf50"
                      : "2px solid #8e8e8e",
                  }}
                />
              )}

              <Paper
                sx={{
                  p: 1.5,
                  maxWidth: "70%",
                  bgcolor: isBuddy ? "#DCF8C6" : "#EDEDED",
                  borderRadius: 3,
                }}
              >
                <Typography>{msg.text}</Typography>
              </Paper>
            </Stack>
          );
        })}
      </Paper>

      {/* Answer chips */}
      {!completed ? (
        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" justifyContent="center">
          {current.options.map((opt, i) => (
            <Chip
              key={i}
              label={opt}
              clickable
              onClick={() => handleAnswer(opt, i)}
              sx={{
                bgcolor: "success.light",
                "&:hover": { bgcolor: "success.main", color: "#fff" },
                mb: 1,
              }}
            />
          ))}
        </Stack>
      ) : (
        <Button
          onClick={() => navigate("/info")}
          variant="contained"
          sx={{ mt: 2, bgcolor: "green" }}
        >
          Back to Info Hub
        </Button>
      )}
    </Box>
  );
}
