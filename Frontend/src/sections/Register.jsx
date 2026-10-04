import { Navigation } from './components/Navigation'

import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { toast, Toaster } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const passwordSchema = z.string()
  .min(8, "Password must be 8+ characters")
  .regex(/[A-Z]/, "Must include uppercase letter")
  .regex(/[a-z]/, "Must include lowercase letter")
  .regex(/[0-9]/, "Must include number")
  .regex(/[@$!%*?&]/, "Must include special character (@$!%*?&)");

const registerSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    password: passwordSchema,
    email: z.string().email({ message: "Not a valid email." })
})

export function Register() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isValid, isSubmitSuccessful}
    } = useForm({
        resolver: zodResolver(registerSchema)
    })

    const RegisterSubmit = async (data) => {
        try {
            const URL = '/api/register'
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            if(!response.ok) {
                throw new Error(result.message || 'Something went wrong')
            }
            console.log(result)
            toast.success("You've successfully created your Account!")
        } catch (err) {
            setError("root", {
                message: err.message
            })
        }
    }

    return (
        <div className="size-full">
            <Navigation />
            <div className="w-full h-[90%] bg-[url('/geranimo-qzgN45hseN0-unsplash.jpg')] bg-cover bg-center flex justify-center items-center">
            <Toaster position="top-right" toastOptions={{style: {background: 'green', color: 'white'}}} />
                <div className="w-[40%] h-[90%] bg-slate-100/80 flex flex-col items-center justify-center gap-6">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-[14px] opacity-[.7]">Register a user profile to get a bunch of benefits</h2>
                    <h1 className="text-[32px] font-medium">Create a new account</h1>
                    <p className="text-[18px] font-thin">Complete the form to create an account</p>
                </div>
                <form onSubmit={handleSubmit(RegisterSubmit)}>
                    <fieldset disabled={isSubmitSuccessful} className="flex flex-col justify-center items-center gap-3">
                    <div className="flex">
                    <div className="flex flex-col items-center">
                    <h2 className="text-[18px] font-medium">First Name</h2>
                    <input {...register('firstName')} disabled={isSubmitting} type="text" placeholder='First Name'></input>
                    {errors.firstName ? <h4 className="text-red-700">{errors.firstName.message}</h4> : null}
                    </div>
                    <div className="flex flex-col items-center">
                    <h2 className="text-[18px] font-medium">Last Name</h2>
                    <input {...register('lastName')} disabled={isSubmitting} type="text" placeholder='Last Name'></input>
                    {errors.lastName ? <h4 className="text-red-700">{errors.lastName.message}</h4> : null}
                    </div>
                    </div>
                    <h2 className="text-[18px] font-medium">Email</h2>
                    <input {...register('email')} disabled={isSubmitting} type="text" placeholder='Email'></input>
                    {errors.email ? <h4 className="text-red-700">{errors.email.message}</h4> : null}
                    <h2 className="text-[18px] font-medium">Password</h2>
                    <input {...register('password')} disabled={isSubmitting} type="password" placeholder='Password'></input>
                    {errors.password ? <h4 className="text-red-700">{errors.password.message}</h4> : null}
                    <button className="border-green-700 border-2 font-bold bg-green-700 hover:bg-transparent rounded-[8px] px-1" type="submit" disabled={isSubmitting || isSubmitSuccessful}>{isSubmitSuccessful ? 'Signed In!' : isSubmitting ? 'Submitting...' : 'Sign in'}</button>
                    </fieldset>
                </form>
                {errors.root ? <h4 className="text-red-700">{errors.root.message}</h4> : null}
                {isSubmitSuccessful ? <h3 className="text-green-700 font-bold">You can go back home and login!</h3> : null}
                {
                    !isSubmitSuccessful ?
                    <>
                <div>
                    <h3 className="text-[15px] font-light">Must contain 1 lowercase letter</h3>
                    <h3 className="text-[15px] font-light">Must contain 1 uppercare letter</h3>
                    <h3 className="text-[15px] font-light">Must contain 1 number</h3>
                    <h3 className="text-[15px] font-light">Must contain 1 special caracter</h3>
                </div>
                <div>or</div>
                <div className="w-full h-[2px] bg-slate-700/90"></div>
                <button className="border-blue-400 bg-blue-400 border-[2px] hover:bg-transparent rounded-[8px] px-1 font-medium">Register with Google</button>
                </>
                :
                null
                }
                <Link to="/" className="border-mist-700 bg-mist-400 border-[2px] hover:bg-transparent rounded-[8px] px-1 font-bold">Back</Link>
                </div>
            </div>
        </div>
    )
}