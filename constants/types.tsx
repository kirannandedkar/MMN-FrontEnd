export interface FamilyAccountInfo {
    [key: string]: any;
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    gender: 'male' | 'female' | string,
    muncipality?: string,
    phoneNumber?: string,
    referenceUserAccountId?: number,
    dateOfBirth: string,
    relation?: string | null,
    memberid?: string | null,
}

export interface AccountInfo extends FamilyAccountInfo {
    mobile: string,
    country?: string | null,
    id_token?: string | null
}

export const Genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "FeMale" },
];

export const Relationships = [
    { value: "wife", label: "Wife" },
    { value: "son", label: "Son" },
    { value: "daughter", label: "Daughter" },
]

export const CountryList = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "NR", label: "Norway" },
]

export interface CommitteeMember{
    name: string, 
    imageurl: string,
    period?: {
        begin: number, end: number
    }
}