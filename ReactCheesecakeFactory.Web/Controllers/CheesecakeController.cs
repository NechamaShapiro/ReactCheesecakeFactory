using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactCheesecakeFactory.Data;
using System;

namespace ReactCheesecakeFactory.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheesecakeController : ControllerBase
    {
        private string _connectionString;

        public CheesecakeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpGet]
        [Route("getorders")]
        public List<Order> GetOrders()
        {
            var repo = new OrdersRepository(_connectionString);
            return repo.GetOrders();
        }
        [HttpPost]
        [Route("placeorder")]
        public void PlaceOrder(Order order)
        {
            var repo = new OrdersRepository(_connectionString);
            repo.AddOrder(order);
        }

        [HttpGet]
        [Route("orderdetails")]
        public Order OrderDetails(int id)
        {
            var repo = new OrdersRepository(_connectionString);
            return repo.GetOrder(id);
        }

    }
}
