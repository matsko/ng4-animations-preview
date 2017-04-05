import {Injectable} from '@angular/core';
import {GROUPS} from './groups.data';

@Injectable()
export class GroupsService {
  private _groups = [].concat(GROUPS);

  getAll() {
    return this._groups;
  }

  add(group) {
    this._groups.push(group);
  }

  addImage(title, image): number {
    let group = this._groups.find(grp => grp.title === title);
    if (!group) {
      group = {title, images: []};
      this.add(group);
    }

    const id = timestamp();
    group.images.push({url:image, id});
    return id;
  }
}

function timestamp() {
  return Date.now();
}
