import { useState } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert"
import axios from "axios";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    let { token } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(token)

        axios.put(`http://localhost:7002/api/user/reset-password/${token}`, { password }, {
            headers: { 'Content-Type': "application/json" }
        })
            .then(response => {
                if (response.status === 200) {
                    const json = response.data
                    setSuccess("Your password has been reset successfully")
                } else {
                    setError(response.message)
                }
            }).catch(error => {
                setError(error.response.data.message);
            })

    }


    return (
        <div className="container">
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
                        <Grid item xs={20}>
                            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"

                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </Grid>
                    </div>
                    <Grid item xs={20}>
                        <Button variant="contained" type="submit"
                            sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '45ch', padding: 2, margin: 2, fontWeight: "bold" }}>Reset Password</Button>
                        {error && <Alert variant="filled" severity="error" style={{ fontWeight: "bold" }} >{error}</Alert>}
                        {success && <Alert variant="filled" severity="success">{success}</Alert>}
                    </Grid>

                </Grid>
            </Box>
        </div>



    )



}

export default ResetPassword