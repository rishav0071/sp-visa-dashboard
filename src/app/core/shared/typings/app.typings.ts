export interface HeadersToken {
  Authorization: string;
  'Content-Type': string;
}

export interface login {
  username: string;
  password: string;
}

export interface verfiyotp {
  email: string;
  otp: string;
}

export interface Response {
  success?: boolean;
  message: string;
  status: string;
  successMessage: string;
  statusCode: number;
  data: any;
}

export interface paginationFilter {
  skip: number;
  limit: number;
  name?: string;
}

export interface ngSelectList {
  name: string;
  id: string;
  active?: boolean;
}

export interface ngselectNumberList {
  name: string;
  id: number;
}

export interface searchFilter {
  button: boolean;
  placeholder: string;
  output: string;
  keyup: boolean;
  classAdd?: string;
}

export interface pagination {
  length: number;
  pageNumber: number;
  pageSize: number;
}

export interface sildeMenu {
  id: number;
  icon: string;
  title: string;
  routerLink: string;
  permission: boolean;
  name: string;
  subMenu: siblingsMenu[];
  siblings: siblings[];
}

export interface siblingsMenu {
  icon: string;
  title: string;
  routerLink: string;
  permission: boolean;
}
export interface siblings {
  icon: string;
  title: string;
  routerLink: string;
  name: string;
  action: object;
  listingAction: string[];
  crudAction?: crudAction[];
  siblings?: siblings[];
  permission: boolean;
}

export interface crudAction {
  name: string;
  type: string;
}

export interface IParamsGet {
  id: string;
  type: string;
}

export interface language {
  language: string;
  instructions: string[];
  ingredients: string[];
}

export interface languageType {
  name: typeOption;
}

export interface typeOption {
  instructions: string[];
  ingredients: string[];
}

export interface ApiResponse {
  length: number;
  statusCode: number;
  success: boolean;
  message: string;
  status: string;
  successMessage: string;
  errorMessage: string;
  statusDescription: string;
  data: any;
  pagination?: {
    limit: number;
    page: number;
    totalCount: number;
    totalPage: number;
  };
}

export interface IPromises {
  promise: any;
  quantity: number;
  // quantityType: string
}

export interface IPromiseType {
  id: string;
}

export interface ICreateDropDown {
  name: string;
  value: string;
}

export interface splitDropdownInterface {
  split(arg0: string): [any, any];
  name: string;
  value: string;
}

export interface ManageMemberListing {
  page: number;
  limit: number;
  filter?: ManageMemberFilter;
}

export interface ManageMemberFilter {
  code?: number;
  name?: string;
  phoneNumber?: string;
}

export interface NavBarMember {
  page: number;
  limit: number;
  code?: number;
  name?: string;
  phoneNumber?: string;
}

export interface ManageMember {
  code?: number;
  name?: string;
  id: string;
  phoneNumber?: string;
  country: string;
  location?: { address?: string; country?: string; city?: string };
  assignedCoaches?: any;
  profileImage?: string;
  subscriptionState?: string;
  plan?: string;
  planUser?: string;
  dietData?: number;
  exerciseData?: number;
  yogaData?: number;
  mindData?: number;
}
