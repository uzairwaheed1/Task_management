// verify-email.dto.ts
import { IsEmail, IsString } from 'class-validator';

// This DTO is used to verify the email address of a user
export class SendVerificationDto {


    @IsString()
    name: string;
    
    @IsString()
    password: string;

  @IsEmail()
  email: string;

  @IsString()
  token: string;
}