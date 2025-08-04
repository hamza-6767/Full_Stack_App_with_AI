"use client"

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const  handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) =>
       {
        e.preventDefault();

        const result  = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
        });

        if (result?.error) {
           console.log(result.error)
        }else {
            router.push("/")
        }
       
    }
  return ( <div>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
        <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
        />
        <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
        />
        <button type="submit">Login</button>
    </form>
    <div>
      <p>Don't have an account</p>
      <button onClick={() => router.push('/register')}>Register</button>
    </div>
    </div>
  )
}

export default LoginPage