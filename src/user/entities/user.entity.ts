import { Cv } from "src/cv/entities/cv.entity";
import { TiemstampEntity } from "src/generics/tiemstamp.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User extends TiemstampEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({})
    username:string;

    @Column({})
    email:string;

    @Column({})
    password:string;

    @OneToMany(type => Cv, (cv) => cv.user,{
        eager:true,
        cascade:['insert','update'],
        nullable:true,
    })
    cvs:Cv[]


}
