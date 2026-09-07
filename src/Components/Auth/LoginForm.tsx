import React, { useState } from "react";
import { confirmSignUp, signIn, signUp } from "./authService";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";


type Mode = "signIn" | "signUp" | "confirm";

export function LoginForm({ onAuthenticated }: { onAuthenticated: (idToken: string) => void }) {
    const [mode, setMode] = useState<Mode>("signIn");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [code, setCode] = useState("");
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit() {
        setError(null);
        try {
            if (mode === "signIn") {
                const { idToken } = await signIn(email, password);
                onAuthenticated(idToken);
            } else if (mode === "signUp") {
                await signUp(email, password);
                setMode("confirm");
            } else if (mode === "confirm") {
                await confirmSignUp(email, code);
                setMode("signIn");
            }
        } catch (err: any) {
            setError(err.message ?? String(err));
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            <Card variant="outlined" sx={{
                minWidth: 800,
                margin: 'auto',
                mt: 4
            }}>
                <CardContent>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            Login / Sign Up
                        </Typography>
                        <TextField
                            required
                            fullWidth
                            id="outlined-required"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}     
                        />
                        { mode !== "confirm" && (
                            <TextField
                                required
                                fullWidth
                                id="outlined-required"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                slotProps={{
                                    input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                        </InputAdornment>
                                    ),
                                    },
                                }}
                            />
                        ) }
                        { mode === "confirm" && (
                            <TextField
                                required
                                fullWidth
                                id="outlined-required"
                                label="Confirmation code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}  
                            />
                        ) }
                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center'
                        }}>
                            <Button variant="contained" onClick={() => handleSubmit()}>
                                {mode === "signIn" ? "Sign in" : mode === "signUp" ? "Sign up" : "Confirm"}
                            </Button>
                            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
                            {
                                mode === 'signIn' && (
                                    <Button variant="contained" onClick={() => setMode("signUp")}>Need an account?</Button>
                                )
                            }
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            { error && (
                <Alert severity="error">
                    {error}
                </Alert>
            ) }
        </React.Fragment>
    );
}
