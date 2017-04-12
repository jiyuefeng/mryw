import { Pipe, PipeTransform } from '@angular/core';
import {Constants} from '../constants';

@Pipe({name: 'activityStatus'})
export class ActivityStatusPipe implements PipeTransform {

  activityStatus:any = {
    'NOT_AUDIT': '未审核',
    'AUDITED': '已审核',
    'ONLINE': '已上线',
    'OFFLINE': '已结束'
  };

    transform(value: string): number {
        return this.activityStatus[value];
    }
}
