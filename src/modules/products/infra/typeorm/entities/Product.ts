import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import Category from "@modules/categories/infra/typeorm/entities/Category";

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  name: string;

  @Column()
  manufacturingDate: string;

  @Column()
  perishableProduct: boolean;

  @Column()
  expirationDate: string;

  @Column()
  price: number;
}

export default Product;