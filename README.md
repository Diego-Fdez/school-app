# School Office frontend version: 1.0.0

### Description:

Project so that the parents of the students can consult the school notes of their children.

### Functionality:

<strong>Page Log In/Sign Up (/auth):</strong>
Teachers and administrators can register or authenticate. The role of administrator or teacher will be assigned by the person in charge of the database.

<strong>Page Home (/):</strong>
Consult the student's information by identification number. The button to see scores redirects
to the page /results-students. Where you can see the student's grades.
If you are an administrator, you can edit student information from the modal (by touching the button: Edit Student), or assign/remove teachers to this student from the Add Teacher button.

<strong>Page Results per Period (/results-student/:id):</strong>
You will be able to see all the notes of the specific student.
If you are an administrator, you can edit the student's notes using the Edit button, which opens a modal to perform the action.

## Private routes:

<strong>Page Dashboard (/panel):</strong>
If you are a teacher or administrator and are authenticated, you can enter the dashboard and see the options menu:

- Register results.
- All students.
- Register/Edit Students (only for admins).
- Register/Edit subjects (Teachers can only consult the list).
- Assign/Delete subject to teachers. (only for admins).
- Register/Edit levels (Teachers can only consult the list).
- Register/Edit section (teacher can only consult the list).
- All teachers.

<strong>Register results:</strong> Allows you to record a student's grades. First search for the student by ID number and enter the information.
<strong>All student:</strong> List of all student.
<strong>Register/Edit Students:</strong> Allows you to register and edit students.
<strong>Register/Edit subjects:</strong> Allows you to register and edit subjects.
<strong>Assign/Delete subject to teachers.</strong> Allows you to assign or remove subjects to a teacher.
First search for the teacher by email address and enter the information.
<strong>Register/Edit levels:</strong> Allows you to register and edit levels.
<strong>Register/Edit section:</strong> Allows you to register and edit sections. First select the section, if it does not exist you can register it.
<strong>All teachers:</strong> List of all teachers.

# this is the frontend of the project (see [backend](https://github.com/Diego-Fdez/school-project-backend")) it was started with npm create vite@latest

### This Project Only For developing my Skill

Note: Try to make your Own Project , This Only For Reference to it

##### Method to Run Project in your PC:

- git clone https://github.com/Diego-Fdez/school-app.git

- cd App-name

- npm install

- npm run dev

- Check http://localhost:5173

##### Used dependencies For This Project

react-router-dom
iconscout
redux toolkit
react-hook-form
react-redux
sweetalert-2
js-cookie
axios
