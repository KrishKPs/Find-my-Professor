const { ProfessorDetail, Professor } = require("../db");
const { professorDetailSchema } = require("../type");

async function professorDetails(req, res) {
    const professor = req.user;

    const detailfind = await ProfessorDetail.findOne( {email : professor});     

    if (detailfind) {
        return res.status(411).json({
            message: 'Professor details already exists'
        });
    }    

    const professorfind = await Professor.findOne({ email: professor });

    if (!professorfind) {
        return res.status(411).json({
            message: 'Professor not found'
        });
    }

    const person = req.body;

    // Ensure person has the required fields
    const safedetail = professorDetailSchema.safeParse(person);

    if (!safedetail.success) {
        return res.status(400).json({
            message: safedetail.error.format()
        });
    }

    try {
        await ProfessorDetail.create({
            name: professorfind.name,
            email: professorfind.email,
            category: professorfind.category,
            college_name : professorfind.college_name,   
            profile_photo: person.profile_photo,
            major: person.major,
            location: person.location,
            office_hours: person.office_hours,
            available: "Available",
            verification: "Not-Verified",
        });

        res.json({
            message: 'Professor details created successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating professor details',
            error: error.message,
        });
    }
}

module.exports = professorDetails;
