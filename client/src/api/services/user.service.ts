import { api } from '@/api';
import { BackendRoutes } from '@/lib/routing/backend';

class UserService {
  static async getUsers(): Promise<void> {
    await api
      .get(BackendRoutes.Users, { params: { take: 10 } })
      .then((res) => console.log(res));
  }
}

export default UserService;
