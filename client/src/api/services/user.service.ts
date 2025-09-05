import { api } from '@/api';

class UserService {
  private static BASE_URL = '/users';

  static async getUsers(): Promise<void> {
    await api
      .get(this.BASE_URL, { params: { take: 10 } })
      .then((res) => console.log(res));
  }
}

export default UserService;
