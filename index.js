const express = require("express")

const mongoose=require("mongoose")
const PersonalModel = require("./models/person")

const app=express()
const port=4000
require('dotenv').config()

mongoose.connect(process.env.DBurl, {useNewUrlParser: true, useUnifiedTopology: true,}).then(()=>{
    app.listen(port, ()=>{
        console.log(`Running on ${port}`)
    })
});

app.post("/add",(req,res)=>{
    let newPerson = PersonalModel({
        name: "Sarra",
        age: 22,
        favouriteFoods: ["pasta"]
    })
    response = newPerson.save();
    res.json(response)
})

// create
const personsArray = [
    {name: "Eya", age: 18, favouriteFoods: ["pasta", "pizza"]},
    {name: "Mariem", age: 30, favouriteFoods: ["tacos"]},
    {name: "Amna", age: 20, favouriteFoods: ["coscous"]}
]

PersonalModel.create(personsArray).then((data)=>{
    console.log(`saved people ${data}`)
}).catch((err)=>{
    console.log(err)
})


// // find

app.get("/find", async(req,res)=>{
    try{
        var dbResponse= await PersonalModel.find({age: {$gt: 25}});
        res.json(dbResponse)
    }catch (error){
        console.log(error);
        res.send(error)
    }
})


// // findOne

app.get("/findone", async(req,res)=>{
    try{
        var dbResponse= await PersonalModel.findOne({favouriteFoods: 'coscous'});
        res.json(dbResponse)
    }catch{
        console.log(error);
        res.send(error)
    }
})

// findById

app.get("/findbyid", async(req,res)=>{
    try{
        var dbResponse= await PersonalModel.findById({_id:"64f8a18619062470f35e3add"});
        res.json(dbResponse)
    }catch{
        console.log(error);
        res.send(error)
    }
})


// Updates by Running Find, Edit, then Save

app.get("/update", async(req,res)=>{
    try{
        var idToUpdate="64f8a18619062470f35e3add";
        var person= await PersonalModel.findById(idToUpdate)
        if (!person) {
            res.status(404).send("Person not found")
        }
        else{
            person.favouriteFoods.push('Hamburger');
            const dbResponse = await person.save();
            console.log(`updated person : ${dbResponse}`);
            res.send("Person Updated succesfully")
        }
    }catch{
        console.log(error);
        res.send(error)
    }
})

// Perform New Updates on a Document Using model.findOneAndUpdate()

app.get("findoneAndUpdate", async(req,res)=>{
    try{
        var nameToUpdate= 'Sarra';
        const person = PersonalModel.findOneAndUpdate(
            {name: nameToUpdate},
            {age: 20},
            {new: true},
        )
        if (!person) {
            res.status(404).send("Person not found")
        }
        else{
            console.log(`updated person : ${person}`)
            res.send("Updated person successfully")
        }
    }catch{
        console.log(error);
        res.send(error)
    }
})


// Delete One Document Using model.findByIdAndRemove
app.get("findIdAndRemove", async(req,res)=>{
    try {
        var idToDelete="64f8a18619062470f35e3add";
        PersonalModel.findByIdAndRemove(idToDelete, (err,data)=>{
            if (err) {
                console.log(err)
            } else {
                console.log(`Deleted Person : ${data}`)
            }
        })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

// MongoDB and Mongoose - Delete Many Documents with model.remove()

app.get("deleteMany", async(req,res)=>{
    try {
        const deletename = "Mary";
        PersonalModel.remove({name: deletename}, (err,data)=>{
            if (err) {
                console.log(err)
            } else {
                console.log(`Deleted : ${data}`)
            }
        })
    } catch (error) {
        console.log(error)
    }
})

// Chain Search Query Helpers to Narrow Search Results
app.get("search", async(req,res)=>{
    try {
        PersonalModel.find({favouriteFoods: "Burritos"})
        .sort('name')
        .limit(2)
        .select('-age')
        .exec((err,data)=>{
            if (err) {
                console.log(err)
            } else {
                console.log(`Query result : ${data}`)
            }
        })
    } catch (error) {
        console.log(error)
    }
})


