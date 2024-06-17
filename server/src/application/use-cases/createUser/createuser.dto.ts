export interface CreateUserDTO {
    name: string;
    avatarUrl: string;
    email: string;
    winnerId: number | null;
}