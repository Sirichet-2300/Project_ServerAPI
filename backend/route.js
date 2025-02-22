// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')

// app.use(bodyParser.text())

// // สร้าง GET API path /user
// app.get('/user', (req, res) => {
//   res.json({
//     firstname: 'ชื่อจริง',
//     lastname: 'นามสกุล',
//     age: 20
//   });
// })



// app.post('/test', (req, res) => {
//   // ดึง data ออกจาก body
//   const textData = req.body
//   res.send(textData)
// })


// // Parse incoming JSON data
// app.use(bodyParser.json())

// // เราสร้างตัวแปร users ขึ้นมาเป็น Array จำลองการเก็บข้อมูลใน Server (ซึ่งของจริงจะเป็น database)
// let users = []

// // Route handler for creating a new user
// app.post('/user', (req, res) => {
//   const data = req.body

//   const newUser = {
//     firstname: data.firstname,
//     lastname: data.lastname,
//     age: data.age
//   }

//   //
//   users.push(newUser)

//   // Server ตอบกลับมาว่าเพิ่มแล้วเรียบร้อย
//   res.status(201).json({ message: 'User created successfully', user: newUser })
// })

// // ใช้สำหรับแก้ไข
// app.put('/user/:id', (req, res) => {
//     const id = req.params.id
//     const data = req.body
  
//     const userToUpdate = users.find((user) => user.id === parseInt(id))
  
//     if (!userToUpdate) {
//       return res.status(404).json({ message: 'User not found' })
//     }
  
//     userToUpdate.firstname = data.firstname || userToUpdate.firstname
//     userToUpdate.lastname = data.lastname || userToUpdate.lastname
//     userToUpdate.age = data.age || userToUpdate.age
  
//     res.json({ message: 'User updated successfully', user: userToUpdate })
//   })

//   app.delete('/user/:index', (req, res) => {
//   const index = req.params.index

//   // Check if the index is valid
//   if (index >= 0 && index < users.length) {
//     // Remove the user at the specified index
//     const deletedUser = users.splice(index, 1)[0]
//     res.json({ message: 'User deleted successfully', user: deletedUser })
//   } else {
//     res.status(404).json({ error: 'User not found' })
//   }
// })

// app.delete('/user/:index', (req, res) => {
//     const index = req.params.index
  
//     // Check if the index is valid
//     if (index >= 0 && index < users.length) {
//       // Remove the user at the specified index
//       const deletedUser = users.splice(index, 1)[0]
//       res.json({ message: 'User deleted successfully', user: deletedUser })
//     } else {
//       res.status(404).json({ error: 'User not found' })
//     }
//   })
// const port = 8000
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`)
// })
