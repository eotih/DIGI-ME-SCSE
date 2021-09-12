using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SCSE_BACKEND.Models
{
    public class Category1
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Category1()
        {
            this.Posts = new HashSet<Post>();
        }

        public int IDCat { get; set; }
        public string CategoryName { get; set; }
        public string Slug { get; set; }
        public Nullable<int> IDparent { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Post> Posts { get; set; }
    }
}