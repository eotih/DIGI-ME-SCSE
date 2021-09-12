using SCSE_BACKEND.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace SCSE_BACKEND.Controllers
{
    [System.Web.Http.RoutePrefix("Management")]
    public class ManagementController : ApiController
    {
        SCSE_DBEntities db = new SCSE_DBEntities();
        public string Init_SlugName(string text)
        {
            for (int i = 32; i < 48; i++)
            {

                text = text.Replace(((char)i).ToString(), " ");

            }
            text = text.Replace(".", "-");

            text = text.Replace(" ", "-");

            text = text.Replace(",", "-");

            text = text.Replace(";", "-");

            text = text.Replace(":", "-");

            Regex regex = new Regex(@"\p{IsCombiningDiacriticalMarks}+");

            string strFormD = text.Normalize(System.Text.NormalizationForm.FormD);

            return regex.Replace(strFormD, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');

        }
        [System.Web.Http.Route("ThemBaiViet")]
        [System.Web.Http.HttpPost]
        public object themBaiViet(Posts1 posts1)
        {
            if (posts1.IDPost == 0)
            {
                Post post = new Post
                {
                    IDCat = posts1.IDCat,
                    Title = posts1.Title,
                    Slug = Init_SlugName(posts1.Title),
                    Details = posts1.Details,
                    Image = posts1.Image,
                    Video = posts1.Video,
                    Status = posts1.Status,
                    Author = posts1.Author,
                    CreatedByDate = DateTime.Now
                };
                db.Posts.Add(post);
                db.SaveChanges();
                return new Response
                {
                    Status = "Success",
                    Message = "Data Success"
                };
            }
            else
            {
                var obj = db.Posts.Where(x => x.IDPost == posts1.IDPost).ToList().FirstOrDefault();
                if (obj.IDPost > 0)
                {
                    obj.IDCat = posts1.IDCat;
                    obj.Title = posts1.Title;
                    obj.Slug = posts1.Slug;
                    obj.Details = posts1.Details;
                    obj.Image = posts1.Image;
                    obj.Video = posts1.Video;
                    obj.Status = posts1.Status;
                    obj.Author = posts1.Author;
                    obj.CreatedByDate = DateTime.Now;
                    db.SaveChanges();
                    return new Response
                    {
                        Status = "Updated",
                        Message = "Updated Successfully"
                    };
                }
            }
            return new Response
            {
                Status = "Error",
                Message = "Data not insert"
            };
        }
        // Xem danh sách tài khoản
        [System.Web.Http.Route("XemDanhSachBaiViet")]
        [System.Web.Http.HttpGet]
        public object xemDanhSachBaiViet()
        {
            var a = (from posts in db.Posts
                     from cat in db.Categories
                     where cat.IDCat == posts.IDCat

                     select new
                     {
                         posts.IDPost,
                         posts.IDCat,
                         posts.Title,
                         posts.Slug,
                         posts.Details,
                         posts.Image,
                         posts.Video,
                         posts.CreatedByDate,
                         posts.Author,
                         posts.Status,
                         cat.CategoryName
                     }).ToList();
            return a;
        }
        // Xóa bài viết
        [System.Web.Http.Route("XoaBaiViet")]
        [System.Web.Http.HttpDelete]
        public object xoaBaiViet(int idposts)
        {
            var obj = db.Posts.Where(x => x.IDPost == idposts).ToList().FirstOrDefault();
            db.Posts.Remove(obj);
            db.SaveChanges();
            return new Response
            {
                Status = "Delete",
                Message = "Delete Successfuly"
            };
        }
        // getbyID bài viết
        [System.Web.Http.Route("GetByIdBaiViet")]
        [System.Web.Http.HttpGet]
        public object getbyidBaiViet(int idposts)
        {
            var obj = db.Posts.Where(x => x.IDPost == idposts).ToList().FirstOrDefault();
            return obj;
        }
        //---Đăng kí internship or volunteer
        [System.Web.Http.Route("DangKiThamGia")]
        [System.Web.Http.HttpPost]
        public object DangKiThamGia(Volunteer1 vol1)
        {
            if (vol1.ID == 0)
            {
                Volunteer vol = new Volunteer();
                vol.ID = vol1.ID;
                vol.FirstName = vol1.FirstName;
                vol.LastName = vol1.LastName;
                vol.DOB = vol1.DOB;
                vol.Phone = vol1.Phone;
                vol.Email = vol1.Email;
                vol.Address = vol1.Address;
                vol.Purpose = vol1.Purpose;
                vol.Project = vol1.Project;
                vol.Status = vol1.Status;
                db.Volunteers.Add(vol);
                db.SaveChanges();
                return new Response
                {
                    Status = "Success",
                    Message = "Data Success"
                };
            }
            else
            {
                var obj = db.Volunteers.Where(x => x.ID == vol1.ID).ToList().FirstOrDefault();
                if (obj.ID > 0)
                {
                    obj.Status = vol1.Status;
                    db.SaveChanges();
                    return new Response
                    {
                        Status = "Updated",
                        Message = "Updated Successfully"
                    };
                }
            }
            return new Response
            {
                Status = "Error",
                Message = "Data not insert"
            };
        }
        // Xem danh sách bài viết
        [System.Web.Http.Route("XemDanhSachDangKy")]
        [System.Web.Http.HttpGet]
        public object xemDanhSachDangKy()
        {
            var a = db.Volunteers.ToList();
            return a;
        }
        // Xóa bài viết
        [System.Web.Http.Route("XoaNguoiDangKy")]
        [System.Web.Http.HttpDelete]
        public object xoaNguoiDangKy(int id)
        {
            var obj = db.Volunteers.Where(x => x.ID == id).ToList().FirstOrDefault();
            db.Volunteers.Remove(obj);
            db.SaveChanges();
            return new Response
            {
                Status = "Delete",
                Message = "Delete Successfuly"
            };
        }
        // getbyID bài viết
        [System.Web.Http.Route("GetByIdNguoiDangKy")]
        [System.Web.Http.HttpGet]
        public object getbyidNguoiDangKy(int id)
        {
            var obj = db.Volunteers.Where(x => x.ID == id).ToList().FirstOrDefault();
            return obj;
        }

    }
}