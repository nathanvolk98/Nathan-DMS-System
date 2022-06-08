using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nathan_DMS_System.Data.Entities
{
    public class Dealer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int dealerid { get; set; }
        public string fullname { get; set; }
        public string username { get; set; }
        public string password { get; set; }     
        public string mobile_number { get; set; }
        public bool admin_permission { get; set; }
        public bool remember_me { get; set; }
        public ICollection<Vehicle> vehicles { get; set; }
        public DateTime date_created { get; set; }
        public DateTime date_modified { get; set; }
    }
}
