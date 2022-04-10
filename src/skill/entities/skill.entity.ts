import { Cv } from "src/cv/entities/cv.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('skill')
export class Skill {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({})
    designation:string;

    @ManyToMany(type=>Cv,(cv)=>cv.skills)
    cvs:Cv[];
}
