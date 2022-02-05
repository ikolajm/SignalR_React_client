export default interface AuthenticatedUser {
    id: number | null,
    email: string;
    username: string;
    avatar: string;
    token: string | null;
    // created: any;
    // lastOnline: string | null;
}