const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb+srv://mohammad-sawan:0785445606@food-ordering.xbnrd8t.mongodb.net/?retryWrites=true&w=majority").catch(error => console.error(error))
mongoose.connection.on('connected', () => {
    console.log("server is connected")
})


// Schema and mudel 
const postSchema = mongoose.Schema({
    title: String,
    description: String
})

const Post = mongoose.model("posts", postSchema)

app.get('/', (req,res)=>{
    res.send('rexpress is her from router file');
});

app.post('/create', (req,res)=>{
    Post.create({
        title: req.body.title,
        description: req.body.description
    })
    .catch(err => console.log(err));
});

app.get('/posts', (req,res) => {
    Post.find().then(items => res.json(items)).catch(err => console.log(err))
})

app.delete('/delete/:id', (req,res) => {
    Post.findByIdAndDelete({_id: req.params.id})
    .catch(err => console.log(err))
})

app.put("/update/:id", (req,res) => {

    Post.findByIdAndUpdate({_id: req.params.id}, {
        title: req.body.title,
        description: req.body.description
    })
    .catch(err => console.log(err))
})

app.use(morgan('tiny'));
app.listen(3001, ()=>{
    console.log('listening on port 3001');
});