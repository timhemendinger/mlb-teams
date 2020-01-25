export class Player {
    name: string; // "name_first_last"
    position: string; // "primary_position"
    birthdate: string; // "birth_date"
    bats: string; // "bats"
    throws: string // "throws"

    constructor(name: string, position: string, birthdate: string, bats: string, throws: string ) {
        this.name = name;
        this.position = position;
        this.birthdate = birthdate;
        this.bats = bats;
        this.throws = throws;
    }
}