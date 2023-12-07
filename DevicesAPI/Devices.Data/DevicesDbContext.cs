using Devices.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Devices.Data
{
    public class DevicesDbContext : DbContext, IDevicesDbContext
    {
        public DevicesDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Device> Devices { get; set; }
        public Task<int> SaveChangesAsync()
        {
            return base.SaveChangesAsync();
        }
    }
}
