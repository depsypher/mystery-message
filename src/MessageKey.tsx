import Box from "@mui/material/Box";
import {MessageSolution} from "./App.tsx";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import {Rng} from "./Rng.ts";

interface Props {
    message: MessageSolution;
    answers: Map<string, string>;
    setAnswer: (char: string, value: string) => void;
    resetQuestion?: (c: string) => void;
}

export default function MessageKey(props: Props) {
    const answers = props.answers;
    const setAnswer = props.setAnswer;
    const message = props.message;
    const flat = [...message.words].flat();
    const ids = flat.map(v => v.c)
    const chars = flat.filter((v, i) => !ids.includes(v.c, i + 1));

    function updateQuestion(char: string) {
        props.resetQuestion && props.resetQuestion(char);
    }
    const rng = Rng(message.message, ..."some arbitrary extra seed");
    const mappings = chars
        .sort(() => {
            return rng.random() - 0.5;
        })
        .map((char, i) =>
            <span key={`map-${i}`}
                  style={{marginRight: "1.5rem", marginBottom: "1rem", border: "solid 1px black", padding: "1rem", minWidth: "7rem"}}
            >
                <div style={{display: "flex", alignItems: "center", whiteSpace: "nowrap"}}>
                    <span onClick={() => updateQuestion(char.c)}>
                        <strong>{char.c.toUpperCase()}</strong>: {char.q} =
                    </span>
                    <TextField
                        id={`mkc-${i}`}
                        style={{width: "3rem", marginLeft: "0.5rem"}}
                        autoComplete="off"
                        inputProps={{maxLength: 2, style: {textAlign: 'center', fontSize: 20, padding: "0.5rem"}}}
                        value={answers.get(char.c) || ""}
                        onChange={(e) => setAnswer(char.c, e.target.value)}
                    />
                </div>
            </span>
        );

    if (message.message.length === 0) {
        return null;
    }

    return (
        <>
            <Typography id="message-key" gutterBottom>
                <strong>Message Key:</strong>
            </Typography>

            <Box style={{ display: "flex", width: "fit-content", flexWrap: "wrap"}}>
                {mappings}
            </Box>
        </>
    )
}
