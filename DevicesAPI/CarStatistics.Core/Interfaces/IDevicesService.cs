using Devices.Core.Models;

namespace Devices.Core.Interfaces
{
    public interface IDevicesService : IEntityService<Device>
    {
        //CarAverageSpeedResultsInDay CalculateAverageSpeedByHourInDay(DateTime searchData);
        //List<Device> FilterBySpeedDatefromDateuntil(int? speed, DateTime? dateFrom, DateTime? dateUntil);
        //Device UpdateCarSpeedStatistic(Device carSpeedStatistic, int id);
    }
}
