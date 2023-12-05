﻿using Devices.Core.Interfaces;
using Devices.Core.Models;
using Devices.Data;

namespace Devices.Services
{
    public class DevicesService: EntityService<Device>, IDevicesService
    {
        public DevicesService(IDevicesDbContext context) : base(context)
        {
            
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

        //public CarAverageSpeedResultsInDay CalculateAverageSpeedByHourInDay(DateTime dayToGetAvgSpeedResults)
        //{
        //    var result = new CarAverageSpeedResultsInDay
        //    {
        //        DateAvgSpeedIsSearched = dayToGetAvgSpeedResults,
        //        ResultEachHour = new List<SpeedResultEachHour>()
        //    };

        //    var hourlySpeeds = _context.Devices
        //        .Where(carSpeedStat => carSpeedStat.CarSpeedDate.Date == dayToGetAvgSpeedResults.Date)
        //        .GroupBy(carSpeedStat => carSpeedStat.CarSpeedDate.Hour)
        //        .Select(group => new
        //        {
        //            Hour = group.Key,
        //            AvgSpeed = Math.Round(group.Average(stat => stat.CarSpeed), 2)
        //        })
        //        .ToList();

        //    if (hourlySpeeds.Count == 0)
        //    {
        //        // For each hour of day from 0:00 to 23:00
        //        for (int i = 0; i <= 23; i++)
        //        {
        //            result.ResultEachHour.Add(new SpeedResultEachHour(i, 0));
        //        }
        //    }
        //    else
        //    {
        //        foreach (var hourlySpeed in hourlySpeeds)
        //        {
        //            result.ResultEachHour.Add(new SpeedResultEachHour(hourlySpeed.Hour, hourlySpeed.AvgSpeed));
        //        }
        //    }

        //    return result;
        //}

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
    }
}
