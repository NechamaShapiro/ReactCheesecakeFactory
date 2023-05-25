using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactCheesecakeFactory.Data
{
    public class OrdersRepository
    {
        private readonly string _connectionString;
        public OrdersRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Order> GetOrders()
        {
            using var context = new CheesecakeDataContext(_connectionString);
            return context.Orders.ToList();
        }
        public void AddOrder(Order order)
        {
            using var context = new CheesecakeDataContext(_connectionString);
            context.Orders.Add(order);
            context.SaveChanges();
        }
        public Order GetOrder(int id)
        {
            using var context = new CheesecakeDataContext(_connectionString);
            return context.Orders.FirstOrDefault(o => o.Id == id);
        }
    }
}
