
export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) { }

}

export class Usuario2 {

    constructor(
        public id: string,
        public email: string,
        public password_digest: string,
        public name?: string,
        public job?: string,
        public gender?: boolean,
        public status?: string,
        public created_at?: string,
        public updated_at?: string,
        public reset_password_token?: string,
        public role_id?: string
    ) { }

}

