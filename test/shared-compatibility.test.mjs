import * as shared from '../dist/index.js';
import * as contracts from '@omnixys/contracts';
import assert from 'node:assert/strict';
import test from 'node:test';

const baselineRuntimeExports = [
  'AddressType',
  'ContactOptionsType',
  'ENUM_TO_KC',
  'GenderType',
  'InterestCategoryType',
  'InterestType',
  'InvitationAlreadyApprovedException',
  'InvitationAlreadyRejectedException',
  'InvitationNotFoundException',
  'KC_TO_ENUM',
  'LANGUAGE_TO_LOCALE',
  'LogLevel',
  'MaritalStatusType',
  'MessageDirectionEnum',
  'MissingContactMethodException',
  'MissingGuestNameException',
  'MissingPendingContactException',
  'MissingRsvpContactDetailsException',
  'PersonStatusType',
  'PhoneNumberType',
  'RealmRoleType',
  'RelationshipType',
  'RsvpAlreadyAcceptedException',
  'RsvpNotAcceptedException',
  'RsvpNotSubmittedException',
  'StatusType',
  'TooManyRequestsException',
  'UserType',
  'createTmpUsername',
  'enumToKcName',
  'getPrimaryPhoneNumber',
  'mapLanguageToLocale',
  'n2u',
  'resolveEffectiveRole',
  'roleStrToEnum',
  'toEnumRoles',
];

test('all established shared runtime exports remain available', () => {
  for (const name of baselineRuntimeExports) {
    assert.ok(name in shared, `Missing compatibility export ${name}`);
  }
});

test('DTO enums and schemas resolve to canonical contract implementations', () => {
  assert.equal(shared.PhoneNumberType, contracts.PhoneNumberType);
  assert.equal(shared.RealmRoleType, contracts.RealmRoleType);
  assert.equal(
    shared.createPendingUserSchema,
    contracts.createPendingUserSchema,
  );
  assert.equal(shared.UserNotFoundException, contracts.UserNotFoundException);
});

test('legacy Nest exceptions remain operational without replacing canonical errors', () => {
  const legacy = new shared.InvitationNotFoundException('invitation-1');
  assert.equal(legacy.getStatus(), 404);
  assert.equal(legacy.getResponse().code, 'INVITATION_NOT_FOUND');

  const canonical = new contracts.InvitationNotFoundException('invitation-1');
  assert.equal(canonical.code, 'INVITATION_NOT_FOUND');
  assert.equal(typeof canonical.getStatus, 'undefined');
});

test('pure utilities do not write to process console', () => {
  const original = console.error;
  let calls = 0;
  console.error = () => {
    calls += 1;
  };
  try {
    assert.equal(shared.getPrimaryPhoneNumber(), undefined);
    assert.equal(
      shared.getPrimaryPhoneNumber([
        {
          type: shared.PhoneNumberType.MOBILE,
          countryCode: '+49',
          number: '1234567',
          isPrimary: true,
        },
      ]),
      '+491234567',
    );
  } finally {
    console.error = original;
  }
  assert.equal(calls, 0);
});
