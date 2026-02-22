export class ThreadShortDto {
  id: number;
  title: string;
  createdAt: Date;
  author: {
    id: number;
    username: string;
  };
}
