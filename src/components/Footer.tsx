import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink  } from "react-router-dom";
import flagSvg from "/Flag_of_British_Columbia.svg"

function Footer() {
    return (
        <Link component={RouterLink} color="inherit" to="/" style={{marginTop: "auto", marginLeft: "auto", marginRight: "auto", textDecoration: "none"}}>
            <Typography variant="body2" color="text.secondary" align="center">
                Mystery Message Maker
            </Typography>
            <div style={{textAlign: "center"}}>
                <img src={flagSvg} width="60" style={{marginTop: ".4rem"}} />
            </div>
            <Typography variant="body2" color="text.secondary" align="center" style={{marginBottom: "0rem"}}>
                Made in beautiful British Columbia
            </Typography>
        </Link>
    );
}

export default Footer
