export interface SendMagicLinkDTO {
  username: string;
  token: string;
  email: string;
  locale: string;
        device: string;
      ipAddress: string;
}

export interface SendResetLinkDTO {
      username: string;
      token: string;
      email: string;
      locale: string;
      device: string;
      ipAddress: string;
      location: string;
}

export interface SendMagicLinkMessageDTO {
  payload: SendMagicLinkDTO
}

export interface SendResetLinkMessageDTO {
  payload: SendMagicLinkDTO
}