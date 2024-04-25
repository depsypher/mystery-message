import "./FieldsetBox.css";
import Box from '@mui/material/Box';
import {CSSProperties, ReactNode} from "react";

interface Props {
    title: string;
    children: ReactNode;
    style?: CSSProperties;
}

function FieldsetBox(props: Props) {
    const {title, children, style} = props;

    return (
        <Box component="fieldset" className="fieldsetBox" style={style}>
            <legend>
                <span>{title}</span>
            </legend>
            <Box className="fieldsetBoxContents">
                {children}
            </Box>
        </Box>
    );
}

export default FieldsetBox
