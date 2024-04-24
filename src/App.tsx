import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {useState} from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {TextField} from "@mui/material";
import Solution from "./Solution.tsx";
import MessageKey from "./MessageKey.tsx";
import Footer from "./Footer.tsx";
import Link from "@mui/material/Link";
import { Link as RouterLink  } from "react-router-dom";
import {R8} from "./Rot8000.tsx";

interface Char {
    c: string;
    w: boolean;
    q: string;
    a: string | number;
}
export interface MessageSolution {
    title: string;
    message: string;
    words: Char[][];
}

function App() {
    const [message, setMessage] = useState<MessageSolution>({
        title: "Can you decode this mystery message?",
        message: "",
        words: []
    })

    const [answerRange, setAnswerRange] = useState<number[]>([0, 9]);
    const [answers, setAnswers] = useState(new Map<string, string>());

    const setAnswer = (char: string, value: string) => {
        answers.set(char, value);
        setAnswers(prevState => {
            prevState.set(char, value);
            return new Map(prevState);
        });
    }

    const resetQuestion = (char: string) => {
        setMessage(prevState => {
            return {
                title: prevState.title,
                message: prevState.message,
                words: prevState.words.map(w => {
                    return w.map(c => {
                        if (c.c === char && typeof c.a === "number") {
                            const term = Math.floor(Math.random() * c.a);
                            c.q = `${term} + ${c.a - term}`
                        }
                        return c;
                    })
                }),
            };
        })
    }

    const handleAnswerRange = (_: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        const chars = [...new Set(message.words.flat())];
        const minDistance = chars.length - 1;

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setAnswerRange([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setAnswerRange([clamped - minDistance, clamped]);
            }
        } else {
            setAnswerRange(newValue as number[]);
        }
        setMessageSolution(message.title, message.message)
    };

    const setMessageSolution = (title: string, solution: string) => {
        const all = [...solution.toLowerCase()]

        const mappings = all
            .map(v => v.toLowerCase())
            .filter((v, i) => { return i === all.lastIndexOf(v) })

        const minDistance = mappings.length;

        let distance = answerRange[1] - answerRange[0];
        if (distance < minDistance) {
            distance = minDistance
            setAnswerRange([answerRange[0], answerRange[0] + distance])
            setAnswers(new Map())
        }

        setMessage(prevState => {
            if (prevState.message === solution) {
                return {
                    title: title,
                    message: solution,
                    words: message.words
                }
            }
            const keys = new Map<string, number>();
            const chars = mappings.map(c => {
                const isWhitespace = c.trim() === "";
                let question = "";
                if (!isWhitespace && !keys.has(c)) {
                    const values = [...keys.values()];

                    let answer = 0
                    // eslint-disable-next-line no-constant-condition
                    while (true) {
                        answer = Math.floor(Math.random() * distance) + answerRange[0];
                        if (!values.includes(answer)) {
                            keys.set(c, answer);
                            break;
                        }
                    }
                    const term = Math.floor(Math.random() * answer)
                    question = `${term} + ${answer - term}`
                }

                const answer = keys.get(c) as number;
                return {
                    c: c,
                    w: isWhitespace,
                    q: question,
                    a: answer
                }
            });

            const words: Char[][] = [];
            let index = 0;
            for (const c of all) {
                const char = chars.find(v => v.c === c) as Char;
                if (!words[index]) {
                    words[index] = [char];
                } else if (!char.w) {
                    words[index].push(char);
                } else {
                    index++;
                }
            }
            return {
                title: title,
                message: solution,
                words: words
            }
        });
    }

    return (
        <>
        <div className="configBox">
            <Box sx={{ my: 5 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 2, mt: 1, fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem"} }}>
                    Mystery Message Maker
                </Typography>
                <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    value={message.title}
                    onChange={(e) => setMessageSolution(e.target.value, message.message)}
                    sx={{ mb: 2 }}
                    autoComplete='off'
                    fullWidth
                />
                <TextField
                    id="message"
                    label="Message"
                    variant="outlined"
                    value={message.message}
                    onChange={(e) => setMessageSolution(message.title, e.target.value)}
                    sx={{ mb: 2 }}
                    autoComplete='off'
                    fullWidth
                />
                <Box sx={{ alignItems: "flex-start" }}>
                    <Typography id="answer-range-slider" gutterBottom>
                        <strong>Answer range:</strong> {answerRange[0]} - {answerRange[1]}
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Answer range'}
                        value={answerRange}
                        onChange={handleAnswerRange}
                        valueLabelDisplay="off"
                        getAriaValueText={(value, i) => i == 0 ? `From ${value}` : `To ${value}`}
                    />
                </Box>
                <Solution message={message} answers={answers} />
                <MessageKey message={message} answers={answers} setAnswer={setAnswer} resetQuestion={resetQuestion} />
                {  message.message.length > 0 &&
                    <Link color="inherit" component={RouterLink} to={`/solve?m=${R8.encode(message)}`}>Solve</Link>
                }
            </Box>
            <Footer />
        </div>
        </>
    );
}

export default App
