import { Navigation } from './components/Navigation'

import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { toast, Toaster } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const loginSchema = z.object({
    email: z.string().email({ message: "Email is not valid"}),
    password: z.string().min(1, "Password is required")
})

export function Login() {
    const navigate = useNavigate()
    const {
            register,
            handleSubmit,
            setError,
            formState: { errors, isSubmitting, isValid, isSubmitSuccessful}
        } = useForm({
            resolver: zodResolver(loginSchema)
        })
    
        const LoginSubmit = async (data) => {
            try {
                const URL = '/api/login'
                const response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                    credentials: 'include'
                })
                const result = await response.json()
                if(!response.ok) {
                    throw new Error(result.message || 'Something went wrong')
                }
                navigate('/')
            } catch (err) {
                setError("root", {
                    message: err.message
                })
            }
        }
    return (
        <div className="size-full">
            <Navigation />
            <div className='w-full h-[90%] bg-gray-200 flex flex-col justify-between items-center'>
                <div className='w-full h-[12%] bg-white text-[40px] flex items-center font-extrabold'><h1 className="relative left-[2%]">Ascended Horizons Account Portal</h1></div>
                <div className="w-[38%] h-[70%] bg-white flex flex-col justify-center items-center gap-8">
                    <h1 className="text-[32px] font-bold">Login Into your Account</h1>
                    <form onSubmit={handleSubmit(LoginSubmit)}>
                        <fieldset disabled={isSubmitSuccessful} className="flex flex-col justify-center items-center gap-3">
                            <h2 className="text-[18px] font-medium">Email</h2>
                            <input {...register('email')} disabled={isSubmitting} type="text" placeholder='Email'></input>
                            {errors.email ? <h4 className="text-red-700">{errors.email.message}</h4> : null}
                            <h2 className="text-[18px] font-medium">Password</h2>
                            <input {...register('password')} disabled={isSubmitting} type="password" placeholder='Password'></input>
                            {errors.password ? <h4 className="text-red-700">{errors.password.message}</h4> : null}
                            <button type="submit" disabled={isSubmitting || isSubmitSuccessful} className="border-green-600 border-2 hover:bg-green-600 px-1">{isSubmitting ? 'Submitting...' : 'Login' }</button>
                        </fieldset>
                    </form>
                    <h2 className='hover:text-red-600 font-medium'>Forgot password?</h2>
                    {errors.root ? <h4 className="text-red-700">{errors.root.message}</h4> : null}
                    <div className="text-[18px] font-light">or</div>
                    <div className="bg-slate-700/90 w-full h-[2px]"></div>
                    <button className="border-blue-700 border-2 hover:bg-blue-700 font-medium px-1">Sign In with Google</button>
                    <h3>Don't have an account yet? <span className="text-red-600 hover:font-medium"><Link to="/register">Sign In</Link></span></h3>
                </div>
                <div className='w-full h-[11%] bg-black flex flex-col justify-center items-center text-white'>
                    <h3>1-514-676-6767</h3>
                    <h2 className="font-medium">© AscendedHorizons 2026, All rights reserved.</h2>
                </div>
            </div>
        </div>
    )
}