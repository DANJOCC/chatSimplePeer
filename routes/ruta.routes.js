const express = require("express");
const router=express.Router();
const{v4:uuidV4} = require('uuid')

router.get('/', (req, res)=>{
    res.render('inicio',{title:'inicio'})
   
})

router.get('/join', (req, res)=>{
    res.redirect(`/room/${req.query.room}`)
})

router.get('/room', (req, res)=>{
    res.redirect(`/room/${uuidV4()}`)
})

router.get('/room/:room', (req, res)=>{
    res.render('room', {roomId:req.params.room})
})

module.exports=router