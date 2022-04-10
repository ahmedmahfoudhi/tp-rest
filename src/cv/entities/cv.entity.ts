import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Cv {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({})
    name:string;

    @Column({})
    firstname:string;

    @Column({})
    age:number;

    @Column({
        length: 8
    })
    cin:string;

    @Column({})
    job:string;

    @Column({})
    path:string;
}
