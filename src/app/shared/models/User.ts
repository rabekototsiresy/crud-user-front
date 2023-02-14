import { IUser } from "../interfaces/IUser";

export class User implements IUser {
  constructor(
    public firstName: string,
    public lastName: string,
    public username: string,
    public password: string,
    public _id?: string,
    public ___v?: string

  ){}
}