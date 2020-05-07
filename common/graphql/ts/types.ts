
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum SourceType {
    YOUTUBE = "YOUTUBE"
}

export enum MediaType {
    AUDIO = "AUDIO",
    VIDEO = "VIDEO",
    IMAGE = "IMAGE"
}

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}

export enum TokenType {
    EMAIL_CONFIRMATION = "EMAIL_CONFIRMATION",
    PASSWORD_RESET = "PASSWORD_RESET"
}

export enum AuthName {
    USER_NAME = "USER_NAME",
    EMAIL = "EMAIL"
}

export interface FulltextFilter {
    query?: string;
    pagination?: Pagination;
}

export interface FulltextFilterForUser {
    query?: string;
    idUser?: string;
    pagination?: Pagination;
}

export interface MediaFilter {
    query?: string;
    pagination?: Pagination;
    source?: MediaType;
    owner?: string;
    local?: boolean;
}

export interface Pagination {
    limit?: number;
    offset?: number;
}

export interface TrainingMediaInput {
    id: string;
    sourceType: SourceType;
}

export interface TrainingUpdateInput {
    label: string;
    media: TrainingMediaInput[];
}

export interface TrainingSetInput {
    label: string;
}

export interface TrainingDraftInput {
    label?: string;
    idTrainingSet?: string;
    media?: TrainingMediaInput[];
}

export interface UserRegister {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    userName: string;
}

export interface UserLogin {
    userNameOrEmail: string;
    password: string;
}

export interface UserUpdateInput {
    role?: Role;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    passwordRepeat?: string;
    userName?: string;
}

export interface AuthNameCheck {
    name: string;
    type: AuthName;
}

export interface Entity {
    id: string;
    createdAt: DateTime;
    updatedAt?: DateTime;
}

export interface List {
    meta: ListMeta;
    entries: Entity[];
}

export interface DateTime {
    iso: string;
    humanReadable: string;
}

export interface ListMeta {
    totalCount: number;
}

export interface Source {
    sourceType: SourceType;
    mediaType: MediaType;
    thumbnail?: string;
    id?: string;
    resourceId?: string;
    url?: string;
}

export interface Media {
    id?: string;
    createdAt?: DateTime;
    updatedAt?: DateTime;
    source: Source;
    label: string;
}

export interface MediaList {
    meta: ListMeta;
    entries: Media[];
}

export interface IQuery {
    allUsers(filter?: FulltextFilter): UserList | Promise<UserList>;
    allMedia(filter?: FulltextFilter): MediaList | Promise<MediaList>;
    allTrainings(filter?: FulltextFilter): TrainingList | Promise<TrainingList>;
    allTrainingSets(filter?: FulltextFilterForUser): TrainingSetList | Promise<TrainingSetList>;
    user(id: string): User | Promise<User>;
    checkUserAuthName(check: AuthNameCheck): AuthNameCheckResult | Promise<AuthNameCheckResult>;
    me(): User | Promise<User>;
    trainingSet(id: string): TrainingSet | Promise<TrainingSet>;
    training(id: string): Training | Promise<Training>;
    media(id: string): Media | Promise<Media>;
    findMedia(filter?: MediaFilter): MediaList | Promise<MediaList>;
}

export interface IMutation {
    userRegister(user: UserRegister): Auth | Promise<Auth>;
    userLogin(user: UserLogin): Auth | Promise<Auth>;
    userConfirmEmail(token: string): Token | Promise<Token>;
    userUpdateMyself(user: UserUpdateInput): User | Promise<User>;
    userUpdate(id: string, user: UserUpdateInput): User | Promise<User>;
    createTrainingSet(trainingSet?: TrainingSetInput): TrainingSet | Promise<TrainingSet>;
    updateTrainingSet(id: string, trainingSet?: TrainingSetInput): TrainingSet | Promise<TrainingSet>;
    createTraining(draft?: TrainingDraftInput): Training | Promise<Training>;
    updateTraining(id: string, training: TrainingUpdateInput): Training | Promise<Training>;
    removeMediaFromTraining(idTraining: string, idMedia: string): Training | Promise<Training>;
    removeTrainingFromTrainingSet(id: string): Training | Promise<Training>;
    removeTrainingSet(id: string): TrainingSet | Promise<TrainingSet>;
}

export interface Training extends Entity {
    id: string;
    createdAt: DateTime;
    updatedAt?: DateTime;
    label: string;
    media: MediaList;
    trainingSet: TrainingSet;
    owner: User;
}

export interface TrainingSet extends Entity {
    id: string;
    createdAt: DateTime;
    updatedAt?: DateTime;
    label: string;
    trainings: TrainingList;
    owner: User;
}

export interface TrainingSetList extends List {
    meta: ListMeta;
    entries: TrainingSet[];
}

export interface TrainingList extends List {
    meta: ListMeta;
    entries: Training[];
}

export interface User extends Entity {
    id: string;
    createdAt: DateTime;
    updatedAt?: DateTime;
    role: Role;
    lastLogin?: DateTime;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    userName: string;
    email: string;
    emailValidated?: boolean;
}

export interface Auth {
    token: string;
    user?: User;
}

export interface UserList extends List {
    meta: ListMeta;
    entries: User[];
}

export interface Token extends Entity {
    id: string;
    createdAt: DateTime;
    updatedAt?: DateTime;
    token: string;
    validUntil?: DateTime;
    valid: boolean;
    tokenType: TokenType;
}

export interface TokenList extends List {
    meta: ListMeta;
    entries: Token[];
}

export interface AuthNameCheckResult {
    available: boolean;
}
