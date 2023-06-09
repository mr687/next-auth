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
/// <reference types="mongoose/types/connection" />
import type { Connection } from "mongoose";
import type { Adapter } from "@auth/core/adapters";
import { buildSchema } from "@typegoose/typegoose";
import { AccountSchema, SessionSchema, UserSchema, VerificationTokenSchema } from "./schemas";
import { Awaitable } from "@auth/core/types";
import type { AnyParamConstructor } from "@typegoose/typegoose/lib/types";
export interface AdapterSchema<T extends AnyParamConstructor<any>> {
    modelName: string;
    schema: ReturnType<typeof buildSchema<T>>;
}
/** This is the interface for the Typegoose adapter options. */
export interface TypegooseAdapterOptions {
    /**
     * The {@link https://typegoose.github.io/typegoose/docs/api/decorators/model-options/#existingconnection Connection} you want to use for the MongoDB database.
     */
    connection: Awaitable<Connection>;
    /**
     * The optional schemas to override the default schemas.
     */
    schemas?: Partial<{
        UserSchema: AdapterSchema<typeof UserSchema>;
        AccountSchema: AdapterSchema<typeof AccountSchema>;
        SessionSchema: AdapterSchema<typeof SessionSchema>;
        VerificationTokenSchema: AdapterSchema<typeof VerificationTokenSchema>;
    }>;
    /**
     * The optional options for the adapter.
     * @property {string} dbName The DB name you want to connect to the MongoDB database.
     */
    options?: Partial<{
        /**
         * The DB name you want to connect to the MongoDB database
         */
        dbName: string;
    }>;
}
type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends Array<infer U> ? Array<DeepRequired<U>> : T[P] extends object ? DeepRequired<T[P]> : T[P];
};
export declare const defaultSchemas: DeepRequired<TypegooseAdapterOptions["schemas"]>;
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
export declare function TypegooseAdapter({ connection, schemas, options, }: TypegooseAdapterOptions): Adapter;
export { AccountSchema, SessionSchema, UserSchema, VerificationTokenSchema, } from "./schemas";
//# sourceMappingURL=index.d.ts.map