export interface IProduct {
    id: string,
    title: string,
    price: number,
    discountPercentage: number,
    description: string,
    category: string,
    weight: number,
    image: string,
    rating: string | IRating,
    stock: number,
    sku: `${string}-${string}-${string}-${number}`,
    availabilityStatus: string,
    shippingInformation: string,
    warrantyInformation: string,
    reviews: IReviews[],
    minimumOrderQuantity: number,
    returnPolicy: string,
    thumbnail: string,
    meta: {
      createdAt: string,
      updatedAt: string,
      barCode: string,
      qrCode: string
    }
}

interface IRating {
  rate: number,
  count: number
}

interface IReviews {
  rating: number,
  comment: string,
  data: Date
  reviewerName: string,
  reviewerEmail: string,
}

export interface IProductList {
  products: IProduct[],
  total: number,
  skip: number,
  limit: number
}