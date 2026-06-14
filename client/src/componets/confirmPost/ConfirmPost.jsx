import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams,useNavigate } from 'react-router-dom';
import UrlContext from "../../context/UrlContext.js";

import {
    Box,
    Button,
    Snackbar,
    Alert,
    CircularProgress,
    Typography,
    Paper,
} from "@mui/material/";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ConfirmPost() {
    const { postid, the_applicant_id } = useParams();
    const { urlServer } = useContext(UrlContext);
    const [applicant, setApplicant] = useState();
    const [openSnack, setOpenSnack] = useState(false);
    const [errorActive, setErrorActive] = useState(false);
    const [successActive, setSuccessActive] = useState(false);
    const [progressTrans, setProgressTrans] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            try {
                if (the_applicant_id !== undefined && the_applicant_id) {
                    const temp = await axios.post(`${urlServer}/user/get-one`, { id: the_applicant_id }, { withCredentials: true });
                    console.log(temp);
                    setApplicant(temp.data);
                }
            }
            catch (err) {
                console.log(err);
            }

        })()
    }, [])

    const confirm = async () => {
        try {
            const answer = await axios.post(urlServer + '/activity/confirm-post', { applicantId: the_applicant_id, postId: postid }, { withCredentials: true });
            console.log(answer.data);
            setSuccessActive(true);
            setOpenSnack(true);
            setEmailSent(true);
        }
        catch (err) {
            setErrorActive(true);
            setOpenSnack(true);
            console.log(err);
        }

    }

    const deny = async () => {
        try {
            setProgressTrans(true);
            const answer = await axios.post(urlServer + '/activity/deny-post', { applicantId: the_applicant_id, postId: postid }, { withCredentials: true });
            console.log(answer);
            setProgressTrans(false);
            setSuccessActive(true);
            setOpenSnack(true);
            setEmailSent(true);
        }
        catch (err) {
            console.log(err);
            setErrorActive(true);
            setOpenSnack(true);
        }
    }

    const handleCloseSnack = () => {
        setOpenSnack(false);
    }


    return (
        <Box sx={{ m: 4, display: 'flex', justifyContent: 'center' }}>
            <Paper sx={{ Width: '90%', position: 'relative' }}>
                {!emailSent ? <Box>
                    {
                        progressTrans && <Box sx={{ display: 'flex', width: '100%', height: '100%', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress size={70} />
                        </Box>
                    }
                    <Box sx={{ opacity: progressTrans ? '0.2' : '1' }}>

                        {applicant && <Box m={2}>
                            <Typography variant='h4'>{applicant.name} sent request to your post.</Typography>

                            <Typography sx={{ textAlign: 'start' }} variant='h5'>please confirm their request to let them know you are in.
                                if you regret your you can deny, by press on deny your post will return to be active.
                                notice that by confirm post your email and phone number will  sent to your paetner.
                                {/* you can change it by click <Link onClick={() => { alert('sd') }}>here</Link> */}
                            </Typography>
                        </Box>}

                        <Box sx={{ m: 2 }}>
                            <Button sx={{ borderRadius: '30px', m: 1 }} size="large" color="success" variant="contained" onClick={confirm}>  Confirm</Button>
                            <Button sx={{ borderRadius: '30px', m: 1 }} size="large" color="error" variant="contained" onClick={deny}>Deny</Button>
                        </Box>
                    </Box>
                </Box>
                    :
                    <Box m={2}>
                        <Box>
                            <Typography m={1} sx={{ textAlign: 'start' }} variant='h5'> email sand successfully..</Typography>
                        </Box>
                        <Box><Button m={1} onClick={()=>{navigate('/')} } endIcon={<ArrowForwardIcon />}>Back to Home Page</Button></Box>
                    </Box>
                }

            </Paper >
            <Snackbar
                open={openSnack}
                autoHideDuration={4000}
                onClose={handleCloseSnack}
            >
                {successActive ? <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>Email sent</Alert> : <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>Action failed</Alert>}

            </Snackbar>
        </Box >
    )
}
