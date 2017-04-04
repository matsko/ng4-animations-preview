import {Injectable} from '@angular/core';

@Injectable()
export class GroupsService {
  _groups = [
    {
      title: 'group 1',
      images: ['../assets/conf1.jpg', '../assets/conf1.jpg']
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
