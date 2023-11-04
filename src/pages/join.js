import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth,db } from "../utils/firebase";
// import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
    Form,
    Error,
    Input,
    Switcher,
    Title,
    Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";

import { createGlobalStyle, styled } from "styled-components";

import { useRouter } from 'next/router'
import Link from "next/link";
import { Button } from "@mui/material";


export default function CreateAccount() {
    const router = useRouter()
    //   const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (isLoading || name === "" || email === "" || password === "") return;
        try {
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await updateProfile(credentials.user, {
                displayName: name,
            });
            router.push('/')
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    };

    async function AddUserInfo(){

        const user = auth.currentUser;

        const doc = await addDoc(collection(db, "users"), {
            tweet,
            createdAt: Date.now(),
            username: user.displayName || "Anonymous",
            userId: user.uid,
          });
    }
    return (
        <BigWrapper>


            <Wrapper>
                <Title>Join MinterLab</Title>
                <Form onSubmit={onSubmit}>
                    <Input
                        onChange={onChange}
                        name="name"
                        value={name}
                        placeholder="Name"
                        type="text"
                        required
                    />
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
                    <Input
                        type="submit"
                        value={isLoading ? "Loading..." : "Create Account"}
                    />
                </Form>
                {error !== "" ? <Error>{error}</Error> : null}
                <Switcher>
                    Already have an account? <Link href="/login">Log in &rarr;</Link>
                </Switcher>
                <GithubButton />

                <Button variant="contained" color="primary" onClick={AddUserInfo} style={{ marginTop: "20px" }}></Button>
            </Wrapper>

        </BigWrapper>
    );
}


const BigWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;