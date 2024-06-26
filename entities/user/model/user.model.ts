export interface IUser {
	id: number
	name: string
	surname?: string
	photo?: string
}

export interface IUserResponse {
	profile: IUser
}
