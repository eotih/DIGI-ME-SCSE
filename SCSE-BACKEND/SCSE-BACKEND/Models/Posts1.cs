using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SCSE_BACKEND.Models
{
    public class Posts1
    {
        public int IDPost { get; set; }
        public Nullable<int> IDCat { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Details { get; set; }
        public string Image { get; set; }
        public string Video { get; set; }
        public Nullable<System.DateTime> CreatedByDate { get; set; }
        public string Author { get; set; }
        public Nullable<bool> Status { get; set; }

        public virtual Category Category { get; set; }
    }
}