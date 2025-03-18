import { useEffect, useState } from "react";
import Process from "../../components/Dashboard/Process";
import StackGame from "../../components/Game/StackGame";

const API_BASE =
  "https://psychologysupporttest-cvexa2gae4a3a4gt.eastasia-01.azurewebsites.net";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const questionRes = await fetch(
          `${API_BASE}/test-questions/8fc88dbb-daee-4b17-9eca-de6cfe886097?pageSize=50`
        );
        const questionData = await questionRes.json();
        let questionList = questionData.testQuestions.data;

        const questionWithOptions = await Promise.all(
          questionList.map(async (q) => {
            const optionsRes = await fetch(
              `${API_BASE}/question-options/${q.id}`
            );
            const optionsData = await optionsRes.json();
            return { ...q, options: optionsData.questionOptions.data };
          })
        );

        setQuestions(questionWithOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  if (loading) return <p>Loading questions...</p>;

  return (
    <>
      <StackGame />
    </>
  );
}
