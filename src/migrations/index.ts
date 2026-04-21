import * as migration_20260421_051827_initial from './20260421_051827_initial';

export const migrations = [
  {
    up: migration_20260421_051827_initial.up,
    down: migration_20260421_051827_initial.down,
    name: '20260421_051827_initial'
  },
];
