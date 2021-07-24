export class User {
  constructor(
    public uid: string,
    public fullName: string | null = null,
    public email: string | null = null,
    public phoneNumber: string | null = null,
    public photoURL: string | null = null
  ) {}

  public toString(): string {
    return this.fullName ? this.fullName : this.uid;
  }
}
