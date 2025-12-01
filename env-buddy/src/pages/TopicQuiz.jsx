import { useParams } from "react-router-dom";
import { Box, Typography, Button, Card, Stack } from "@mui/material";
import { useState } from "react";
import infoQuestions from "../data/infoQuestions";

export default function TopicQuiz() {
  const { topic } = useParams();
  const content = infoQuestions[topic];

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!content) return <Typography>Topic not found</Typography>;

  const current = content.questions[index];

  const handleNext = () => {
    if (selected === current.correct) setScore(score + 1);

    if (index + 1 < content.questions.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  return (
    <Box textAlign="center">
      {/* Illustration */}
      <img
        src={content.illustration}
        alt="Topic Illustration"
        style={{ height: 180, marginBottom: "1rem" }}
      />

      <Typography variant="h4" fontWeight={700} mb={3}>
        {content.title}
      </Typography>

      {!finished ? (
        <Card sx={{ p: 3, bgcolor: "#e9f7e7", borderRadius: 4 }}>
          <Typography variant="h6" mb={2}>
            {current.q}
          </Typography>

          <Stack spacing={2}>
            {current.options.map((opt, i) => (
              <Button
                key={i}
                variant={selected === i ? "contained" : "outlined"}
                onClick={() => setSelected(i)}
                sx={{
                  bgcolor: selected === i ? "primary.main" : "white",
                  color: selected === i ? "white" : "black",
                }}
              >
                {opt}
              </Button>
            ))}
          </Stack>

          {selected !== null && (
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={handleNext}
            >
              {index + 1 === content.questions.length ? "Finish" : "Next"}
            </Button>
          )}

          <Typography mt={2} color="text.secondary">
            Question {index + 1}/{content.questions.length}
          </Typography>
        </Card>
      ) : (
        <Card sx={{ p: 4, bgcolor: "#e3fad9", borderRadius: 4 }}>
          <Typography variant="h5" fontWeight={600}>
            🎉 You scored {score}/{content.questions.length}!
          </Typography>
          <Typography mt={2} color="text.secondary">
            Great job, Eco Hero! 🌱💪
          </Typography>
        </Card>
      )}
    </Box>
  );
}
