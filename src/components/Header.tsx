import "./Header.css";
import AddBoxIcon from '@mui/icons-material/AddBox';
import InfoIcon from '@mui/icons-material/Info';
import PrintIcon from '@mui/icons-material/Print';
import {Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link";
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {Snackbar} from "@mui/material";
import {useState} from "react";

function Header() {

    const [copyToastOpen, setCopyToastOpen] = useState(false);

    return (
        <div id="header">
            <div className="headerIcons">
                <Link component={RouterLink} color="inherit" to="/" target="_blank">
                    <Tooltip title="Make one" arrow>
                        <AddBoxIcon />
                    </Tooltip>
                </Link>
                <Link color="inherit" href="#"
                      onClick={() => {navigator.clipboard.writeText(document.location.href).then(() => setCopyToastOpen(true))}}>
                    <Tooltip title="Copy Link" arrow>
                        <ContentCopyIcon />
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
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={copyToastOpen}
                autoHideDuration={4000}
                onClose={() => setCopyToastOpen(false)}
                message="Link copied to clipboard!"
            />
        </div>
    );
}

export default Header
