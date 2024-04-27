import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {MessageSolution} from "../App.tsx";
import Typography from "@mui/material/Typography";

// function LightBulbIcon(props: SvgIconProps) {
//     return (
//         <SvgIcon {...props}>
//             <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
//         </SvgIcon>
//     );
// }

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
            return <span key={`ch-${ci}`} style={{marginRight: "1rem", textAlign: "center"}}>
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
        return <span key={`word-${wi}`} style={{display: "flex", marginRight: "1rem", marginBottom: "0.5rem"}}>
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

            <Box style={{ display: "flex", width: "fit-content", flexWrap: "wrap"}}>
                { spots }
            </Box>
        </>
    )
}
