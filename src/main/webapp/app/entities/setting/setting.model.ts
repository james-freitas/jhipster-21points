import { BaseEntity, User } from './../../shared';

export class Setting implements BaseEntity {
    constructor(
        public id?: number,
        public weeklyGoal?: number,
        public weightUnits?: number,
        public user?: User,
    ) {
    }
}
