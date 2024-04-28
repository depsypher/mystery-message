import "./MessageKey.css"
import Box from "@mui/material/Box";
import {MessageSolution} from "../App.tsx";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import {Rng} from "../util/Rng.ts";
import Tooltip from "@mui/material/Tooltip";

interface Props {
    message: MessageSolution;
    answers: Map<string, string>;
    setAnswer: (char: string, value: string) => void;
    resetQuestion?: (c: string) => void;
}

export default function MessageKey(props: Props) {
    const {message, answers, setAnswer, resetQuestion} = props;
    const flat = [...message.words].flat();
    const ids = flat.map(v => v.c)
    const chars = flat.filter((v, i) => !ids.includes(v.c, i + 1));

    function updateQuestion(char: string) {
        resetQuestion && resetQuestion(char);
    }
    const rng = Rng(message.message, ..."some arbitrary extra seed");
    const mappings = chars
        .sort(() => {
            return rng.random() - 0.5;
        })
        .map((char, i) =>
            <Tooltip key={`map-${i}`} title={resetQuestion ? "Click for new problem" : ""} placement="top" arrow>
                <span className="mappingBox">
                    <div className="mappingBoxInner">
                        <span onClick={() => updateQuestion(char.c)}>
                            <strong>{char.c.toUpperCase()}</strong>
                            <strong className="colon">:</strong>
                            <span className="question">{char.q} =</span>
                        </span>
                        <TextField
                            id={`mkc-${i}`}
                            style={{width: "3.1rem", marginLeft: "0.5rem"}}
                            autoComplete="off"
                            inputProps={{maxLength: 3, style: {textAlign: 'center', fontSize: 20, padding: "0.5rem"}}}
                            value={answers.get(char.c) || ""}
                            onChange={(e) => setAnswer(char.c, e.target.value)}
                        />
                    </div>
                </span>
            </Tooltip>
        );

    if (message.message.length === 0) {
        return null;
    }

    return (
        <>
            <Typography id="message-key" gutterBottom variant={"overline"}>
                Message Key:
            </Typography>

            <Box className="mappingBoxOuter">
                {mappings}
            </Box>
        </>
    )
}
