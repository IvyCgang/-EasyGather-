const express = require('express');
const router = express.Router();
const service = require('../services/users.service')

// 新增使用者（註冊）
// http://163.22.17.145:3000/user/signUp
router.post('/signUp', async (req, res) => {
    console.log(req.body);
    try {
            await service.signUp(req.db, req.body);
        res.status(200).json({ message: '註冊成功' });
    } catch (error) {
        res.status(500).json({ error: '發生錯誤' });
    }
})

//
//// 利用使用者帳號尋找
//// http://163.22.17.145:3000/api/user/getUser
//router.post('/getUser/:account', async (req, res) => {
//   const user = await service.getUser(req.params.account)
//     if (user.length == 0)
//        res.status(404).json('no record with this account: ' + req.params.account)
//    else
//        res.send(user)
//})
//
//
//// 編輯使用者資料
//// http://163.22.17.145:3000/api/user/updateUser
//router.put('/updateUser/:uID', async (req, res) => {
//    const affectedRows = await service.editUser(req.body, req.params.uID)
//        if (affectedRows == 0)
//                res.status(404).json({ message: 'No record with this uID: ' + req.params.uID})
//        else
//                res.send('User information update successfully')
//        })
//
//
//// 刪除使用者
//// http://163.22.17.145:3000/api/user/deleteUser
//router.delete('/deleteUser/:uID', async (req, res) => {
//        const affectedRows = await service.deleteUser(req.params.uID)
//    if (affectedRows == 0)
//         res.status(404).json({ error: 'No record with this uID: ' + req.params.uID });
//
//    else {
//        res.status(200).json({ message: 'Delete user successfully.' });
//    }
//})

module.exports = router;

