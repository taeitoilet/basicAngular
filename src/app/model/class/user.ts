import { role } from "./role"

export class user {
    user_id : number
    role : role
    user_name : string 
    user_password : string
    user_fullname : string
    user_email : string
    user_phone : string
    user_address : string
    user_citizen_identification : string
    user_dob : string
    user_money : number
    user_status : string

    constructor(){
        this.user_id = 0;
        this.role = new role();
        this.user_name = ''
        this.user_password = ''
        this.user_fullname = ''
        this.user_email = ''
        this.user_phone = ''
        this.user_address = ''
        this.user_citizen_identification = ''
        this.user_dob = ''
        this.user_money = 0,
        this.user_status = ''
    }
    
}
export class userCreateRequest{
    role_id : number
    user_name : string 
    user_password : string
    user_fullname : string
    user_email : string
    user_phone : string
    user_address : string
    user_citizen_identification : string
    user_dob : string
    constructor(){
        this.role_id = 0 
        this.user_name = ''
        this.user_password = ''
        this.user_fullname = ''
        this.user_email = ''
        this.user_phone = ''
        this.user_address = ''
        this.user_citizen_identification = ''
        this.user_dob = ''
    }
}
export class userUpdateRequest{
    role_id : number
    user_password : string
    user_fullname : string
    user_email : string
    user_phone : string
    user_address : string
    user_citizen_identification : string
    user_dob : string
    user_money : number
    constructor(){
        this.role_id = 0 
        this.user_password = ''
        this.user_fullname = ''
        this.user_email = ''
        this.user_phone = ''
        this.user_address = ''
        this.user_citizen_identification = ''
        this.user_dob = ''
        this.user_money = 0
    }
}