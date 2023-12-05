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
        public IActionResult AddCarSpeedStatistic(Device carSpeedStatistic)
        {
            _devicescService.Create(carSpeedStatistic);

            return Ok(carSpeedStatistic);
        }

        //[Route("{id}")]
        //[HttpPut]
        //public IActionResult UpdateCarSpeedStatistic(int id, Device newCarSpeedStatistic)
        //{
        //    var carSpeedStatisticToUpdate = _devicescService.UpdateCarSpeedStatistic(newCarSpeedStatistic, id);

        //    if (carSpeedStatisticToUpdate == null)
        //    {
        //        return NotFound();
        //    }

        //    return Created("", carSpeedStatisticToUpdate);
        //}

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteCarSpeedStatistic(int id)
        {
            var objectToDelete = _devicescService.GetById(id);
            _devicescService.Delete(objectToDelete);

            return Ok($"CarSpeedStatistic with id {id} was deleted!");
        }

        [Route("get-all")]
        [HttpGet]
        public IActionResult GetAllCarSpeedStatistic()
        {
            var allCarSpeedStatistic = _devicescService.GetAll();

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
        public IActionResult GetOneCarSpeedStatistic(int id)
        {
            var carSpeedStatistic = _devicescService.GetById(id);

            if (carSpeedStatistic == null)
            {
                return NotFound();
            }

            return Ok(carSpeedStatistic);
        }
    }
}
