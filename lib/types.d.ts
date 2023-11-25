export interface CreateUserRequest{
    userName: string
}

export interface UserInterface{
    name: string,
    votes: number[],
    hasShown: boolean
}

export interface UserType{
    id : number,
    name: string,
    votes: number[],
    hasShown: boolean,
  }
  
  export interface CharacterType{
    id: number,
    description: string
  }
  