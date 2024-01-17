const express= require('express');
 const routes =express.Router();
 const bcrypt= require('bcrypt');
const SignUp=require('../mongo/models/signin/signup.js');
const BookAHall=require('../mongo/models/bookAhall/Booking.js');
routes.use(express.json());


 routes.get('/',(req, res) => {


    res.render('homePage/HomeView')
  
  })
  routes.get('/places',(req, res) => {

    res.render('homePage/plces')
  
  })

  routes.get('/aboutus',(req, res) => {

    res.render('homePage/aboutus')
  
  })
  

  


 //post Information from logIn Form page..........................................
 routes.get('/login', (req, res) => {
  res.render('homePage/login-in');
});


routes.post('/loginsite', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate that required fields are present
        if (!email || !password) {
            const message = "Please provide both email and password.";
            return res.status(400).render('homePage/sign-up', { messages: message, color: "red" });
        }

        // Find the user by email
        const user = await SignUp.findOne({ email });

        if (!user) {
            const message = "You are not a member of this site, sign up here";
            return res.render('homePage/sign-up', { messages: message, color: "red" });
        }

        // Compare the provided password with the hashed password using bcrypt
        bcrypt.compare(password, user.password, (err, passwordMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).render('homePage/sign-up', { messages: "Invalid input" });
            }

            if (passwordMatch) {
                // Passwords match, render the HomeView
                res.render('homePage/HomeView', { message: user });
            } else {
                // Passwords do not match
                const message = "Incorrect password. Please try again.";
                res.render('homePage/sign-up', { messages: message, color: "red" });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//......................................................................................


// // New Route
// routes.get('/Comment/:_id', async (req, res) => {
//   myId=req.params.id;
//   const myOutput = await Comments.findById(myId);// Cpmment is subject to correction or change
//   if(!myOutput){ res.render('homePage/sign-up',{messages:"you are not a member of this site, sign in here"})}
//   res.render('comment', { messages:myOutput }); 
//   res.render('hompePage/comment');
// });
  

//   // Create comment
//   routes.post('/PostAComment', async (req, res) => {
//     try {
//         const{name,email,online}=req.body;
//        const  newComment=new Comment({
//         name,
//         email,
//        isOnline: req.body.isOnline=="on",
  
//       })  
//       await newComment.save();
//        const message="thank you for your contribution"
//       res.redirect('/');
//     } catch (error) {
//       console.log(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });



//sign up......................................................................................................

  routes.get('/SignUp',(req,res)=>{
    res.render('HomePage/sign-up');

  })

  
  routes.post('/SignUpClient', async (req, res) => {
      try {
          const { name, email, password } = req.body;
  
          // Validate that required fields are present
          if (!name || !email || !password) {
              const message = "Please provide all required fields.";
              return res.status(400).render('HomePage/sign-up', { messages: message, color: "red" });
          }
  
          // Hash the password
          bcrypt.hash(password, 10, async (err, hashedPassword) => {
              if (err) {
                  console.error('Error generating hash:', err);
                  return res.status(500).render('HomePage/sign-up', { messages: "Internal Server Error" });
              }
  
              // Save the user with the hashed password
              try {
                  const newMember = new SignUp({ name, email, password: hashedPassword });
                  const savedMember = await newMember.save();
                  console.log(savedMember);
  
                  const message = "Registration successful!";
                  return res.render('HomePage/sign-up', { messages: message, color: "green" });
              } catch (error) {
                  console.error('Error saving user to the database:', error);
                  return res.status(500).render('HomePage/sign-up', { messages: "Internal Server Error" });
              }
          });
      } catch (error) {
          const message = "Oops! Something went wrong. Please try again.";
          console.error(error);
          return res.status(500).render('HomePage/sign-up', { messages: message });
      }
  });
  

  
//................................................................................................................

  // Show Comments
//   routes.get('/:id', async (req, res) => {
//     try {
//       const log = await Log.findById(req.params.id);
//       res.render('Show', { log });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });
  


  // Delete a comment
  routes.get('/delete/:id', async (req, res) => {
    try {
      await BookAHall.findByIdAndDelete(req.params.id);
      res.render('homepage/HomeView')
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
//update a comment on web form..........................................................
  routes.get('/edit/:id', async (req, res) => {
    try {
      const myId = req.params.id;
      const myOutput = await BookAHall.findById(myId);
      if(!myOutput){ res.render('homePage/sign-up',{messages:"Sign up needed"})}
      res.render('homepage/update', {myOutput }); 
  
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  //update comment to database
  routes.post('/update/:id', async (req, res) => {
    try {
      const {  name,email,location,date,time } = req.body;
      
      // Convert "on" to true and an empty string to false
  
       await BookAHall.findByIdAndUpdate(req.params.id, { name,email,location,date,time})
       res.render('homepage/HomeView')
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  });

//.............................................................................

// New Route
routes.get('/Book', async (req, res) => { 
  res.render('homePage/booking');
});
  

  // Create comment

  routes.post('/BookAHall', async (req, res) => {
    try {
        const{name,email,location,date,time}=req.body;
       const  newBooking=new BookAHall({
        name,
        email,
        location,
        date,
        time
  
      })  
      const val=await newBooking.save();
      console.log(val);
       const message="Booked,thanks for your patronage!:)";
       res.render('homePage/booking',{messages:message, color:"green"});
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  });


  routes.get('/BookedHalls',async(req, res) => {
    const allComments=  await BookAHall.find();
     res.render('homePage/bookedhalls',{myComments:allComments})
   
   })
   

  module.exports=routes