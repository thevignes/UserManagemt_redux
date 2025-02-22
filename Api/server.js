import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import './config/dbconfig.js';
import dotenv from 'dotenv';
import router from './User/Router/User/UserRouter.js';
import Route from './Admin/AdminRoutes/Adminrouter.js';
dotenv.config();

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin === 'http://localhost:5173') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());


const Authentication = (req, res, next) => {
    const token = req.header('Authorization');
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(401).json({ message: "Invalid Token" });
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ message: "No Token Found" });
    }
};


app.use('/', router);
app.use('/admin',Route)

app.get('/protected', Authentication, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});


// app.post('/test', (req, res) => {
//     console.log('Request received:', req.body);
//     res.json({ message: 'Test route working!', data: req.body });
// });


const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
