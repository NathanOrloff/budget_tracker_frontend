import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import { userPool } from "./cognitoConfig";

export function signUp(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const attributeList = [
            new CognitoUserAttribute({ Name: "email", Value: email }),
        ];
        userPool.signUp(email, password, attributeList, [], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

export function confirmSignUp(email: string, code: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({ Username: email, Pool: userPool });
        user.confirmRegistration(code, true, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

export function signIn(email: string, password: string): Promise<{ idToken: string; accessToken: string }> {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({ Username: email, Pool: userPool });
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });

        user.authenticateUser(authDetails, {
            onSuccess: (session) => {
                resolve({
                    idToken: session.getIdToken().getJwtToken(),
                    accessToken: session.getAccessToken().getJwtToken(),
                });
            },
            onFailure: (err) => reject(err),
        });
    });
}

export function getCurrentUser(): CognitoUser | null {
  return userPool.getCurrentUser();
}

export function getCurrentSession(): Promise<string | null> {
    return new Promise((resolve, reject) => {
        const user = getCurrentUser();
        if(!user) return resolve(null);
        user.getSession((err: Error | null, session: any) => {
            if (err) return reject(err);
            resolve(session.getIdToken().getJwtToken());
        });
    });
}

export function signOut(): void {
    const user = getCurrentUser();
    if (user) user.signOut();
}
