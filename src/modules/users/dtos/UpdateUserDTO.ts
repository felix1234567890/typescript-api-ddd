export interface UpdateUserDTO {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  newPassword?: string;
  userId: number;
}
