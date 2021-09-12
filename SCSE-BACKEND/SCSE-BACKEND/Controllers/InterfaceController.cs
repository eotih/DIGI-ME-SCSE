using SCSE_BACKEND.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Data.Entity;
using System.Web.Http;
//using System.Web.Mvc;

namespace SCSE_BACKEND.Controllers
{
    [RoutePrefix("Api/Interface")]
    public class InterfaceController : ApiController
    {
        //Nội Dung Trang Chủ 
        SCSE_DBEntities db = new SCSE_DBEntities();
        //Dữ liệu ban giám đốc 
        [Route("EditPortfolio")]
        [HttpPost]
        public object editPortfolio(Portfolio1 po1)
        {
            Portfolio po = new Portfolio();
            try
            {
                var obj = db.Portfolios.Where(x => x.ID == po1.ID).ToList().FirstOrDefault();
                if (obj.ID > 0)
                {
                    po.FullName = po1.FullName;
                    po.Position = po1.Position;
                    po.Details = po1.Details;
                    db.SaveChanges();
                    return new Response
                    {
                        Status = "Updated",
                        Message = "Updated Successfully"
                    };
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }
            return new Response
            {
                Status = "Error",
                Message = "Data not insert"
            };
        }

        [Route("GetbyIdPortfolio")]
        [HttpGet]
        public object getbyIdPortfolio(int id)
        {
            var obj = db.Portfolios.Where(x => x.ID == id).ToList().FirstOrDefault();
            return obj;
        }

        [Route("EditImagePortfolio")]
        [HttpPost]
        public object editImagePortfolio(ImgPortfolio1 imgpo1)
        {
            try
            {
                if (imgpo1.ID == 0)
                {
                    ImgPortfolio imgpo = new ImgPortfolio();
                    imgpo.IDImg = imgpo1.IDImg;
                    imgpo.ImagePortfolio = imgpo1.ImagePortfolio;
                    db.ImgPortfolios.Add(imgpo);
                    db.SaveChanges();
                    return new Response
                    {
                        Status = "Success",
                        Message = "Data Successfully"
                    };
                }
                else
                {
                    var obj = db.ImgPortfolios.Where(x => x.ID == imgpo1.ID).ToList().FirstOrDefault();
                    if (obj.ID > 0)
                    {
                        obj.ImagePortfolio = imgpo1.ImagePortfolio;
                        db.SaveChanges();
                        return new Response
                        {
                            Status = "Updated",
                            Message = "Updated Successfully"
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }
            return new Response
            {
                Status = "Error",
                Message = "Data not insert"
            };
        }

        [Route("GetbyIdimgPortfolio")]
        [HttpGet]
        public object getImagePortfolio(int IDimg)
        {
            var obj = db.ImgPortfolios.Where(x => x.IDImg == IDimg).ToList();
            return obj;
        }

        //Thông tin tổ chức 
        [Route("EditInfoOrganization")]
        [HttpPost]
        public object editInfoOrganization(OrganizationConfiguration1 oc1)
        {
            OrganizationConfiguration oc = new OrganizationConfiguration();
            try
            {
                var obj = db.OrganizationConfigurations.Where(x => x.ID == oc1.ID).ToList().FirstOrDefault();
                if (obj.ID > 0)
                {
                    obj.Name = oc1.Name;
                    obj.Field = oc1.Field;
                    obj.Phone = oc1.Phone;
                    obj.Email = oc1.Email;
                    obj.Address = oc1.Address;
                    obj.Logo = oc1.Logo;
                    obj.Fanpage = oc1.Fanpage;
                    obj.Youtube = oc1.Youtube;
                    obj.UpdatedByUser = oc1.UpdatedByUser;
                    obj.UpdatedByDate = DateTime.Now;
                    db.SaveChanges();
                    return new Response
                    {
                        Status = "Updated",
                        Message = "Updated Successfully"
                    };
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }
            return new Response
            {
                Status = "Error",
                Message = "Data not insert"
            };
        }

        // getbyID OrganizationConfigurations
        [Route("GetbyIdInfoOrganization")]
        [HttpGet]
        public object getbyIdInfoOrganization(int ID)
        {
            var obj = db.OrganizationConfigurations.Where(x => x.ID == ID).ToList().FirstOrDefault();
            return obj;
        }

        //  Thêm/Sửa Thông Tin Ngân Hàng 
        [Route("AddOrEditBankInfo")]
        [HttpPost]
        public object addOreditBankin(BankInformation1 bank1)
        {
            if (bank1.ID == 0)
            {
                BankInformation bank = new BankInformation();
                bank.IDBank = 1;
                bank.ImageQR = bank1.ImageQR;
                db.BankInformations.Add(bank);
                db.SaveChanges();
                return new Response
                {
                    Status = "Success",
                    Message = "Data Successfully"
                };
            }
            else
            {
                var obj = db.BankInformations.Where(x => x.ID == bank1.ID).ToList().FirstOrDefault();
                if (obj.ID > 0)
                {
                    obj.ImageQR = bank1.ImageQR;
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

        // getbyID OrganizationConfigurations
        [Route("GetbyIdBankInfo")]
        [HttpGet]
        public object getbyIdBankInfo(int idbank)
        {
            var obj = db.BankInformations.Where(x => x.IDBank == idbank).ToList();
            return obj;
        }
        [Route("GetByID")]
        [HttpGet]
        public object getByIDBank(int id)
        {
            var obj = db.BankInformations.Where(x => x.ID == id).ToList().FirstOrDefault();
            return obj;
        }
        //Xóa thông tin ngân hàng 
        [Route("DeleteBankInfo")]
        [HttpDelete]
        public object deleteBankInfo(int ID)
        {
            var obj = db.BankInformations.Where(x => x.ID == ID).ToList().FirstOrDefault();
            db.BankInformations.Remove(obj);
            db.SaveChanges();
            return new Response
            {
                Status = "Delete",
                Message = "Delete Successfuly"
            };
        }

        //Thông Tin Đối Tác 
        [Route("AddOrEditPartner")]
        [HttpPost]
        public object addoreditPartner(Partner1 pn1)
        {
            if (pn1.ID == 0)
            {
                Partner pn = new Partner();
                pn.Name = pn1.Name;
                pn.Image = pn1.Image;
                pn.Field = pn1.Field;
                pn.Phone = pn1.Phone;
                pn.Email = pn1.Email;
                pn.Address = ReplaceSpecialChars(pn1.Address);
                pn.Link = pn1.Link;
                db.Partners.Add(pn);
                db.SaveChanges();
                return new Response
                {
                    Status = "Success",
                    Message = "Data Successfuly"
                };
            }
            else
            {
                var obj = db.Partners.Where(x => x.ID == pn1.ID).ToList().FirstOrDefault();
                if (obj.ID > 0)
                {
                    obj.Name = pn1.Name;
                    obj.Image = pn1.Image;
                    obj.Field = pn1.Field;
                    obj.Phone = pn1.Phone;
                    obj.Email = pn1.Email;
                    obj.Address = pn1.Address;
                    obj.Link = pn1.Link;
                    db.SaveChanges();
                    return new Response
                    {
                        Status = "Updated",
                        Message = "Updated Successfuly"
                    };
                }
            }
            return new Response
            {
                Status = "Error",
                Message = "Data not insert"
            };
        }

        [Route("GetByIdPartner")]
        [HttpGet]
        public object getbyidPartner(int ID)
        {
            var partner = db.Partners.Where(x => x.ID == ID).ToList().FirstOrDefault();
            return partner;
        }

        [Route("ListPartner")]
        [HttpGet]
        public object listPartner()
        {
            var partner = db.Partners.ToList();
            return partner;
        }

        [Route("DeletePartner")]
        [HttpDelete]
        public object deletePartner(int ID)
        {
            var partner = db.Partners.Where(x => x.ID == ID).ToList().FirstOrDefault();
            db.Partners.Remove(partner);
            db.SaveChanges();
            return new Response
            {
                Status = "Delete",
                Message = "Delete Successfuly"
            };
        }

        //Thông tin liên hệ 
        [Route("AddOrEditContact")]
        [HttpPost]
        public object addorupdateContact(Contact1 ct1)
        {
            if (ct1.ID == 0)
            {
                Contact ct = new Contact();
                ct.FirstName = ct1.FirstName;
                ct.LastName = ct1.LastName;
                ct.Phone = ct1.Phone;
                ct.Email = ct1.Email;
                ct.Details = ct1.Details;
                ct.CreatedByDate = DateTime.Now;
                db.Contacts.Add(ct);
                db.SaveChanges();
                return new Response
                {
                    Status = "Success",
                    Message = "Data Successfuly"
                };
            }
            else
            {
                var contact = db.Contacts.Where(x => x.ID == ct1.ID).ToList().FirstOrDefault();
                if (ct1.ID > 0)
                {
                    contact.FirstName = ct1.FirstName;
                    contact.LastName = ct1.LastName;
                    contact.Phone = ct1.Phone;
                    contact.Email = ct1.Email;
                    contact.Details = ct1.Details;
                    contact.UpdatedByDate = DateTime.Now;
                    db.SaveChanges();
                    return new Response
                    {
                        Status = "Updated",
                        Message = "Updated Successfuly"
                    };
                }
            }
            return new Response
            {
                Status = "Error",
                Message = "Data not insert"
            };
        }

        [Route("ListCategory")]
        [HttpGet]
        public object listCategory()
        {
            var cate = db.Categories.ToList();
            return cate;
        }

        [Route("GetByIdCategory")]
        [HttpGet]
        public object getbyidCategory(int ID)
        {
            var category = db.Categories.Where(x => x.IDCat == ID).ToList().FirstOrDefault();
            return category;
        }

        [Route("GetByIdParentCategory")]
        [HttpGet]
        public object getbyidParentCategory(int ID)
        {
            var category = db.Categories.Where(x => x.IDparent == ID).ToList().FirstOrDefault();
            return category;
        }

        //Thư Viện 
        [Route("AddOrEditPhotoGallery")]
        [HttpPost]
        public object addoreditPhotoGallery(PhotoGallery1 photo1)
        {
            if (photo1.ID == 0)
            {
                PhotoGallery photo = new PhotoGallery
                {
                    IDCat = photo1.IDCat,
                    Title = photo1.Title,
                    Slug = photo1.Slug,
                    Image = photo1.Image,
                    CreatedByDate = DateTime.Now
                };
                db.PhotoGalleries.Add(photo);
                db.SaveChanges();
                return new Response
                {
                    Status = "Success",
                    Message = "Data successfuly"
                };
            }
            return new Response
            {
                Status = "Error",
                Message = "Data not insert"
            };
        }

        [Route("ListPhoto")]
        [HttpGet]
        public object listPhoto()
        {
            var photo = db.PhotoGalleries.ToList();
            return photo;
        }

        [Route("GetBySlugGallery")]
        [HttpGet]
        public object getbySlugGallery(string slug)
        {
            var category = db.PhotoGalleries.Where(x => x.Slug == slug).ToList();
            return category;
        }

        public static string ReplaceSpecialChars(string str)
        {
            string[] chars = new string[] { " ", ",", ".", "/", "!", "@", "#", "$", "%", "^", "&", "*", "'", "\"", ";", "_", "(", ")", ":", "|", "[", "]" };
            for (int i = 0; i < chars.Length; i++)
            {
                if (str.Contains(chars[i]))
                {
                    str = str.Replace(chars[i], "-");
                }
            }
            return str;
        }
    }
}