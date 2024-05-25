export interface AuthInfo {
    email?: string | null;
    email_verified?: boolean | null;
    name?: string | null;
    nickname?: string | null;
    picture?: string | null;
    sub?: string | null;
    updated_at?: string | null;
    org_id?: string | null;
    [key: string]: unknown;
}