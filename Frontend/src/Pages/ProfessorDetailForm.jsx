import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { BiCalendar } from 'react-icons/bi';  // Icon for calendar
import axios from 'axios';  // Import axios

const ProfessorDetailForm = () => {
  const [formData, setFormData] = useState({
    profile_photo: '',
    major: '',
    location: '',
    office_hours: [],  // office_hours updated with startTime, endTime
  });

  const [isLoading, setIsLoading] = useState(false);

  // Add a new office hour entry
  const handleAddOfficeHour = () => {
    setFormData((prev) => ({
      ...prev,
      office_hours: [...prev.office_hours, { day: '', startTime: '', endTime: '' }], // Updated keys
    }));
  };

  // Handle changes in office hour input fields (day, start time, end time)
  const handleOfficeHourChange = (index, field, value) => {
    const updatedOfficeHours = [...formData.office_hours];
    updatedOfficeHours[index][field] = value;
    setFormData((prev) => ({ ...prev, office_hours: updatedOfficeHours }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Add validation for office hours
    const isValid = formData.office_hours.every(officeHour => 
      officeHour.day && officeHour.startTime && officeHour.endTime // Updated to match backend keys
    );

    if (!isValid) {
      toast.error('Please fill all office hour fields.');
      setIsLoading(false);
      return; // Prevent form submission if validation fails
    }

    try {
      const token = localStorage.getItem('token'); // Or wherever your token is stored

      const response = await axios.post(
        'http://localhost:3087/enterdetails',
        formData,
        {
          headers: {
            Authorization: `${token}`, // Attach the token in the Authorization header
          },
        }
      );

      if (response.status === 200) {
        toast.success('Professor details created successfully!');
      } else {
        toast.error('Error creating professor details.');
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      toast.error('Error submitting form.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Enter Professor Details</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="profile_photo" className="block text-gray-700">Profile Photo URL</Label>
            <Input
              id="profile_photo"
              name="profile_photo"
              type="text"
              value={formData.profile_photo}
              onChange={handleInputChange}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="major" className="block text-gray-700">Major</Label>
            <Input
              id="major"
              name="major"
              type="text"
              value={formData.major}
              onChange={handleInputChange}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="block text-gray-700">Location</Label>
            <Input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full"
              required
            />
          </div>

          {/* Enhanced Office Hours Section */}
          <div className="space-y-4">
            <Label className="block text-gray-700">Office Hours</Label>

            {formData.office_hours.map((officeHour, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-4 w-full">
                  <select
                    className="p-3 rounded-md w-1/3 bg-white border border-gray-300 shadow-sm"
                    value={officeHour.day}
                    onChange={(e) =>
                      handleOfficeHourChange(index, 'day', e.target.value)
                    }
                    required
                  >
                    <option value="">Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>

                  <div className="flex space-x-4 w-full">
                    <Input
                      className="p-3 rounded-md w-1/3"
                      type="time"
                      value={officeHour.startTime} // Updated key
                      onChange={(e) =>
                        handleOfficeHourChange(index, 'startTime', e.target.value) // Updated key
                      }
                      required
                    />
                    <span className="text-gray-600">to</span>
                    <Input
                      className="p-3 rounded-md w-1/3"
                      type="time"
                      value={officeHour.endTime} // Updated key
                      onChange={(e) =>
                        handleOfficeHourChange(index, 'endTime', e.target.value) // Updated key
                      }
                      required
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => {
                    const updatedOfficeHours = formData.office_hours.filter((_, i) => i !== index);
                    setFormData((prev) => ({ ...prev, office_hours: updatedOfficeHours }));
                  }}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  &times; {/* Close icon */}
                </Button>
              </div>
            ))}

            {/* Add More Button */}
            <Button
              type="button"
              onClick={handleAddOfficeHour}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-4"
            >
              <BiCalendar className="inline-block mr-2" />
              Add More Office Hours
            </Button>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfessorDetailForm;
