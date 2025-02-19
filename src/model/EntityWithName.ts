export interface EntityWithName extends Entity {
  name: string;
}

export interface Entity {
  id: number;
}

export interface Filter {
  name: string;
}
