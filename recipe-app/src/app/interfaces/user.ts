export interface User {
    id: string,
    last_login: string,
    username : string,
    first_name: string,
    last_name:string,
    email: string,
    date_joined : string,
    avatar: string,
    background_image: string,
    groups: string [],
    is_staff: boolean,
    is_active: boolean,
}