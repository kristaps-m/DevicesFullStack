using Devices.Core.Models;

namespace Devices.Core.Interfaces
{
    public interface IDevicesService : IEntityService<Device>
    {
        List<Device> Test(string? searchValue, bool isOnline);

        //CarAverageSpeedResultsInDay CalculateAverageSpeedByHourInDay(DateTime searchData);
        //List<Device> FilterBySpeedDatefromDateuntil(int? speed, DateTime? dateFrom, DateTime? dateUntil);
        Device UpdateDevice(Device device, int id);
    }
}
