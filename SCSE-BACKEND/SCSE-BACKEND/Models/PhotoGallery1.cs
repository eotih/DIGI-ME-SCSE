using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SCSE_BACKEND.Models
{
    public class PhotoGallery1
    {
        public int ID { get; set; }
        public Nullable<int> IDCat { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Image { get; set; }
        public Nullable<System.DateTime> CreatedByDate { get; set; }
        public string UpdatedByDate { get; set; }

        public virtual Category Category { get; set; }
    }
}