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

        // https://localhost:5000/api/devices/get-all-filtered?searchValue=666
        public List<Device> Test(string? searchValue, bool isOnline)
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

        public List<Device> FilterBySpeedDatefromDateuntil(int? speed, DateTime? dateFrom, DateTime? dateUntil)
        {
            IQueryable<Device> resultQuery = _context.Devices;

            //if (speed.HasValue)
            //{
            //    resultQuery = resultQuery.Where(cSpeedStat => cSpeedStat.CarSpeed >= speed.Value);
            //}

            //if (dateFrom.HasValue)
            //{
            //    resultQuery = resultQuery.Where(cSpeedStat => cSpeedStat.CarSpeedDate.Date >= dateFrom.Value.Date);
            //}

            //if (dateUntil.HasValue)
            //{
            //    resultQuery = resultQuery.Where(cSpeedStat => cSpeedStat.CarSpeedDate.Date <= dateUntil.Value.Date);
            //}
            //// If no filters are provided, return the first 1000 records
            //if (!speed.HasValue && !dateFrom.HasValue && !dateUntil.HasValue)
            //{
            //    resultQuery = resultQuery.Take(1000);
            //}

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
