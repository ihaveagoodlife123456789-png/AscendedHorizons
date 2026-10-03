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
            toast.success('Your message has been submitted!')
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
            <Toaster position="top-right" toastOptions={{style: {background: 'green', color: 'white'}}}  />
                <div className="w-[40%] h-[90%] bg-slate-100/80 flex flex-col items-center justify-center">
                <form onSubmit={handleSubmit(RegisterSubmit)}>
                    <fieldset disabled={isSubmitSuccessful}>
                    <h2>First Name</h2>
                    <input {...register('firstName')} disabled={isSubmitting} type="text" placeholder='First Name'></input>
                    {errors.firstName ? <h4 className="text-red-700">{errors.firstName.message}</h4> : null}
                    <h2>Last Name</h2>
                    <input {...register('lastName')} disabled={isSubmitting} type="text" placeholder='Last Name'></input>
                    {errors.lastName ? <h4 className="text-red-700">{errors.lastName.message}</h4> : null}
                    <h2>Email</h2>
                    <input {...register('email')} disabled={isSubmitting} type="text" placeholder='Email'></input>
                    {errors.email ? <h4 className="text-red-700">{errors.email.message}</h4> : null}
                    <h2>Password</h2>
                    <input {...register('password')} disabled={isSubmitting} type="text" placeholder='Password'></input>
                    {errors.password ? <h4 className="text-red-700">{errors.password.message}</h4> : null}
                    <button type="submit" disabled={isSubmitting || isSubmitSuccessful}>{isSubmitSuccessful ? 'Submitted!' : isSubmitting ? 'Submitting...' : 'Submit'}</button>
                    </fieldset>
                </form>
                {errors.root ? <h4 className="text-red-700">{errors.root.message}</h4> : null}
                {isSubmitSuccessful ? <h3 className="text-green-700 font-bold absolute bottom-7">You can go back home and login!</h3> : null}
                <div>
                    <h3>Must contain 1 lowercase letter</h3>
                    <h3>Must contain 1 uppercare letter</h3>
                    <h3>Must contain 1 number</h3>
                    <h3>Must contain 1 special caracter</h3>
                </div>
                <div>or</div>
                <button>Register with Google</button>
                <div className="w-full h-[2px] bg-slate-700/90"></div>
                <Link to="/">Back</Link>
                </div>
            </div>
        </div>
    )
}