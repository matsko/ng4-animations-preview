import {Injectable} from '@angular/core';

@Injectable()
export class GroupsService {
  _groups = [
    {
      title: 'group 1',
      images: ['../assets/conf1.jpg', '../assets/logo.svg']
    },
    {
      title: 'group 2',
      images: ['../assets/conf1.jpg']
    }
  ];

  getAll() {
    return this._groups;
  }
}
