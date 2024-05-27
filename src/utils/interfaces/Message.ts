export interface Message {
    text?: string,
    date: string,
    attachment: {
        type: string,
        url: string,
    } | null,
    sender?: string,
    receiver?: string,
    owner?: string[]
}