import AddBoxIcon from '@mui/icons-material/AddBox';
import InfoIcon from '@mui/icons-material/Info';
import PrintIcon from '@mui/icons-material/Print';
import {Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link";

function Header() {

    return (
        <div id="header" style={{position: "fixed", right: "3em", color: "rgba(0,0,0,0.25)"}}>
            <div style={{display: "flex", gap: "1em"}}>
                <Link component={RouterLink} color="inherit" to="/">
                    <AddBoxIcon />
                </Link>
                <Link color="inherit" href="#" onClick={() => window.print()}>
                    <PrintIcon />
                </Link>
                <Link color="inherit" href="https://github.com/depsypher/mystery-message">
                    <InfoIcon />
                </Link>
            </div>
        </div>
    );
}

export default Header
