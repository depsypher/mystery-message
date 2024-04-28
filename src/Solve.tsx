import './App.css'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Solution from "./components/Solution.tsx";
import MessageKey from "./components/MessageKey.tsx";
import Footer from "./components/Footer.tsx";
import {useSearchParams} from "react-router-dom";
import {useState} from "react";
import {R8} from "./util/Rot8000.tsx";
import Header from "./components/Header.tsx";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import {TCanvasConfettiInstance, TConductorInstance} from "react-canvas-confetti/dist/types";

function Solve() {
    const [searchParams] = useSearchParams();
    const encoded = searchParams.get("m");
    const message = R8.decode(JSON.parse(decodeURIComponent(encoded as string)));

    const [answers, setAnswers] = useState(new Map<string, string>());
    const [conductor, setConductor] = useState<TConductorInstance>();

    const setAnswer = (char: string, value: string) => {
        setAnswers(prevState => {
            prevState.set(char, value);

            const chars = message.words.flat();
            const incorrect = chars.filter(char => {
                const a = prevState.get(char.c);
                return a != char.a;
            });
            if (incorrect.length === 0) {
                conductor?.shoot();
            }

            return new Map(prevState);
        });
    }

    const initFireworks = ({conductor}: { confetti: TCanvasConfettiInstance, conductor: TConductorInstance }) => {
        setConductor(conductor)
    };

    return (
        <>
            <Fireworks onInit={initFireworks} />
            <Header solve={true} />
            <Container maxWidth="lg">
                <Box id="solve">
                    <Typography variant="h4" component="h1" sx={{mb: 2}}>
                        {message.title}
                    </Typography>
                    <Solution message={message} answers={answers}/>
                    <MessageKey message={message} answers={answers} setAnswer={setAnswer}/>
                </Box>
            </Container>
            <Footer linkToAbout={false} />
        </>
    );
}

export default Solve
