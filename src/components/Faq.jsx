import { useState } from "react";
import "./Faq.css";
/*
Initially render 3 FAQ's
Only one FAQ can be open at a time
+ turns into - When opened
Deletes removes a question
Add validates the empty inputs
Add collapses all and shows new FAQ
*/

const initialFaqs = [
  {
    id: 1,
    question: "What is React?",
    answer: "React is a JS library",
    open: false,
  },
  {
    id: 2,
    question: "What is a Component?",
    answer: "A reusable piece of UI",
    open: false,
  },
  {
    id: 3,
    question: "What is a hook?",
    answer: "A function to manage state/lifecycle",
    open: false,
  },
];

const Faq = () => {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const addFaq = () => {
    if (!question.trim() || !answer.trim()) {
      alert("Please add both question and answer!");
      return;
    }
    const newFaq = {
      id: Date.now(),
      question,
      answer,
      open: false,
    };
    setFaqs((prevFaq) => {
      return [...prevFaq, newFaq];
    });
    setQuestion("");
    setAnswer("");
  };
  const deleteFaq = (id) => {
    setFaqs((prevFaq) => prevFaq.filter((faq) => faq.id !== id));
  };
  const toggleFaq = (id) => {
    setFaqs((prevFaq) => {
      return prevFaq.map((faq) =>
        faq.id === id ? { ...faq, open: !faq.open } : { ...faq, open: false }
      );
    });
  };
  return (
    <div className="faq">
      <h2>FAQs</h2>
      {faqs.map((faq) => (
        <div className="faq-list" key={faq.id}>
          <strong>{faq.question}</strong>
          <span className="toggle" onClick={() => toggleFaq(faq.id)}>
            <span>{faq.open ? "-" : "+"}</span>
          </span>
          <div className={faq.open ? "open" : "closed"}>
            {faq.open && <p>{faq.answer}</p>}
            <button onClick={() => deleteFaq(faq.id)}>Delete</button>
          </div>
        </div>
      ))}
      <div className="question">
        <textarea
          type="text"
          placeholder="Enter a question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Enter answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={addFaq}>Add Faq</button>
      </div>
    </div>
  );
};

export default Faq;
