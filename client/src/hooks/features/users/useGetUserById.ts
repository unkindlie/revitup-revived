import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/api/scopes/users';

export const useGetUserById = (id: number) =>
  useQuery({
    queryKey: ['user-detailed', id],
    queryFn: () => getUserById(id),
  });
