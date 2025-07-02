import express, {Request, Response} from "express";

const app = express();
app.use(express.json());

let userRegired: number = 0;
let id: number = 1;

type User = {id: number, name: string, email: string};
let users: User[] = []

app.listen(3000, () => {
    console.log("Servidor online na porta 3000");
});

app.get("/users", (req: Request, res: Response) => {
    res.send(users)
});

app.get("/users/:id", (req: Request, res: Response) => {
   let userId: number = Number(req.params.id);
   let user = users.find(user => user.id === userId);
   res.send(user)
});

app.post("/users", (req: Request, res: Response) => {
    let user = req.body;
    user.id = id++;
    userRegired++;
    users.push(user);
    res.send({
        message: `Usuario criado com sucesso ${userRegired}`
    });
});

app.get("/", (req: Request, res: Response) => {
    res.send("Mundao e loko ")
});