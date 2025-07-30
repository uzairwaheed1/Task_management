import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';
import { Matches } from 'class-validator';
export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsEmail()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{6,}$/, {
  message:
    'Enter correct email format',
})
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{6,}$/, {
  message:
    'Password too weak. It must contain at least 6 characters, one uppercase letter, one lowercase letter, one number and one special character',
})
  password: string;
}