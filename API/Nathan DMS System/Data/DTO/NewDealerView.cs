using Nathan_DMS_System.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nathan_DMS_System.Data.DTO
{
    public class NewDealerView
    {
        public string fullname { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string mobile_number { get; set; }
        public bool admin_permission { get; set; }
        public bool remember_me { get; set; }
    }
}
