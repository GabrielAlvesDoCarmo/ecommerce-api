import express, {Request, Response} from "express";

const app = express();
app.use(express.json());

let userRegistered: number = 0;
let id: number = 1;

type User = {
    id: number;
    name: string;
    email: string;
};
let users: User[] = []
/**
 * Iniciando o servidor
 * */
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

app.put("/users/:id", (req: Request, res: Response) => {
    let userId: number = Number(req.params.id);
    let user = req.body;
    let indexOfUser: number = users.findIndex((_user: User) => _user.id === userId);
    users[indexOfUser].name = user.name;
    users[indexOfUser].email = user.email;
    res.send({
        message: `Antigo usuario -> ${users[indexOfUser].name} alterado para -> 
        ${user.name} email atualizado de ${users[indexOfUser].email} para -> ${user.email}`
    });
});

app.delete("/users/:id", (req: Request, res: Response) => {
    let userId: number = Number(req.params.id);
    let indexOfUser: number = users.findIndex((_user: User) => _user.id === userId);
    users.splice(indexOfUser, 1);
    res.send({
        message: `Usuario removido com sucesso`
    });
})

app.post("/users", (req: Request, res: Response) => {
    let user = req.body;
    user.id = id++;
    userRegistered++;
    users.push(user);
    res.send({
        message: `Usuario criado com sucesso ${userRegistered}`
    });
});

app.get("/", (req: Request, res: Response) => {
    res.send("Mundao e loko ")
});