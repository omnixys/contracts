/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * @license GPL-3.0-or-later
 * Copyright (C) 2025 Caleb Gyamfi - Omnixys Technologies
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * For more information, visit <https://www.gnu.org/licenses/>.
 */

/**
 * Realm roles used by Omnixys services (single effective role).
 * NOTE: We resolve ONE effective role from potentially many Keycloak roles.
 */

export enum RealmRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUPREME = 'SUPREME',
  ELITE = 'ELITE',
  BASIC = 'BASIC',
  GUEST = 'GUEST',
}