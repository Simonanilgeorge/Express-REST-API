const express = require('express')
const Member = require('../models/members')
const router = express.Router()

router.get('/', async (req, res) => {


    try {
        const allMembers = await Member.find();

        res.render('members.ejs', { members: allMembers })

    } catch (err) {
        res.status(500).json({ message: err.message })

    }



})


router.get('/newmember',(req,res)=>{
    res.render('add-member.ejs')
})
router.post('/', async (req, res) => {
    const newMember = new Member({
        name: req.body.name,
        age: req.body.age
    })

    try {

        const member = await newMember.save()
        // res.status(201).json({ member })
        res.status(201).redirect('/')
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const singleMember = await Member.findById(req.params.id)
        console.log(singleMember);
        res.render('singlemember.ejs', { member: singleMember })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }


})

module.exports = router