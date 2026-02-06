import express,{Request,Response} from 'express';
import path from 'path';
import mustache from 'mustache-express';
import dotenv from "dotenv";
import mainRoutes from "./routes/index";
import methodOverride from 'method-override';
import session from 'express-session';

dotenv.config();

const server = express();

server.use(session({
    secret: process.env.SESSION_SECRET || 'sua-chave-secreta-aqui',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Mude para true se usar HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 24 horas
    }
}));

server.use((req: Request, res: Response, next) => {
    res.locals.isLoggedIn = !!req.session.userId;
    res.locals.userName = req.session.userName || '';
    next();
});

server.use(methodOverride("_method"));

server.set("view engine", "mustache");
server.set("views",path.join(__dirname,"views"));
server.engine("mustache", mustache());

server.use(express.static(path.join(__dirname, "../public")));

server.use(express.urlencoded({extended: true}));

server.use(mainRoutes);


server.use((req: Request, res: Response)=>{
     res.status(404).send("Page Not Found");
})


server.listen(process.env.PORT);