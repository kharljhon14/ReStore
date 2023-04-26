using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
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
            Basket basket = await RetrieveBasket(GetUserId());
            if (basket == null)
                return NotFound();
            return basket.MapBasketDto();
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            //get basket
            var basket = await RetrieveBasket(GetUserId());
            if (basket == null)
            {
                //create basket
                basket = CreateBasket();
            }

            //get product
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
                return NotFound();

            //add item
            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return CreatedAtRoute("GetBasket", basket.MapBasketDto());
            }

            return BadRequest(new ProblemDetails { Title = "Problem Saving to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // get basket
            Basket basket = await RetrieveBasket(GetUserId());
            if (basket == null)
                return NotFound();

            // remove item or reduce quantity

            var product = await _context.Products.FindAsync(productId);

            if (product == null)
                return NotFound();

            basket.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return Ok();
            }

            return BadRequest(
                new ProblemDetails { Title = "Problem Removing product from basket" }
            );
        }

        private async Task<Basket> RetrieveBasket(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                Response.Cookies.Delete("userId");
                return null;
            }

            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.UserId == userId);
        }

        private string GetUserId()
        {
            return User.Identity?.Name ?? Request.Cookies["userId"];
        }

        private Basket CreateBasket()
        {
            var userId = User.Identity?.Name;

            if (string.IsNullOrEmpty(userId))
            {
                userId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions
                {
                    IsEssential = true,
                    Expires = DateTime.Now.AddDays(30)
                };

                Response.Cookies.Append("userId", userId, cookieOptions);
            }

            var basket = new Basket { UserId = userId };
            _context.Baskets.Add(basket);

            return basket;
        }
    }
}
