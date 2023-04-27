import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert"
import axios from "axios";

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        axios.post('http://localhost:7002/api/user/forgot-password-token', { email }, {
            headers: { 'Content-Type': "application/json" }
        })
            .then(response => {

                if (response.status === 200) {
                    const json = response.data
                    setSuccess("Password reset link is sent to your email addreess")
                } else {
                    setError(response.message)
                }

            }).catch(error => {
                setError(error.response.data.message);
            })

    }

    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    flexDirection: { xs: "column", sm: "row" }
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    justify="space-around"
                    style={{ minHeight: '100vh' }}>
                    <div>
                        <Grid item xs={200}
                            style={{ padding: "2" }}
                        >
                            <Box
                                textAlign="center">
                                <h1>
                                    Reset Password
                                </h1>
                            </Box>
                        </Grid>
                        <Grid item xs={200}
                            style={{ padding: "10" }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Email"
                                multiline
                                maxRows={4}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                style={{ width: '35ch' }}
                            />
                        </Grid>
                    </div>
                    <Grid item xs={20}>
                        <Button variant="contained" type="submit"
                            sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '45ch', padding: 2, margin: 2, fontWeight: "bold" }}>Reset Password</Button>
                        {error && <Alert variant="filled" severity="error">{error}</Alert>}
                        {success && <Alert variant="filled" severity="success">{success}</Alert>}
                    </Grid>
                </Grid>
            </Box>
        </div>


    )


}

export default ForgetPassword