export interface User {
    id: string,
    is_superuser: boolean,
    user_name : string,
    first_name: string,
    last_name:string,
    mail: string,
    date_joined : string,
    avatar: string,
    groups: string [],
}