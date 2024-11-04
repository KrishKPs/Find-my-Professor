import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfessorSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    collegeName: '',
    category: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const handleCategoryChange = (value) => {
    setFormData(prev => ({ ...prev, category: value }))
    validateField('category', value)
  }

  const validateField = (name, value) => {
    let error = ''
    switch (name) {
      case 'name':
        error = value.trim() ? '' : 'Name is required'
        break
      case 'email':
        error = /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email format'
        break
      case 'collegeName':
        error = value.trim() ? '' : 'College name is required'
        break
      case 'category':
        error = value ? '' : 'Please select a category'
        break
      case 'password':
        error = value.length >= 8 ? '' : 'Password must be at least 8 characters long'
        break
      default:
        break
    }
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formErrors = Object.values(errors).filter(error => error !== '')
    if (formErrors.length === 0) {
      console.log('Form submitted:', formData)
      // Here you would typically send the data to your backend
    } else {
      console.log('Form has errors, please correct them')
    }
  }

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '') && Object.values(errors).every(error => error === '')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up as a Professor</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="collegeName">College Name</Label>
              <Input
                id="collegeName"
                name="collegeName"
                type="text"
                required
                placeholder="University of Example"
                value={formData.collegeName}
                onChange={handleChange}
                className={errors.collegeName ? 'border-red-500' : ''}
              />
              {errors.collegeName && <p className="mt-1 text-xs text-red-500">{errors.collegeName}</p>}
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger className={`w-full ${errors.category ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professor">Professor</SelectItem>
                  <SelectItem value="advisor">Academic Advisor</SelectItem>
                  <SelectItem value="consultant">Consultant</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'border-red-500' : ''}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={!isFormValid()}>
              Sign Up
            </Button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}
