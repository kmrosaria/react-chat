export interface Message {
  text?: string;
  createdAt: number;
  attachment: {
    type: string;
    url: string;
  } | null;
  sender: {
    uid: string;
    displayName: string;
  };
}
