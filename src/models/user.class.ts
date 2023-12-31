export class User {
    firstName: string;
    lastName: string;
    eMail: string;
    dateOfBirth: number;
    street: string;
    zipCode: number;
    city: string;
    id: any;


    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.eMail = obj ? obj.eMail : '';
        this.dateOfBirth = obj ? obj.dateOfBirth : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
    }

    public toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            eMail: this.eMail,
            dateOfBirth: this.dateOfBirth,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city
        }
    }
}