using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SCSE_BACKEND.Models
{
    public class UserRepository
    {
        public List<Account1> TestUsers;
        public UserRepository()
        {
            TestUsers = new List<Account1>();
            TestUsers.Add(new Account1() { Username = "Test2", Password = "Pass2" });
            TestUsers.Add(new Account1() { Username = "Test1", Password = "Pass1" });
        }
        public Account1 GetUser(string username)
        {
            try
            {
                return TestUsers.First(user => user.Username.Equals(username));
            }
            catch
            {
                return null;
            }
        }
    }
}