import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Asilo from "./Asilo";

@Entity("images")
export default class Image {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Asilo, (asilo) => asilo.images)
  @JoinColumn({ name: "asilo_id" })
  asilo: Asilo;
}
