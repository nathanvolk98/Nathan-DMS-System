using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nathan_DMS_System.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nathan_DMS_System.Data
{
    public class DMSDbContext : DbContext
    {
        public DMSDbContext(DbContextOptions<DMSDbContext> options) : base(options) { }
        public DbSet<Dealer> Dealer { get; set; }
        public DbSet<Prospect> Prospect { get; set; }
        public DbSet<Vehicle> Vehicle { get; set; }
        public DbSet<Tags> Tags { get; set; }
        public DbSet<Specification> Specification { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vehicle>()
                .HasOne(v => v.dealer)
                .WithMany(d => d.vehicles)
                .HasForeignKey(v => v.dealerid);

            modelBuilder.Entity<Prospect>()
               .HasOne(v => v.vehicle)
               .WithMany(p => p.prospects);

/*            modelBuilder.Entity<Specification>()
            .HasOne(s => s.vehicle)
            .WithOne(v => v.specification);*/
        }
    }
}
