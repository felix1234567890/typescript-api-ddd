export interface ITokenProvider {
  sign(userId: number): string;
  /** Returns the user id the token was issued for; throws if the token is invalid or expired. */
  verify(token: string): number;
}
