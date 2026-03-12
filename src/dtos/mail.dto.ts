export interface SendMailDTO {
  username: string;
  token: string;
  email: string;
  locale: string;
  device: string;
  ip: string;
  location: string;
}

export interface SendMailMessageDTO {
  payload: SendMailDTO
}