using Devices.Core.Models;

namespace Devices.Core.Interfaces
{
    public interface IDevicesService : IEntityService<Device>
    {
        List<Device> GetDevicesFilteredBySearchInput(string? searchValue, bool isOnline);
        Device UpdateDevice(Device device, int id);
    }
}
