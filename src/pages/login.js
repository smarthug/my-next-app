import { useState } from "react";
import { auth } from "../utils/firebase";
// import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
    Error,
    Form,
    Input,
    Switcher,
    Title,
    Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";
// import GoogleButton from "../components/google-btn";

import { useRouter } from 'next/router'
import Link from "next/link";
import styled from "styled-components";
import { Button } from "@mui/material";

export default function CreateAccount() {

    const router = useRouter()
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (isLoading || email === "" || password === "") return;
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <BigWrapper>
            <Wrapper>
                <Title>Log into MinterLab</Title>
                <Form onSubmit={onSubmit}>
                    <Input
                        onChange={onChange}
                        name="email"
                        value={email}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        onChange={onChange}
                        value={password}
                        name="password"
                        placeholder="Password"
                        type="password"
                        required
                    />
                    <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
                </Form>
                {error !== "" ? <Error>{error}</Error> : null}
                <Switcher>
                    <span>Do not have an account?</span>
                    <Link href="/join">Create one &rarr;</Link>
                </Switcher>
                <GithubButton />
                
                {/* <GoogleButton /> */}
            </Wrapper>
        </BigWrapper>
    );
}


const BigWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;