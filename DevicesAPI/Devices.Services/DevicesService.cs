using Devices.Core.Interfaces;
using Devices.Core.Models;
using Devices.Data;

namespace Devices.Services
{
    public class DevicesService: EntityService<Device>, IDevicesService
    {
        public DevicesService(IDevicesDbContext context) : base(context)
        {
            
        }

        public List<Device> GetDevicesFilteredBySearchInput(string? searchValue, bool isOnline)
        {            
            IQueryable<Device> resultQuery = _context.Devices.Where(d => d.IsOnline == isOnline);

            if (searchValue != null)
            {
                searchValue = searchValue.ToLower();
                resultQuery = resultQuery
                    .Where(d =>
                        d.Name.ToLower().Contains(searchValue) ||
                        d.Model.ToLower().Contains(searchValue) ||
                        (IsDateTime(searchValue) ? d.ConnectionStart == Convert.ToDateTime(searchValue) : d.ConnectionStart.ToString().ToLower().Contains(searchValue)) ||
                        d.MessagesRecieved.ToString().Contains(searchValue) ||
                        d.MessagesMaximum.ToString().Contains(searchValue)                                           
                    );
            }

            return resultQuery.ToList();
        }

        public Device UpdateDevice(Device device, int id)
        {
            var deviceToUpdate = _context.Devices.SingleOrDefault(h => h.Id == id);

            if (deviceToUpdate != null)
            {
                deviceToUpdate.Name = device.Name;
                deviceToUpdate.Model = device.Model;
                deviceToUpdate.MessagesRecieved = device.MessagesRecieved;
                deviceToUpdate.MessagesMaximum = device.MessagesMaximum;
                deviceToUpdate.ConnectionStart = device.ConnectionStart;
                deviceToUpdate.IsOnline = device.IsOnline;

                _context.Entry(deviceToUpdate).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.SaveChanges();
            }

            return deviceToUpdate;
        }

        private bool IsDateTime(string date)
        {
            if (string.IsNullOrEmpty(date)) return false;
            return DateTime.TryParse(date, out DateTime dateTime);
        }
    }
}
