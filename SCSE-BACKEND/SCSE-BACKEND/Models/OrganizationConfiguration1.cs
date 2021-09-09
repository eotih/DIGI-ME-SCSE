using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SCSE_BACKEND.Models
{
    public class OrganizationConfiguration1
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Field { get; set; }
        public string Phone { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string Address { get; set; }
        public string Logo { get; set; }
        public string Fanpage { get; set; }
        public string Youtube { get; set; }
        public Nullable<int> IDBank { get; set; }
        public string UpdatedByUser { get; set; }
        public Nullable<System.DateTime> UpdatedByDate { get; set; }
    }
}