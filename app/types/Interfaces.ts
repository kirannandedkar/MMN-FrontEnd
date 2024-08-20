export interface ICompact {
    id: number;
    name: string;
    description: string;
    eventDate: string;
    eventMonth: string;
    eventImagePath: string;
    eventAddress: string;
    isEventOpenedForRegistration: boolean;
    isEventFinished: boolean;
    isEventRegistrationClosed: boolean;
    eventRegistrationLink: string
}