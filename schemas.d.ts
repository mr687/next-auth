import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import type { AdapterAccount, AdapterSession, AdapterUser, VerificationToken } from "@auth/core/adapters";
export declare class BaseSchema extends TimeStamps implements Omit<Base, "_id"> {
    id: Base["id"];
    __v: number;
    createdAt: TimeStamps["createdAt"];
    updatedAt: TimeStamps["updatedAt"];
}
export declare class AccountSchema extends BaseSchema implements AdapterAccount {
    userId: AdapterAccount["userId"];
    providerAccountId: AdapterAccount["providerAccountId"];
    provider: AdapterAccount["provider"];
    type: AdapterAccount["type"];
    access_token?: AdapterAccount["access_token"];
    token_type?: AdapterAccount["token_type"];
    id_token?: AdapterAccount["id_token"];
    refresh_token?: AdapterAccount["refresh_token"];
    scope?: AdapterAccount["scope"];
    expires_at?: AdapterAccount["expires_at"];
    session_state?: AdapterAccount["session_state"];
    [parameter: string]: any;
}
export declare class SessionSchema extends BaseSchema implements AdapterSession {
    userId: AdapterSession["userId"];
    sessionToken: AdapterSession["sessionToken"];
    expires: AdapterSession["expires"];
}
export declare class UserSchema extends BaseSchema implements AdapterUser {
    name?: AdapterUser["name"];
    email: AdapterUser["email"];
    image?: AdapterUser["image"];
    emailVerified: AdapterUser["emailVerified"];
    sessions: SessionSchema[];
    accounts: AccountSchema[];
}
export declare class VerificationTokenSchema extends BaseSchema implements VerificationToken {
    id: Base["id"];
    identifier: VerificationToken["identifier"];
    expires: VerificationToken["expires"];
    token: VerificationToken["token"];
}
//# sourceMappingURL=schemas.d.ts.map