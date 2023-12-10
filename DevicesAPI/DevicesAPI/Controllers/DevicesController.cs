using Devices.Core.Interfaces;
using Devices.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace DevicesAPI.Controllers
{
    [Route("api/devices")]
    [ApiController]
    public class DevicesController : ControllerBase
    {
        private readonly IDevicesService _devicescService;

        public DevicesController(IDevicesService deviceService)
        {
            _devicescService = deviceService;
        }

        [Route("add")]
        [HttpPost]
        public IActionResult AddDevice(Device device)
        {
            _devicescService.Create(device);

            return Ok(device);
        }

        [Route("update")]
        [HttpPut]
        public IActionResult UpdateDevice(Device newDevice)
        {
            var deviceToUpdate = _devicescService.UpdateDevice(newDevice, newDevice.Id);

            if (deviceToUpdate == null)
            {
                return NotFound();
            }

            return Created("", deviceToUpdate);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteDevice(int id)
        {
            var objectToDelete = _devicescService.GetById(id);
            _devicescService.Delete(objectToDelete);

            return Ok($"Device with id {id} was deleted!");
        }

        [Route("get-all")]
        [HttpGet]
        public IActionResult GetAllDevices()
        {
            var allDevices = _devicescService.GetAll();

            return Ok(allDevices);
        }

        // https://localhost:5000/api/devices/get-all-filtered?searchValue=TX&isOnline=true
        [Route("get-all-filtered")]
        [HttpGet]
        public IActionResult GetAllDevicesFiltered(string? searchValue, bool isOnline)
        {
            var allFilteredDevices = _devicescService.GetDevicesFilteredBySearchInput(searchValue, isOnline);

            return Ok(allFilteredDevices);
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetOneDevice(int id)
        {
            var device = _devicescService.GetById(id);

            if (device == null)
            {
                return NotFound();
            }

            return Ok(device);
        }
    }
}
