import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Solution from "./Solution.tsx";
import MessageKey from "./MessageKey.tsx";
import Footer from "./Footer.tsx";
import {useSearchParams} from "react-router-dom";
import {useState} from "react";
import {R8} from "./Rot8000.tsx";

function Solve() {
    const [searchParams] = useSearchParams();
    const encoded = searchParams.get("m");
    const message = R8.decode(JSON.parse(decodeURIComponent(encoded as string)));

    const [answers, setAnswers] = useState(new Map<string, string>());
    const setAnswer = (char: string, value: string) => {
        answers.set(char, value);
        setAnswers(prevState => {
            prevState.set(char, value);
            return new Map(prevState);
        });
    }

    return (
        <>
        <Container maxWidth="lg">
            <Box sx={{ my: 10 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 2, mt: 1 }}>
                    Mystery Message Maker
                </Typography>
                <Solution message={message} answers={answers} />
                <MessageKey message={message} answers={answers} setAnswer={setAnswer} />
            </Box>
        </Container>
        <Footer />
        </>
    );
}
export default Solve
