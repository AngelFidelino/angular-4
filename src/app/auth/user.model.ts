export class User{
    constructor(private email:string, private id:string, private idToken:string, private expiresDate:Date){}

    get token(){
        if(!this.expiresDate || new Date() > this.expiresDate){
            return null;
        }
        return this.idToken;
    }
}