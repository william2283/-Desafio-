import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity({name:"aeronave"})
export class Aeronave {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    nome: string;

    @Column({nullable: false})
    marca: string;

    @Column({nullable: false})
    ano: number;

    @Column({nullable: false})
    descricao: string;

    @Column({nullable: false})
    vendido: boolean;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

}
