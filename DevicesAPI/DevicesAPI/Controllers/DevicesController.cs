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

        public DevicesController(IDevicesService carSpeedStatisticService)
        {
            _devicescService = carSpeedStatisticService;
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
        public IActionResult UpdateDevice(Device newDevice) // int id,
        {
            var carSpeedStatisticToUpdate = _devicescService.UpdateDevice(newDevice, newDevice.Id);

            if (carSpeedStatisticToUpdate == null)
            {
                return NotFound();
            }

            return Created("", carSpeedStatisticToUpdate);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteDevice(int id)
        {
            var objectToDelete = _devicescService.GetById(id);
            _devicescService.Delete(objectToDelete);

            return Ok($"CarSpeedStatistic with id {id} was deleted!");
        }

        [Route("get-all")]
        [HttpGet]
        public IActionResult GetAllDevices()
        {
            var allCarSpeedStatistic = _devicescService.GetAll();

            return Ok(allCarSpeedStatistic);
        }

        [Route("get-all-filtered")]
        [HttpGet]
        public IActionResult GetAllDevicesFiltered(string? searchValue, bool isOnline)
        {
            var allCarSpeedStatistic = _devicescService.Test(searchValue, isOnline);

            return Ok(allCarSpeedStatistic);
        }
        // https://localhost:5000/api/car-speed-statistics/get-filtered?speed=100&dateFrom=2020-08-20&dateUntil=2020-08-21
        // https://localhost:5000/api/car-speed-statistics/get-filtered?speed=105&dateFrom=&dateUntil=
        //[Route("get-filtered")]
        //[HttpGet]
        //public IActionResult GetBySpeedDatefromDateto(int? speed, DateTime? dateFrom, DateTime? dateUntil)
        //{
        //    var allCarSpeedStatistic = _devicescService
        //        .FilterBySpeedDatefromDateuntil(speed, dateFrom, dateUntil);

        //    return Ok(allCarSpeedStatistic);
        //}

        //[Route("get-avgspeed-bydate")]
        //[HttpGet]
        //public IActionResult GetAllCarSpeedStatisticByDate(DateTime searchByDate)
        //{
        //    var allCarSpeedStatistic = _devicescService.CalculateAverageSpeedByHourInDay(searchByDate);

        //    return Ok(allCarSpeedStatistic);
        //}

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
