//user table model
export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    created_at?: Date;
}