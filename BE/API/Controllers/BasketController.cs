using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            return MapBasketDto(basket);
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            //get basket
            var basket = await RetrieveBasket();
            if (basket == null)
            {
                //create basket
                basket = CreateBasket();
            }

            //get product
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();

            //add item
            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return CreatedAtRoute("GetBasket", MapBasketDto(basket));
            }

            return BadRequest(new ProblemDetails { Title = "Problem Saving to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {

            // get basket
            Basket basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            // remove item or reduce quantity

            var product = await _context.Products.FindAsync(productId);

            if (product == null) return NotFound();

            basket.RemoveItem(productId, quantity);


            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return Ok();
            }

            return BadRequest(new ProblemDetails { Title = "Problem Removing product from basket" });
        }

        private BasketDto MapBasketDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                UserId = basket.UserId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    ImageUrl = item.Product.ImageUrl,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    Quantity = item.Quantity,
                }).ToList()
            };
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.UserId == Request.Cookies["userId"]);
        }

        private Basket CreateBasket()
        {
            var userId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };

            Response.Cookies.Append("userId", userId, cookieOptions);

            var basket = new Basket { UserId = userId };
            _context.Baskets.Add(basket);

            return basket;
        }
    }
}