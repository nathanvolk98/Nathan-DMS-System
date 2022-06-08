using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nathan_DMS_System.Data.DTO
{
    public class LoginViewModel
    {
        public string username { get; set; }
        public string password { get; set; }
        public bool? remember_me { get; set; }
    }
}
