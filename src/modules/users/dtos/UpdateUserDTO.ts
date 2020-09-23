export interface UpdateUserDTO {
  id: number | string;
  name?: string;
  email?: string;
  password?: string;
  newPassword?: string;
  userId: string;
}
