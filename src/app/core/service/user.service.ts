import { Injectable } from '@angular/core';
import { getApiParamSet } from '../shared/function/function';
import { paginationFilter } from '../shared/typings/app.typings';
import { ApiURL } from './api';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpservice: HttpService) {}

  createdUser(body: any) {
    return this.httpservice.postAll(ApiURL.createUser, body);
  }

  updateUser(body: any, id: string) {
    // If body is FormData, append userId to it
    if (body instanceof FormData) {
      body.append('userId', id);
      body.delete('_id');
      return this.httpservice.postAll(ApiURL.updateUser, body);
    }

    // If body is a regular object, create new object with userId
    const updatePayload = { ...body, userId: id };
    delete updatePayload._id;
    return this.httpservice.postAll(ApiURL.updateUser, updatePayload);
  }

  getUser(params?: paginationFilter) {
    return this.httpservice.getAll(ApiURL.users, getApiParamSet(params));
  }

  deleteUser(userId?: string) {
    const deletePayload = { userId: userId };
    return this.httpservice.deleteWithBody(ApiURL.deleteUser, deletePayload);
  }
}
