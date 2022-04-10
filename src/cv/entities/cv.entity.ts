import { Skill } from "src/skill/entities/skill.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('cv')
export class Cv extends Timestamp {
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


    @ManyToOne(type => User, (user) => user.cvs,{
        eager:true,
        nullable:true,
        cascade:['update','insert']
    })
    user:User

    @ManyToMany(type=>Skill,skill=>skill.cvs,{
        eager:true,
        nullable:true
    })
    skills:Skill[]
}
