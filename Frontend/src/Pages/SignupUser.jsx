import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    student_id: '',
    college_name: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();   

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        error = value.trim() ? '' : 'Name is required';
        break;
      case 'email':
        error = /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email format';
        break;
      case 'student_id':
        error = value.trim() ? '' : 'Student ID is required';
        break;
      case 'college_name':
        error = value.trim() ? '' : 'College name is required';
        break;
      case 'password':
        error = value.length >= 8 ? '' : 'Password must be at least 8 characters long';
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = Object.values(errors).filter((error) => error !== '');
    if (formErrors.length === 0) {
      console.log('Form submitted:', formData);
      try {
        const response = await axios.post('http://localhost:3087/usersignup', formData);
        console.log(response.data);
        alert('Registration successful');
        localStorage.setItem('token' , response.data.token);     
        navigate ('/homepage'); 
      } catch (error) {
        alert(error);
      }
    } else {
      console.log('Form has errors, please correct them');
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value !== '') && Object.values(errors).every((error) => error === '');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up as a User</h2>
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
              <Label htmlFor="student_id">Student ID</Label>
              <Input
                id="student_id"
                name="student_id"
                type="text"
                required
                placeholder="123456"
                value={formData.student_id}
                onChange={handleChange}
                className={errors.student_id ? 'border-red-500' : ''}
              />
              {errors.student_id && <p className="mt-1 text-xs text-red-500">{errors.student_id}</p>}
            </div>
            <div>
              <Label htmlFor="college_name">College Name</Label>
              <Input
                id="college_name"
                name="college_name"
                type="text"
                required
                placeholder="University of Example"
                value={formData.college_name}
                onChange={handleChange}
                className={errors.college_name ? 'border-red-500' : ''}
              />
              {errors.college_name && <p className="mt-1 text-xs text-red-500">{errors.college_name}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
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
  );
}
