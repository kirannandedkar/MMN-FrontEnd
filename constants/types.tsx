export interface FamilyAccountInfo extends FamilyMember{
    password?: string,
    muncipality?: string,
    phoneNumber?: string,
    referenceUserAccountId?: number,
    memberid?: string | null,
}

export interface FamilyMember {
    [key: string]: any;
    firstName: string,
    lastName: string,
    email: string,
    dateOfBirth: string,
    relation?: string | null,
    gender: 'male' | 'female' | string,
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