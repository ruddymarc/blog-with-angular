import { User } from "./user.model";

export class Post {
  constructor(
    public title: string,
    public summary: string,
    public content: string,
    public loveIts: number = 0,
    public createdAt: Date | string = new Date().toString(),
    public author: User | null = null,
    public imageUrl: string | null = null,
  ) {}
}
