import AddBoxIcon from '@mui/icons-material/AddBox';
import InfoIcon from '@mui/icons-material/Info';
import PrintIcon from '@mui/icons-material/Print';
import {Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link";
import Tooltip from '@mui/material/Tooltip';

function Header() {

    return (
        <div id="header" style={{position: "fixed", right: "3em", color: "rgba(0,0,0,0.25)"}}>
            <div style={{display: "flex", gap: "1em"}}>
                <Link component={RouterLink} color="inherit" to="/">
                    <Tooltip title="Make" arrow>
                        <AddBoxIcon />
                    </Tooltip>
                </Link>
                <Link color="inherit" href="#" onClick={() => window.print()}>
                    <Tooltip title="Print" arrow>
                        <PrintIcon />
                    </Tooltip>
                </Link>
                <Link color="inherit" href="https://github.com/depsypher/mystery-message">
                    <Tooltip title="About" arrow>
                        <InfoIcon />
                    </Tooltip>
                </Link>
            </div>
        </div>
    );
}

export default Header
