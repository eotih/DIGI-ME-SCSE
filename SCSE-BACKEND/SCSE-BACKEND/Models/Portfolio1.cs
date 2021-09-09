using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SCSE_BACKEND.Models
{
    public class Portfolio1
    {
        public int ID { get; set; }
        public string FullName { get; set; }
        public Nullable<int> IDImg { get; set; }
        public string Position { get; set; }
        public string Details { get; set; }

    }
}