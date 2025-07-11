import { Expose, Exclude } from 'class-transformer';

/**
 * User Data Transfer Object (DTO) for serialization.
 * This class defines the structure of user data that will be sent to the client.
 */
export class UserDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
}
