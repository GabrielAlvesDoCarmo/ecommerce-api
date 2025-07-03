import {Request, Response} from 'express';
let userRegistered: number = 0;
let id: number = 1;

type User = {
    id: number;
    name: string;
    email: string;
};
let users: User[] = []

export class UsersController {
    static getAll(req: Request, res: Response): void{
        res.send(users)
    }

    static getById(req: Request, res: Response): void{
        let userId: number = Number(req.params.id);
        let user = users.find(user => user.id === userId);
        res.send(user)
    }

    static change(req: Request, res: Response): void{
        let userId: number = Number(req.params.id);
        let user = req.body;
        let indexOfUser: number = users.findIndex((_user: User): boolean => _user.id === userId);
        users[indexOfUser].name = user.name;
        users[indexOfUser].email = user.email;
        res.send({
            message: `Antigo usuario -> ${users[indexOfUser].name} alterado para -> 
        ${user.name} email atualizado de ${users[indexOfUser].email} para -> ${user.email}`
        });
    }

    static create(req: Request, res: Response): void{
        let user = req.body;
        user.id = id++;
        userRegistered++;
        users.push(user);
        res.send({
            message: `Usuario criado com sucesso ${userRegistered}`
        });
    }

    static delete(req: Request, res: Response): void{
        let userId: number = Number(req.params.id);
        let indexOfUser: number = users.findIndex((_user: User): boolean => _user.id === userId);
        users.splice(indexOfUser, 1);
        res.send({
            message: `Usuario removido com sucesso`
        });
    }
}