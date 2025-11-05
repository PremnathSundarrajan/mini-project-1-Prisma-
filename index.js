const { PrismaClient } = require('@prisma/client')
const express= require('express')
const prisma = new PrismaClient()
const app= express()

app.use(express.json())

app.get('/',async(req,res)=>{
    const data = await prisma.student.findMany()

    console.log(data)

    res.send(data)
})

app.get('/:id',async(req,res)=>{
    const {id}=req.params;
    const data = await prisma.student.findUnique({where:{roll_no:id}})

    console.log(data)
    res.send(data)
})

app.post('/new',async(req,res)=>{
    const data = req.body;
    console.log(data)

    const create= await prisma.student.create({
        data:{roll_no:data.roll_no, name:data.name, dob:data.dob,class:data.class}
    })
    
    const finding = await prisma.student.findUnique({where:{roll_no:data.roll_no}})

    if(finding){
        res.send(finding)
    }
    else{
        res.send("Not created")
    }

    
   
})

app.put('/update',async(req,res)=>{
    const data=req.body;
    console.log(data);
const get=await prisma.student.findUnique({where:{roll_no:data.roll_no}});

if(!get){
    console.log("Not Found")
        res.send("Not found to upd")
    
}
else{
const upd=await prisma.student.update({where:{roll_no:data.roll_no},
    data:{
       
        name:data.name,
        dob:data.dob,
        class:data.class
    }})

    res.json(upd)
}    
    
})

app.patch('/speupd/:id',async(req,res)=>{
    const roll_no = req.params.id;
    const data = req.body;
    const get = await prisma.student.findUnique({where:{roll_no:roll_no}})

    if(!get) res.send("Not found to upd")
    else{
        const upd = await prisma.student.update({where:{roll_no:roll_no},
      data  })

      res.send("updated")
    }    
})

app.delete('/del/:id',async(req,res)=>{
    const roll_no= req.params.id;
    const get = await prisma.student.findUnique({where:{roll_no:roll_no}})

    if(!get) res.send("Not found to del")
    else{
        const del=await prisma.student.delete({where:{roll_no:roll_no}})
        res.send("Deleted")
    }
    
})

app.listen(3000, ()=>{
    console.log("server is running")
})