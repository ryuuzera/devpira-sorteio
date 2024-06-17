export default class User {
  constructor(
    public id: number,
    public name: string,
    public avatarUrl: string,
    public email: string,
    public winnerId: number | null
  ){}
}