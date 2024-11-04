import React, { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import axios from 'axios'  

export default function LoginUI() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
   
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)




 

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const validateField = (name, value) => {
    let error = ''
    switch (name) {
      case 'email':
        error = /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email format'
        break
      case 'password':
        error = value.length >= 6 ? '' : 'Password must be at least 6 characters long'
        break
     
      default:
        break
    }
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

  
   
   


      try {

        const response = await axios.post('http://localhost:3087/professorlogin', formData) 
        console.log(response.data) 

        alert ('Login successful')  
        console.log('Form submitted:', formData) 
        
      } catch (error) {

        if (error.response) {
          console.log(error.response.data)
          alert(error.response.data.message)   
        } 
        
      }

      
    


    
  }

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '') && Object.values(errors).every(error => error === '')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Log in to your account</CardTitle>
          <CardDescription className="text-center">Enter your email and password to log in</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Log in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button variant="link" className="px-0 text-sm text-primary">
            Forgot your password?
          </Button>
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Button variant="link" className="p-0 text-primary">
              Sign up
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}