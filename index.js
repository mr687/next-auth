/**
 * <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16}}>
 *  <p style={{fontWeight: "normal"}}>Official <a href="https://typegoose.github.io">Typegoose</a> adapter for Auth.js / NextAuth.js.</p>
 *  <a href="https://typegoose.github.io">
 *   <img style={{display: "block"}} src="/img/adapters/typegoose.svg" width="150" />
 *  </a>
 * </div>
 *
 * ## Installation
 *
 * ```bash npm2yarn2pnpm
 * npm install next-auth @auth/typegoose-adapter @typegoose/typegoose mongoose
 * ```
 *
 * @module @auth/typegoose-adapter
 */
import { buildSchema } from "@typegoose/typegoose";
import { AccountSchema, SessionSchema, UserSchema, VerificationTokenSchema, } from "./schemas";
import { instanceToPlain, plainToClass } from "class-transformer";
export const defaultSchemas = {
    UserSchema: {
        modelName: UserSchema.name,
        schema: buildSchema(UserSchema),
    },
    AccountSchema: {
        modelName: AccountSchema.name,
        schema: buildSchema(AccountSchema),
    },
    SessionSchema: {
        modelName: SessionSchema.name,
        schema: buildSchema(SessionSchema),
    },
    VerificationTokenSchema: {
        modelName: VerificationTokenSchema.name,
        schema: buildSchema(VerificationTokenSchema),
    },
};
/**
 * ## Setup
 *
 * Configure Auth.js with Typegoose Adapter:
 *
 * ```typescript
 * import NextAuth from "next-auth"
 * import { TypegooseAdapter } from "@auth/typegoose-adapter"
 *
 * export default NextAuth({
 *  adapter: TypegooseAdapter({
 *   connection: mongoose.createConnection("mongodb://localhost:27017/mydb", {
 *    useNewUrlParser: true,
 *    useUnifiedTopology: true,
 *   })
 *  }),
 *  // ...
 * })
 * ```
 * `TypegooseAdapter` takes a [`Connection`](https://typegoose.github.io/typegoose/docs/api/decorators/model-options/#existingconnection) and an optional `options.dbName` as parameters.
 *
 */
export function TypegooseAdapter({ connection, schemas, options: _options, }) {
    let _connection = null;
    const s = {
        UserSchema: schemas?.UserSchema ?? defaultSchemas.UserSchema,
        AccountSchema: schemas?.AccountSchema ?? defaultSchemas.AccountSchema,
        SessionSchema: schemas?.SessionSchema ?? defaultSchemas.SessionSchema,
        VerificationTokenSchema: schemas?.VerificationTokenSchema ??
            defaultSchemas.VerificationTokenSchema,
    };
    const db = (async () => {
        if (!_connection)
            _connection = await connection;
        const UModel = _connection.models[s.UserSchema.modelName] ??
            _connection.model(s.UserSchema.modelName, s.UserSchema.schema);
        const VModel = _connection.models[s.VerificationTokenSchema.modelName] ??
            _connection.model(s.VerificationTokenSchema.modelName, s.VerificationTokenSchema.schema);
        return {
            U: UModel,
            V: VModel,
        };
    })();
    return {
        createUser: async (user) => {
            const _db = await db;
            const newUser = await _db.U.create(user);
            const serialized = instanceToPlain(plainToClass(UserSchema, newUser));
            return serialized;
        },
        getUser: async (id) => {
            const user = await (await db).U.findById(id).exec();
            if (!user)
                return null;
            const serialized = instanceToPlain(plainToClass(UserSchema, user));
            return serialized;
        },
        getUserByEmail: async (email) => {
            const user = await (await db).U.findOne({ email }).exec();
            if (!user)
                return null;
            const serialized = instanceToPlain(plainToClass(UserSchema, user));
            return serialized;
        },
        getUserByAccount: async ({ provider, providerAccountId }) => {
            const user = await (await db).U.findOne({
                accounts: {
                    $elemMatch: {
                        provider,
                        providerAccountId,
                    },
                },
            }).exec();
            if (!user)
                return null;
            const serialized = instanceToPlain(plainToClass(UserSchema, user));
            return serialized;
        },
        updateUser: async (user) => {
            const { id, ...data } = user;
            const updatedUser = await (await db).U.findByIdAndUpdate(id, data, {
                new: true,
            }).exec();
            const serialized = instanceToPlain(plainToClass(UserSchema, updatedUser ?? {}));
            return serialized;
        },
        deleteUser: async (userId) => {
            const oldUser = await (await db).U.findByIdAndDelete(userId).exec();
            if (!oldUser)
                return null;
            const serialized = instanceToPlain(plainToClass(UserSchema, oldUser));
            return serialized;
        },
        createSession: async (session) => {
            const newSession = plainToClass(SessionSchema, session);
            await (await db).U.findByIdAndUpdate(session.userId, {
                $push: {
                    sessions: newSession,
                },
            }, {
                new: true,
            }).exec();
            const serialized = instanceToPlain(newSession);
            return serialized;
        },
        getSessionAndUser: async (sessionToken) => {
            const user = await (await db).U.findOne({
                sessions: {
                    $elemMatch: {
                        sessionToken,
                    },
                },
            }).exec();
            if (!user)
                return null;
            const session = user.sessions.find((session) => session.sessionToken === sessionToken);
            const serializedUser = instanceToPlain(plainToClass(UserSchema, user));
            const serializedSession = instanceToPlain(plainToClass(SessionSchema, session));
            return {
                user: serializedUser,
                session: serializedSession,
            };
        },
        updateSession: async (session) => {
            await (await db).U.findOneAndUpdate({
                "sessions.sessionToken": session.sessionToken,
            }, {
                $set: {
                    "sessions.$": session,
                },
            }, {
                new: true,
            }).exec();
            const serialized = instanceToPlain(plainToClass(SessionSchema, session));
            return serialized;
        },
        deleteSession: async (sessionToken) => {
            const user = await (await db).U.findOneAndUpdate({
                "sessions.sessionToken": sessionToken,
            }, {
                $pull: {
                    sessions: {
                        sessionToken,
                    },
                },
            }).exec();
            if (!user)
                return null;
            const session = user.sessions.find((session) => session.sessionToken === sessionToken);
            const serialized = instanceToPlain(plainToClass(SessionSchema, session));
            return serialized;
        },
        linkAccount: async (account) => {
            const user = await (await db).U.findByIdAndUpdate(account.userId, {
                $push: {
                    accounts: account,
                },
            }, { new: true }).exec();
            if (!user)
                return null;
            const newAccount = user.accounts.find((acc) => acc.providerId === account.providerId);
            const serialized = instanceToPlain(plainToClass(AccountSchema, newAccount));
            return serialized;
        },
        unlinkAccount: async ({ provider, providerAccountId }) => {
            const user = await (await db).U.findOneAndUpdate({
                accounts: {
                    $elemMatch: {
                        provider,
                        providerAccountId,
                    },
                },
            }, {
                $pull: {
                    accounts: {
                        provider,
                        providerAccountId,
                    },
                },
            }, {
                new: true,
            });
            if (!user)
                return undefined;
            const deletedAccount = user.accounts.find((acc) => acc.providerId === providerAccountId && acc.provider === provider);
            const serialized = instanceToPlain(plainToClass(AccountSchema, deletedAccount));
            return serialized;
        },
        createVerificationToken: async (verificationToken) => {
            const newToken = await (await db).V.create(verificationToken);
            const serialized = instanceToPlain(plainToClass(VerificationTokenSchema, newToken));
            return serialized;
        },
        useVerificationToken: async (data) => {
            const token = await (await db).V.findOneAndDelete(data);
            if (!token)
                return null;
            const serialized = instanceToPlain(plainToClass(VerificationTokenSchema, token));
            return serialized;
        },
    };
}
export { AccountSchema, SessionSchema, UserSchema, VerificationTokenSchema, } from "./schemas";
