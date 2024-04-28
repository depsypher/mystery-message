import "./Solution.css";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {MessageSolution} from "../App.tsx";
import Typography from "@mui/material/Typography";

interface Props {
    message: MessageSolution;
    answers: Map<string, string>;
}

export default function Solution(props: Props) {
    const answers = props.answers;
    const message = props.message;

    const spots = message.words.map((word, wi) => {
        const inverted = new Map(Array.from(answers, entry => [entry[1], entry[0]]))

        const w = word.map((char, ci) => {
            const val = char && !char.w && inverted.get(`${char.a}`) ? inverted.get(`${char.a}`) : "";
            return <span key={`ch-${ci}`} className="char">
                { char && !char.w ?
                    <>
                        <TextField
                            id={`cht-${wi}-${ci}`}
                            style={{width: "3rem"}}
                            autoComplete="off"
                            inputProps={{maxLength: 1, style: {textAlign: 'center', fontSize: 20}}}
                            value={val && val.toUpperCase()}
                            disabled={true}
                        />
                        <div>
                            {char.a}
                        </div>
                    </>
                    :
                    <div></div>
                }
            </span>;
        });
        return <span key={`word-${wi}`} className="word">
           {w}
        </span>
    });

    if (message.message.length === 0) {
        return null;
    }
    return (
        <>
            <Typography id="solution" gutterBottom variant={"overline"}>
                Solution:
            </Typography>

            <Box className="solutionBox">
                { spots }
            </Box>
        </>
    )
}
