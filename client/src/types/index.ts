export type User = {
  logged: boolean;
  userId: string;
  userName: string;
}

export type Task = {
  day: string;
  done: boolean;
  id: string;
  priority: boolean;
  reminder: boolean; //TODO: no creo que sea string
  task: string;
}