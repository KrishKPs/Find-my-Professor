import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'

const ProfessorDashboard = ({ professorData }) => {
    
  const [professor, setProfessor] = useState(professorData)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfessor({ ...professor, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add save logic here
    console.log('Professor data saved:', professor)
  }

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-8">
        <Avatar src={professor.profile_photo} alt={professor.name} className="w-24 h-24 mr-6" />
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">{professor.name}</h1>
          <p className="text-gray-500">{professor.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</Label>
            <Input
              id="category"
              name="category"
              type="text"
              value={professor.category}
              onChange={handleInputChange}
              className="mt-1 block w-full"
            />
          </div>

          <div>
            <Label htmlFor="college_name" className="block text-sm font-medium text-gray-700">College Name</Label>
            <Input
              id="college_name"
              name="college_name"
              type="text"
              value={professor.college_name}
              onChange={handleInputChange}
              className="mt-1 block w-full"
            />
          </div>

          <div>
            <Label htmlFor="major" className="block text-sm font-medium text-gray-700">Major</Label>
            <Input
              id="major"
              name="major"
              type="text"
              value={professor.major}
              onChange={handleInputChange}
              className="mt-1 block w-full"
            />
          </div>

          <div>
            <Label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</Label>
            <Input
              id="location"
              name="location"
              type="text"
              value={professor.location}
              onChange={handleInputChange}
              className="mt-1 block w-full"
            />
          </div>

          <div>
            <Label htmlFor="office_hours" className="block text-sm font-medium text-gray-700">Office Hours</Label>
            <Textarea
              id="office_hours"
              name="office_hours"
              value={professor.office_hours}
              onChange={handleInputChange}
              className="mt-1 block w-full"
            />
          </div>

          <div>
            <Label htmlFor="available" className="block text-sm font-medium text-gray-700">Availability</Label>
            <div className="flex items-center">
              <input
                id="available"
                name="available"
                type="checkbox"
                checked={professor.available === 'Available'}
                onChange={(e) => setProfessor({ ...professor, available: e.target.checked ? 'Available' : 'Unavailable' })}
                className="mr-2"
              />
              <span className="text-gray-600">{professor.available}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-right">
          <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProfessorDashboard;
