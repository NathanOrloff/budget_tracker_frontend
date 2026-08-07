import { useState } from "react";
import { confirmSignUp, signIn, signUp } from "./authService";


type Mode = "signIn" | "signUp" | "confirm";

export function LoginForm({ onAuthenticated }: { onAuthenticated: (idToken: string) => void }) {
    const [mode, setMode] = useState<Mode>("signIn");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
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

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            {mode !== "confirm" && (
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            )}
            {mode === "confirm" && (
                <input
                    type="text"
                    placeholder="Confirmation code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
            )}
            <button type="submit">
                {mode === "signIn" ? "Sign in" : mode === "signUp" ? "Sign up" : "Confirm"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {mode === "signIn" && (
                <button type="button" onClick={() => setMode("signUp")}>Need an account?</button>
            )}
        </form>
    );
}