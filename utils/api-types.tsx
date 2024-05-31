export interface MeDto {
  id: number;
  firstName: string;
  lastName: string;
  membershipId: string;
  email: string;
}

export interface ErrorResponseDto {
  code: number;
  message: string;
  isSuccess: boolean;
  errors: { [key: string]: string[] };
}
