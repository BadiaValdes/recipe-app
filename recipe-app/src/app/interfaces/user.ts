export interface User {
    id: string,
    last_login: string,
    user_name : string,
    first_name: string,
    last_name:string,
    mail: string,
    date_joined : string,
    avatar: string,
    background_image: string,
    groups: string [],
    is_staff: boolean,
    is_active: boolean,
}