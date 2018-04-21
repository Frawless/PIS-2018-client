export class User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    address: any;
    role: any;
    roleName: string;
    orders: any;

    constructor(username, firstname, lastname, email, phoneNumber, address, role){
      this.username = username;
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.address = address;
      this.role = role;
    }
}
