export default interface ICreateProductDTO {
  category_id: string;
  name: string;
  manufacturingDate: string;
  perishableProduct: boolean;
  expirationDate: string;
  price: number;
}