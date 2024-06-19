export class Winner {
  constructor(public id: number, public userId?: number) {}
}

export default class User {
  constructor(public id: number, public name: string, public avatarUrl: string, public email: string, public winner?: Winner) {}
}
