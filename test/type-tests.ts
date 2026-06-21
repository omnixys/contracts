import type {
  CreatePendingUserDTO,
  GuestAuthKey,
  GuestNotificationDTO,
  GuestSignUpTokenPayload,
} from '../src/index.js';
import type {
  CreatePendingUserDTO as ContractPendingUser,
  GuestAuthKey as ContractGuestAuthKey,
  GuestNotificationDTO as ContractGuestNotification,
  GuestSignUpTokenPayload as ContractGuestToken,
} from '@omnixys/contracts';

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;
type Assert<T extends true> = T;

type PendingCompatible = Assert<
  Equal<CreatePendingUserDTO, ContractPendingUser>
>;
type AuthCompatible = Assert<Equal<GuestAuthKey, ContractGuestAuthKey>>;
type NotificationCompatible = Assert<
  Equal<GuestNotificationDTO, ContractGuestNotification>
>;
type TokenCompatible = Assert<
  Equal<GuestSignUpTokenPayload, ContractGuestToken>
>;

void (true as PendingCompatible);
void (true as AuthCompatible);
void (true as NotificationCompatible);
void (true as TokenCompatible);
