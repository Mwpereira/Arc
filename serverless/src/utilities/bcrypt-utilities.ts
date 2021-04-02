import * as bcrypt from 'bcryptjs';

/**
 * Contains methods for encrypting/hashing
 */
export default class BcryptUtilities {
  /**
   * Generates string containing the hashed value - Salt Level 15 * Advanced Hashing
   *
   * @param secret
   * @returns hashed value
   */
  static async getHashedValue(secret: string): Promise<string> {
    return bcrypt.hash(secret, await bcrypt.genSalt(15));
  }

  /**
   * Checks to confirm if password received is valid
   *
   * @param actual
   * @param expected
   */
  static async validatePassword(
    actual: string,
    expected: string
  ): Promise<boolean> {
    return await bcrypt.compare(actual, expected);
  }
}
