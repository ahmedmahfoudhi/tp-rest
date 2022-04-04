import { TiemstampEntity } from "src/generics/tiemstamp.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cv')
export class Cv extends TiemstampEntity{
    
}
