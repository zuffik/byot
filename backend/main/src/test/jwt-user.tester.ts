import { JwtUserType } from '../auth/decorators/jwt-user.decorator';

export function testJwtUser(user: JwtUserType | any) {
  expect(user).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      email: expect.any(String),
      role: expect.stringMatching(/USER|ADMIN/),
    }),
  );
}
