import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Footer() {
    return (
        <div style={{marginTop: "auto"}}>
            <Typography variant="body2" color="text.secondary" align="center">
                <Link color="inherit" href="/">Mystery Message Maker</Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
                <img src="/mystery-message/Flag_of_British_Columbia.svg" width="60" style={{marginTop: ".4rem"}} />
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" style={{marginBottom: "0rem"}}>
                Made in beautiful British Columbia
            </Typography>
        </div>
    );
}

export default Footer
