var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { modelOptions, prop, Severity } from "@typegoose/typegoose";
import { Exclude, Expose, Type } from "class-transformer";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
export let BaseSchema = class BaseSchema extends TimeStamps {
};
__decorate([
    Expose(),
    __metadata("design:type", Object)
], BaseSchema.prototype, "id", void 0);
__decorate([
    Exclude(),
    __metadata("design:type", Number)
], BaseSchema.prototype, "__v", void 0);
__decorate([
    Exclude(),
    __metadata("design:type", Object)
], BaseSchema.prototype, "createdAt", void 0);
__decorate([
    Exclude(),
    __metadata("design:type", Object)
], BaseSchema.prototype, "updatedAt", void 0);
BaseSchema = __decorate([
    Exclude(),
    modelOptions({
        schemaOptions: {
            timestamps: true,
        },
        options: {
            allowMixed: Severity.ALLOW,
        },
    })
], BaseSchema);
export let AccountSchema = class AccountSchema extends BaseSchema {
};
__decorate([
    prop({ required: true }),
    Expose(),
    __metadata("design:type", Object)
], AccountSchema.prototype, "userId", void 0);
__decorate([
    prop({ required: true }),
    Expose(),
    __metadata("design:type", Object)
], AccountSchema.prototype, "providerAccountId", void 0);
__decorate([
    prop({ required: true }),
    Expose(),
    __metadata("design:type", Object)
], AccountSchema.prototype, "provider", void 0);
__decorate([
    prop({ required: true }),
    Expose(),
    __metadata("design:type", Object)
], AccountSchema.prototype, "type", void 0);
__decorate([
    prop({ required: false, default: undefined }),
    Expose(),
    __metadata("design:type", Object)
], AccountSchema.prototype, "access_token", void 0);
__decorate([
    prop({ required: false, default: undefined }),
    Expose(),
    __metadata("design:type", Object)
], AccountSchema.prototype, "token_type", void 0);
__decorate([
    prop({ required: false, default: undefined }),
    Expose(),
    __metadata("design:type", Object)
], AccountSchema.prototype, "id_token", void 0);
__decorate([
    prop({ required: false, default: undefined }),
    Expose(),
    __metadata("design:type", Object)
], AccountSchema.prototype, "refresh_token", void 0);
__decorate([
    prop({ required: false, default: undefined }),
    Expose(),
    __metadata("design:type", Object)
], AccountSchema.prototype, "scope", void 0);
__decorate([
    prop({ required: false, default: undefined }),
    Expose(),
    __metadata("design:type", Object)
], AccountSchema.prototype, "expires_at", void 0);
__decorate([
    prop({ required: false, default: undefined }),
    Expose(),
    __metadata("design:type", Object)
], AccountSchema.prototype, "session_state", void 0);
AccountSchema = __decorate([
    Exclude()
], AccountSchema);
export let SessionSchema = class SessionSchema extends BaseSchema {
};
__decorate([
    prop({ required: true }),
    Expose(),
    __metadata("design:type", Object)
], SessionSchema.prototype, "userId", void 0);
__decorate([
    prop({ required: true }),
    Expose(),
    __metadata("design:type", Object)
], SessionSchema.prototype, "sessionToken", void 0);
__decorate([
    prop({ required: true }),
    Expose(),
    __metadata("design:type", Object)
], SessionSchema.prototype, "expires", void 0);
SessionSchema = __decorate([
    Exclude()
], SessionSchema);
export let UserSchema = class UserSchema extends BaseSchema {
};
__decorate([
    prop({ required: false, default: null }),
    Expose(),
    __metadata("design:type", Object)
], UserSchema.prototype, "name", void 0);
__decorate([
    prop({ required: true, unique: true }),
    Expose(),
    __metadata("design:type", Object)
], UserSchema.prototype, "email", void 0);
__decorate([
    prop({ required: false, default: null }),
    Expose(),
    __metadata("design:type", Object)
], UserSchema.prototype, "image", void 0);
__decorate([
    prop({ required: false, default: null }),
    Expose(),
    __metadata("design:type", Object)
], UserSchema.prototype, "emailVerified", void 0);
__decorate([
    prop({ required: true, default: [] }),
    Type(() => SessionSchema),
    Exclude(),
    __metadata("design:type", Array)
], UserSchema.prototype, "sessions", void 0);
__decorate([
    prop({ required: true, default: [] }),
    Type(() => AccountSchema),
    Exclude(),
    __metadata("design:type", Array)
], UserSchema.prototype, "accounts", void 0);
UserSchema = __decorate([
    Exclude()
], UserSchema);
export let VerificationTokenSchema = class VerificationTokenSchema extends BaseSchema {
};
__decorate([
    Exclude(),
    __metadata("design:type", Object)
], VerificationTokenSchema.prototype, "id", void 0);
__decorate([
    prop({ required: true }),
    Expose(),
    __metadata("design:type", Object)
], VerificationTokenSchema.prototype, "identifier", void 0);
__decorate([
    prop({ required: true }),
    Expose(),
    Type(() => Date),
    __metadata("design:type", Object)
], VerificationTokenSchema.prototype, "expires", void 0);
__decorate([
    prop({ required: true }),
    Expose(),
    __metadata("design:type", Object)
], VerificationTokenSchema.prototype, "token", void 0);
VerificationTokenSchema = __decorate([
    Exclude()
], VerificationTokenSchema);
