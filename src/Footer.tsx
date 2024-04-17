import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink  } from "react-router-dom";
import flagSvg from "/Flag_of_British_Columbia.svg"

function Footer() {
    return (
        <div style={{marginTop: "auto"}}>
            <Typography variant="body2" color="text.secondary" align="center">
                <Link component={RouterLink} color="inherit" to="/">Mystery Message Maker</Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
                <img src={flagSvg} width="60" style={{marginTop: ".4rem"}} />
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" style={{marginBottom: "0rem"}}>
                Made in beautiful British Columbia
            </Typography>
        </div>
    );
}

export default Footer
