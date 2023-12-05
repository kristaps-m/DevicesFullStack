﻿using Devices.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Devices.Data
{
    public interface IDevicesDbContext
    {
        DbSet<T> Set<T>() where T : class;
        EntityEntry<T> Entry<T>(T entity) where T : class;
        DbSet<Device> Devices { get; set; }
        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}