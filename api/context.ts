export type Session = {
  user: {
    name: string
    email: string
    image: string
  }
  expires: string
}

export type Context = {
  session: Session
}