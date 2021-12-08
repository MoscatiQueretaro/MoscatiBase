import { BaseEntity } from '../../utils/models/base-damner-entity';

export class ThemeModel implements BaseEntity {
  constructor(public id?: any, public descripcion?: string) {}
}
