const express = require('express');
const { findById } = require('../models/members');
const Member = require('../models/members')
const router = express.Router()

router.get('/', async (req, res) => {


    try {
        const allMembers = await Member.find();

        console.log(allMembers);


        res.render('members.ejs', { members: allMembers })

    } catch (err) {
        res.status(500).json({ message: err.message })

    }



})


router.get('/newmember', (req, res) => {
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
        console.log(member);
        res.status(201).redirect('/')
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', findSingleMember, async (req, res) => {

    res.render('singlemember.ejs', { member: res.singleMember })

})


router.delete('/:id', findSingleMember, async (req, res) => {

    const deletedMember = await res.singleMember.remove()
    res.redirect('/members')
    console.log(`deleted member is ${deletedMember}`);

})

//middleware to find a single member
async function findSingleMember(req, res, next) {

    let singleMember
    try {
        singleMember = await Member.findById(req.params.id)
        console.log(`Member is ${singleMember}`);
        if (!singleMember) {
            return res.status(404).json("member with this id does not exist")
        }
    }
    catch (err) {

        res.status(500).json({ message: err.message })
    }


    res.singleMember = singleMember
    next();
}
module.exports = router