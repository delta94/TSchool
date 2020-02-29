import { UserType } from "../UserService/utils/controller-validation-types";

export interface JwtPayload {
    id: number;
    username: string;
    schoolId: number;
    type: UserType
    iat: number;
}