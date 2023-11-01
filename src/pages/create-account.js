import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import styled from "@emotion/styled";
import {auth} from '../utils/firebase'

// const { styled } = require("@mui/material");


const Wrapper = styled('div')({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '420px',
    padding: '50px 0px',
});

const Title = styled('h1')({
    fontSize: '42px',
});

const Form = styled('form')({
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
});

const Input = styled('input')({
    padding: '10px 20px',
    borderRadius: '50px',
    border: 'none',
    width: '100%',
    fontSize: '16px',
    '&[type="submit"]': {
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.8,
        },
    },
});

const Error = styled('span')({
    fontWeight: 600,
    color: 'tomato',
});


export default function CreateAccount() {
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
        console.log("submit")
        e.preventDefault();
        if (isLoading || name === "" || email === "" || password === "") return;
        try {
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName: name,
            });
            navigate("/");
        } catch (e) {
            // setError
        } finally {
            setLoading(false);
        }
    };
    return (
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
        </Wrapper>
    );
}