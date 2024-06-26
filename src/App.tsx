import './App.css'
import {ChangeEvent, useState} from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {
    Button,
    Checkbox, FormControl,
    FormControlLabel,
    FormGroup, FormLabel,
    Grid,
    TextField
} from "@mui/material";
import Solution from "./components/Solution.tsx";
import MessageKey from "./components/MessageKey.tsx";
import Footer from "./components/Footer.tsx";
import { Link as RouterLink  } from "react-router-dom";
import {R8} from "./util/Rot8000.tsx";
import FieldsetBox from "./components/FieldsetBox.tsx";
import Header from "./components/Header.tsx";

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

type Operation = "addition" | "subtraction" | "multiplication" | "division";

function App() {
    const [message, setMessage] = useState<MessageSolution>({
        title: "Can you decode this mystery message?",
        message: "",
        words: []
    })

    const [answerRange, setAnswerRange] = useState<number[]>([0, 9]);
    const [answers, setAnswers] = useState(new Map<string, string>());
    const initialOperation = new Map<Operation, boolean>();
    initialOperation.set("addition", true);
    initialOperation.set("subtraction", false);
    initialOperation.set("multiplication", false);
    initialOperation.set("division", false);
    const [operations, setOperations] = useState(initialOperation);

    const setAnswer = (char: string, value: string) => {
        answers.set(char, value);
        setAnswers(prevState => {
            prevState.set(char, value);
            return new Map(prevState);
        });
    }

    function generateQuestion(answer: number) {
        const enabledOps = [...operations.entries()].filter(v => v[1]);
        const randomOp = enabledOps[Math.floor(Math.random() * enabledOps.length)][0];

        switch (randomOp) {
            case "addition": {
                const term = Math.floor(Math.random() * answer);
                return `${term} + ${answer - term}`;
            }
            case "subtraction": {
                const term = Math.floor(Math.random() * answer);
                return `${answer + term} - ${term}`;
            }
            case "multiplication": {
                if (answer === 0) {
                    const term = Math.floor(Math.random() * answerRange[1]);
                    return `${term} × 0`;
                }
                let term = Math.floor(Math.random() * (answer / 2));
                if (term === 0) {
                    return `1 × ${answer}`;
                }
                while (answer % term != 0) {
                    term -= 1;
                }
                return `${term} × ${answer / term}`;
            }
            case "division": {
                if (answer === 0) {
                    const term = Math.floor(Math.random() * answerRange[1]);
                    return `0 ÷ ${term === 0 ? 1 : term}`;
                }
                const term = Math.floor(Math.random() * (answer / 2));
                if (term === 0) {
                    return `${answer} ÷ 1`;
                }
                return `${answer * term} ÷ ${term}`;
            }
        }
    }

    const resetQuestion = (char: string) => {
        setMessage(prevState => {
            return {
                title: prevState.title,
                message: prevState.message,
                words: prevState.words.map(w => {
                    return w.map(c => {
                        if (c.c === char && typeof c.a === "number") {
                            c.q = generateQuestion(c.a);
                        }
                        return c;
                    })
                }),
            };
        })
    }

    function getMappings(solution: string) {
        const all = [...solution.toLowerCase()];
        const mappings = all
            .map(v => v.toLowerCase())
            .filter((v, i) => {
                return i === all.lastIndexOf(v)
            });
        return {all, mappings};
    }

    const handleAnswerRange = (_: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        const {mappings} = getMappings(message.message);
        const minDistance = mappings.length;

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
        setMessageSolution(message.title, message.message, true)
    };

    function handleOperationChecked(operation: Operation, checked: boolean) {
        setOperations(prevState => {
            // if this is the last enabled option, prevent unchecking it
            const other = [...prevState.entries()].find(v => v[0] !== operation && v[1]);
            if (!checked && !other) {
                return prevState;
            }
            prevState.set(operation, checked);
            return new Map(prevState);
        });
        setAnswers(new Map())
        setMessageSolution(message.title, message.message, true);
    }

    const handleAdditionChecked = (_: ChangeEvent, checked: boolean) => {
        handleOperationChecked("addition", checked);
    }
    const handleSubtractionChecked = (_: ChangeEvent, checked: boolean) => {
        handleOperationChecked("subtraction", checked);
    }

    const handleMultiplicationChecked = (_: ChangeEvent, checked: boolean) => {
        handleOperationChecked("multiplication", checked);
    }

    const handleDivisionChecked = (_: ChangeEvent, checked: boolean) => {
        handleOperationChecked("division", checked);
    }

    const setMessageSolution = (title: string, solution: string, force: boolean) => {
        const {all, mappings} = getMappings(solution);

        const minDistance = mappings.length;

        let distance = answerRange[1] - answerRange[0];
        if (distance < minDistance) {
            distance = minDistance
            setAnswerRange([answerRange[0], answerRange[0] + distance])
            setAnswers(new Map())
        }

        setMessage(prevState => {
            if (!force && prevState.message === solution) {
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
                    question = generateQuestion(answer);
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
        <div className="configBox">
            <Header solve={false} />
            <Box sx={{ my: 5 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 3, mt: 1, fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem"} }}>
                    Mystery Message Maker
                </Typography>
                <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    value={message.title}
                    onChange={(e) => setMessageSolution(e.target.value, message.message, false)}
                    sx={{ mb: 3 }}
                    autoComplete='off'
                    fullWidth
                />
                <TextField
                    id="message"
                    label="Message"
                    variant="outlined"
                    value={message.message}
                    onChange={(e) => setMessageSolution(message.title, e.target.value, false)}
                    sx={{ mb: 3 }}
                    autoComplete='off'
                    fullWidth
                />
                { message.message.length > 0 &&
                    <>
                        <FieldsetBox title="Problem" style={{marginBottom: "1.5rem"}}>
                            <Solution message={message} answers={answers} />
                            <MessageKey message={message} answers={answers} setAnswer={setAnswer} resetQuestion={resetQuestion} />
                        </FieldsetBox>
                        <FieldsetBox title="Parameters" style={{marginBottom: "1.5rem"}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <FormControl component="fieldset" variant="standard">
                                        <FormLabel component="legend">Operations</FormLabel>
                                            <FormGroup>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={5} sm={4} md={5}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox checked={operations.get("addition")}
                                                                          onChange={handleAdditionChecked} />
                                                            }
                                                            label="Addition"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox checked={operations.get("subtraction")}
                                                                          onChange={handleSubtractionChecked} />
                                                            }
                                                            label="Subtraction"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={5} sm={4} md={5}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox checked={operations.get("multiplication")}
                                                                          onChange={handleMultiplicationChecked} />
                                                            }
                                                            label="Multiplication"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox checked={operations.get("division")}
                                                                          onChange={handleDivisionChecked} />
                                                            }
                                                            label="Division"
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </FormGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ marginLeft: "0.5rem" }}>
                                        <Typography id="answer-range-slider" gutterBottom style={{marginLeft: "-0.5rem"}}>
                                            <FormLabel>Answer range: {answerRange[0]} - {answerRange[1]}</FormLabel>
                                        </Typography>
                                        <Slider
                                            getAriaLabel={() => 'Answer range'}
                                            value={answerRange}
                                            onChange={handleAnswerRange}
                                            valueLabelDisplay="off"
                                            getAriaValueText={(value, i) => i == 0 ? `From ${value}` : `To ${value}`}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </FieldsetBox>
                        <Button variant="contained" component={RouterLink} to={`/solve?m=${R8.encode(message)}`}>
                            Solve
                        </Button>
                    </>
                }
            </Box>
            <Footer linkToAbout={true} />
        </div>
    );
}

export default App
