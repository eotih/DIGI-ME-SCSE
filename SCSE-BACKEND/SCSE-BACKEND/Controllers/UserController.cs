using SCSE_BACKEND.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace SCSE_BACKEND.Controllers
{
    [System.Web.Http.RoutePrefix("User")]
    public class UserController : ApiController
    {
        SCSE_DBEntities db = new SCSE_DBEntities();
        //------------------ Login -------------------------//
        [System.Web.Http.Route("Login")]
        [System.Web.Http.HttpPost]
        public Response employeeLogin(Login lg)
        {
            if (ModelState.IsValid)
            {
                var f_password = GetMD5(lg.Password);
                var user = db.LoginRoles.Where(s => s.Username.Equals(lg.Username) && s.Password.Equals(f_password)).FirstOrDefault();
                if (user != null)
                {
                    return new UserResponse() { Status = "Success", Message = TokenManager.GenerateToken(user.Fullname, user.RoleName, user.Username, user.Password, user.Email) };
                }
            }
            else
            {
                return new Response { Status = "Fail", Message = "Login Fail" };
            }
            return new Response { Status = "Sai", Message = "Sai" };
        }
        [System.Web.Http.Route("Validate")]
        [System.Web.Http.HttpGet]
        public ResponseVM Validate(string token, string username)
        {
            int UserId = Convert.ToInt32(new UserRepository().GetUser(username));
            if (UserId == null) return new ResponseVM { Status = "Invalid", Message = "Invalid User." };
            string tokenUsername = TokenManager.ValidateToken(token);
            if (username.Equals(tokenUsername))
            {
                return new ResponseVM
                {
                    Status = "Success",
                    Message = "OK",
                };
            }
            return new ResponseVM { Status = "Invalid", Message = "Invalid Token." };
        }

        public static string GetMD5(string str)
        {
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] fromData = Encoding.UTF8.GetBytes(str);
            byte[] targetData = md5.ComputeHash(fromData);
            string byte2String = null;

            for (int i = 0; i < targetData.Length; i++)
            {
                byte2String += targetData[i].ToString("x2");
            }
            return byte2String;
        }
        [System.Web.Http.Route("ThemTaiKhoan")]
        [System.Web.Http.HttpPost]
        public object themTaiKhoan(Account1 acc1)
        {
            if (acc1.IDUser == 0)
            {
                Account acc = new Account();
                acc.IDRole = acc1.IDRole;
                acc.Email = acc1.Email;
                acc.Username = acc1.Username;
                acc.Password = acc1.Password;
                acc.IsActive = acc1.IsActive;
                acc.CreatedByDate = DateTime.Now;
                db.Accounts.Add(acc);
                db.SaveChanges();
                return new Response
                {
                    Status = "Success",
                    Message = "Data Success"
                };
            }
            else
            {
                var obj = db.Accounts.Where(x => x.IDUser == acc1.IDUser).ToList().FirstOrDefault();
                if (obj.IDUser > 0)
                {
                    obj.IDRole = acc1.IDRole;
                    obj.IDUser = acc1.IDUser;
                    obj.Email = acc1.Email;
                    obj.Username = acc1.Username;
                    obj.Password = acc1.Password;
                    obj.IsActive = acc1.IsActive;
                    obj.Phone = acc1.Phone;
                    obj.FullName = acc1.FullName;
                    obj.Image = acc1.Image;
                    obj.Sex = acc1.Sex;
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
        [System.Web.Http.Route("XemDanhSachTaiKhoan")]
        [System.Web.Http.HttpGet]
        public object xemDanhSachTaiKhoan()
        {
            var a = (from acc in db.Accounts
                     from quyen in db.Roles
                     where quyen.IDRole == acc.IDRole

                     select new
                     {
                         acc.IDUser,
                         acc.FullName,
                         quyen.RoleName,
                         acc.Username,
                         acc.Password,
                         acc.Email,
                         acc.CreatedByDate,
                         acc.IsActive,
                         acc.Phone,
                         acc.Image,
                         acc.Sex
                     }).ToList();
            return a;
        }
        // Xóa tài khoản
        [System.Web.Http.Route("XoaTaiKhoan")]
        [System.Web.Http.HttpDelete]
        public object xoaTaiKhoan(int iduser)
        {
            var obj = db.Accounts.Where(x => x.IDUser == iduser).ToList().FirstOrDefault();
            db.Accounts.Remove(obj);
            db.SaveChanges();
            return new Response
            {
                Status = "Delete",
                Message = "Delete Successfuly"
            };
        }
        // getbyID tài khoản
        [System.Web.Http.Route("GetByIdTaiKhoan")]
        [System.Web.Http.HttpGet]
        public object getbyidTaiKhoan(int iduser)
        {
            var obj = db.Accounts.Where(x => x.IDUser == iduser).ToList().FirstOrDefault();
            return obj;
        }
        //--Quyền-----
        //---Thêm quyền-----------
        [System.Web.Http.Route("ThemQuyen")]
        [System.Web.Http.HttpPost]
        public object themQuyen(Role1 quyen)
        {
            if (quyen.IDRole == 0)
            {
                Role role = new Role();
                role.IDRole = quyen.IDRole;
                role.RoleName = quyen.RoleName;
                db.Roles.Add(role);
                db.SaveChanges();
                return new Response
                {
                    Status = "Success",
                    Message = "Data Success"
                };
            }
            else
            {
                return new Response
                {
                    Status = "Error",
                    Message = "Data not insert"
                };
            }

        }
        // Xem danh sách quyền
        [System.Web.Http.Route("XemDanhSachQuyen")]
        [System.Web.Http.HttpGet]
        public object xemDanhSachQuyen()
        {
            var a = db.Roles.ToList();
            return a;
        }
        // Xóa quyền
        [System.Web.Http.Route("XoaQuyen")]
        [System.Web.Http.HttpDelete]
        public object xoaQuyen(int idrole)
        {
            var obj = db.Roles.Where(x => x.IDRole == idrole).ToList().FirstOrDefault();
            db.Roles.Remove(obj);
            db.SaveChanges();
            return new Response
            {
                Status = "Delete",
                Message = "Delete Successfuly"
            };
        }
        // getbyID quyền
        [System.Web.Http.Route("GetByIdQuyen")]
        [System.Web.Http.HttpGet]
        public object getbyIdQuyen(int idrole)
        {
            var obj = db.Roles.Where(x => x.IDRole == idrole).ToList().FirstOrDefault();
            return obj;
        }
        
    }
}