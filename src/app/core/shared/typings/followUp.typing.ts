export interface FollowUp {
  id?: string;
  createdAt?: string | any;
  status?: string;
  coach?: Coach;
  followUpTime?: string | any;
  user?: string;
}

export interface Coach {
  displayName?: string;
  code?: string;
}
