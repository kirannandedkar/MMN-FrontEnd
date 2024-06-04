export interface FamilyAccountInfo {
    firstName?: string | null,
    lastName?: string | null,
    email: string,
    password?: string,
    gender?: 'male' | 'female' | null,
    muncipality?: string,
    phoneNumber?: string,
    referenceUserAccountId?: number,

    birth?: string | null,
    relation?: string | null,
    memberid?: string | null,
}

export interface AccountInfo extends FamilyAccountInfo {
    mobile?: string | null,
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