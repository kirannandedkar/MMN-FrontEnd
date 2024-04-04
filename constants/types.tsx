export interface FamilyAccountInfo {
    firstName: string,
    lastName?: string | null,
    birth?: string | null,
    email: string,
    gender?: 'male' | 'female' | null,
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
    { value: "child", label: "Child" },
    { value: "friend", label: "Friend" },
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