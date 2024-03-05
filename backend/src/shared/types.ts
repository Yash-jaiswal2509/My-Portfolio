export type UserType = {
    _id: string;
    firstName: string;
    lastName: string;
    email:string;
    password: string;
    confirmPassword: string;
    refreshToken:string;
}

export type ProjectType = {
    _id: string;
    projectName: string;
    description: string;
    video: string;
    image: string;
}