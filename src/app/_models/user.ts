export class User {
  username?: string;
  password?: string;
  name?: string;
  surname?: string;
  dateOfBirth?: string;
  phone?: string;
  addresses?: [{
    country: string;
    city: string;
    street: string;
  }]
}
