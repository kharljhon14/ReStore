using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PageList<Product>>> GetProducts(
            [FromQuery] ProductParams productParams
        )
        {
            var query = _context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.searchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();

            var products = await PageList<Product>.ToPageList(
                query,
                productParams.PageNumber,
                productParams.PageSize
            );

            Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return NotFound();

            return product;
        }
    }
}
