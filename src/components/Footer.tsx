import "./Footer.css";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink  } from "react-router-dom";
import flagSvg from "/Flag_of_British_Columbia.svg"
import {ReactNode} from "react";

interface Props {
    linkToAbout: boolean;
}
interface FooterLinkProps {
    children: ReactNode;
}

function Footer(props: Props) {
    const {linkToAbout} = props;

    const FooterLink = (props: FooterLinkProps) => {
        if (linkToAbout) {
            return <Link color="inherit" href="https://github.com/depsypher/mystery-message"
                         className="aboutLink" target="_blank">{props.children}
            </Link>;
        }
        return <Link component={RouterLink} color="inherit" to="/"
                     className="aboutLink"  target="_blank">{props.children}
        </Link>;
    }

    return (
        <FooterLink>
            <Typography variant="body2" color="text.secondary" align="center">
                Mystery Message Maker
            </Typography>
            <div style={{textAlign: "center"}}>
                <img src={flagSvg} width="60" style={{marginTop: ".4rem"}} />
            </div>
            <Typography variant="body2" color="text.secondary" align="center" style={{marginBottom: "0rem"}}>
                Made in beautiful British Columbia
            </Typography>
        </FooterLink>
    );
}

export default Footer
