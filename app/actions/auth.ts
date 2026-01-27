'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { loginSchema, signupSchema, resetPasswordSchema, updatePasswordSchema } from '@/lib/validations/auth'

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Validate input
  const result = loginSchema.safeParse(rawData)
  if (!result.success) {
    const error = result.error.errors[0]?.message || 'Invalid input'
    redirect('/login?error=' + encodeURIComponent(error))
  }

  const { error } = await supabase.auth.signInWithPassword(result.data)

  if (error) {
    redirect('/login?error=' + encodeURIComponent(error.message))
  }

  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Validate input
  const result = signupSchema.safeParse(rawData)
  if (!result.success) {
    const error = result.error.errors[0]?.message || 'Invalid input'
    redirect('/signup?error=' + encodeURIComponent(error))
  }

  const { error } = await supabase.auth.signUp(result.data)

  if (error) {
    redirect('/signup?error=' + encodeURIComponent(error.message))
  }

  redirect('/signup?message=Check your email to confirm your account')
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    email: formData.get('email') as string,
  }

  // Validate input
  const result = resetPasswordSchema.safeParse(rawData)
  if (!result.success) {
    const error = result.error.errors[0]?.message || 'Invalid input'
    redirect('/reset-password?error=' + encodeURIComponent(error))
  }

  const { error } = await supabase.auth.resetPasswordForEmail(
    result.data.email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/callback?next=/update-password`,
    }
  )

  if (error) {
    redirect('/reset-password?error=' + encodeURIComponent(error.message))
  }

  redirect('/reset-password?message=Check your email for the reset link')
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  // Validate input
  const result = updatePasswordSchema.safeParse(rawData)
  if (!result.success) {
    const error = result.error.errors[0]?.message || 'Invalid input'
    redirect('/update-password?error=' + encodeURIComponent(error))
  }

  const { error } = await supabase.auth.updateUser({
    password: result.data.password,
  })

  if (error) {
    redirect('/update-password?error=' + encodeURIComponent(error.message))
  }

  redirect('/dashboard')
}
