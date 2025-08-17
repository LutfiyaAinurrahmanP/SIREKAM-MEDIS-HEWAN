import { prismaClient } from "../src/backend/application/database";
export class UserTest {
  static async deleteUser() {
    await prismaClient.user.deleteMany({
      where: {
        username: "lutfiyapr",
      },
    });
  }
}
