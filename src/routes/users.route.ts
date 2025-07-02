import express, {Router, Request, Response} from "express";

export const userRouter: Router = express.Router();

let userRegistered: number = 0;
let id: number = 1;

type User = {
    id: number;
    name: string;
    email: string;
};
let users: User[] = []


// Get all Users
userRouter.get("/users", (req: Request, res: Response): void => {
    res.send(users)
});

//Get user for id
userRouter.get("/users/:id", (req: Request, res: Response): void => {
    let userId: number = Number(req.params.id);
    let user = users.find(user => user.id === userId);
    res.send(user)
});

//Put change data user
userRouter.put("/users/:id", (req: Request, res: Response): void => {
    let userId: number = Number(req.params.id);
    let user = req.body;
    let indexOfUser: number = users.findIndex((_user: User):boolean => _user.id === userId);
    users[indexOfUser].name = user.name;
    users[indexOfUser].email = user.email;
    res.send({
        message: `Antigo usuario -> ${users[indexOfUser].name} alterado para -> 
        ${user.name} email atualizado de ${users[indexOfUser].email} para -> ${user.email}`
    });
});

// Post send user
userRouter.post("/users", (req: Request, res: Response): void => {
    let user = req.body;
    user.id = id++;
    userRegistered++;
    users.push(user);
    res.send({
        message: `Usuario criado com sucesso ${userRegistered}`
    });
});

//Delete user
userRouter.delete("/users/:id", (req: Request, res: Response): void => {
    let userId: number = Number(req.params.id);
    let indexOfUser: number = users.findIndex((_user: User): boolean => _user.id === userId);
    users.splice(indexOfUser, 1);
    res.send({
        message: `Usuario removido com sucesso`
    });
})