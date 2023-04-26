using API.DTOs;
using API.Entities;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketDto(this Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                UserId = basket.UserId,
                Items = basket.Items
                    .Select(
                        item =>
                            new BasketItemDto
                            {
                                ProductId = item.ProductId,
                                Name = item.Product.Name,
                                Price = item.Product.Price,
                                ImageUrl = item.Product.ImageUrl,
                                Brand = item.Product.Brand,
                                Type = item.Product.Type,
                                Quantity = item.Quantity,
                            }
                    )
                    .ToList()
            };
        }
    }
}
