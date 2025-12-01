import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Avatar, Button, Paper, useTheme } from "@mui/material";
import kidImg from "../assets/kid.png";
import buddyImg from "../assets/buddy.png";

const questions = [
  { q: "Which bin should plastic go into?", answer: "Blue", options: ["Blue", "Green", "Red", "Black"] },
  { q: "Which material can be recycled?", answer: "Paper", options: ["Paper", "Food waste", "Used tissues", "Clothes"] },
  { q: "What should you do before recycling plastic?", answer: "Rinse it", options: ["Rinse it", "Break it", "Burn label", "Throw with food"] },
  { q: "What symbol means recyclable?", answer: "♻️", options: ["⚠️", "♻️", "🔥", "💀"] }
];

const TOTAL_CORRECT_NEEDED = 8;
export default function QuizChat() {
  const theme = useTheme(); // access current theme colors
  const [chat, setChat] = useState([{ from: "buddy", text: questions[0].q }]);
  const [current, setCurrent] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  const sendMessage = (from, text) => setChat(prev => [...prev, { from, text }]);

  const handleAnswer = (selected) => {
    const correctAnswer = questions[current].answer;
    sendMessage("kid", selected);

    if (selected === correctAnswer) {
      setCorrectCount(c => c + 1);
      setTimeout(() => sendMessage("buddy", "✅ Correct!"), 500);

      if (correctCount + 1 >= TOTAL_CORRECT_NEEDED) {
        setTimeout(() => {
          setFinished(true);
          sendMessage("buddy", "🎉 You completed the recycling mission!");
        }, 800);
      } else {
        const next = (current + 1) % questions.length;
        setCurrent(next);
        setTimeout(() => sendMessage("buddy", questions[next].q), 1000);
      }
    } else {
      setTimeout(() => sendMessage("buddy", "❌ Try again!"), 500);
      setTimeout(() => sendMessage("buddy", questions[current].q), 900);
    }
  };

  const restart = () => {
    setChat([{ from: "buddy", text: questions[0].q }]);
    setCurrent(0);
    setCorrectCount(0);
    setFinished(false);
  };

  return (
    <Box sx={{ p: 2, bgcolor: theme.palette.background.default, height: "92vh" }}>
      <Box sx={{
        maxWidth: 500,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "12px",
        overflow: "hidden"
      }}>

        {/* Chat Messages */}
        <Box ref={chatBoxRef} sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "#e9edf0",
        }}>
          {chat.map((msg, i) => (
            <Box key={i} sx={{
              display: "flex",
              justifyContent: msg.from === "kid" ? "flex-end" : "flex-start",
              mb: 2
            }}>
              {msg.from === "buddy" && <Avatar src={buddyImg} sx={{ mr: 1 }} />}
              <Paper sx={{
                px: 2,
                py: 1,
                bgcolor: msg.from === "kid" ? (theme.palette.mode === "dark" ? "#2e7d32" : "#dcf8c6") : theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: "16px",
                maxWidth: "70%"
              }}>
                <Typography>{msg.text}</Typography>
              </Paper>
              {msg.from === "kid" && <Avatar src={kidImg} sx={{ ml: 1 }} />}
            </Box>
          ))}
        </Box>

        {/* Options */}
        {!finished ? (
          <Box sx={{ p: 2, display: "grid", gap: 1 }}>
            {questions[current].options.map((opt, index) => (
              <Button
                key={index}
                variant="contained"
                onClick={() => handleAnswer(opt)}
                sx={{
                  borderRadius: "18px",
                  bgcolor: theme.palette.mode === "dark" ? "#128C7E" : "#128C7E",
                  ":hover": { bgcolor: theme.palette.mode === "dark" ? "#0b6e60" : "#0b6e60" }
                }}
              >
                {opt}
              </Button>
            ))}
          </Box>
        ) : (
          <Button
            onClick={restart}
            variant="contained"
            sx={{ bgcolor: theme.palette.mode === "dark" ? "#075E54" : "#075E54", m: 2 }}
          >
            🔄 Try Again
          </Button>
        )}
      </Box>
    </Box>
  );
}
