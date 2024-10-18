import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    TextField,
    Button,
    Typography,
    Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);
        navigate("/dashboard");
    };

    return (
        <Container maxWidth="sm">
            <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
                <Grid xs={12}>
                    <Typography variant="h4">Login</Typography>
                </Grid>
                <Grid xs={12}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Grid>
                <Grid xs={12}>
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Grid>
                <Grid xs={12}>
                    <Button
                        component={Link}
                        to="/"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                    >
                        Back to Home
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LoginPage;