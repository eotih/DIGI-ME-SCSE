using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SCSE_BACKEND.Models
{
    public class Partner1
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Field { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Link { get; set; }
    }
}