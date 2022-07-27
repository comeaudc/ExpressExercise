const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3003;
const fate = require('./models/magic.js')


const fs = require('fs');
app.engine('hypatia', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err)

        const rendered = content.toString()
        .replace('#title#', options.title)
        .replace('#message#', options.message)
        .replace('#content#', options.content)
        .replace('#question#', options.question)

        return callback(null, rendered)
    });
});

app.set('views', './views');
app.set('view engine', 'hypatia');

app.get('/greeting', (req, res) => {
    res.render('template', {
        title: 'Greetings',
        message: 'Greetings!',
        content: 'Howdy there, Sheriff Stranger!!!!' 
    })
});

app.get('/greeting/:firstName', (req, res) => {
    res.render('template', {
        title: 'Greetings',
        message: 'Greetings!',
        content: `Howdy there, Sheriff ${req.params.firstName}`
    }
    )
});

app.get('/tip/:total/:tipPercentage', (req, res) => {

    let tip = (req.params.total * (req.params.tipPercentage / 100)).toFixed(2)

    res.render('template', {
        title:  'Tip Calc',
        message:    'Tip Calculator',
        content:    `Your ${req.params.tipPercentage}% tip on $${req.params.total} is $${tip}!`
    })
});

app.get('/magic/:question', (req, res) => {
    let question = (req.params.question).replace("%", ' ').replace('20', '')
     question = question.split('')
    question[0] = question[0].toUpperCase();
    question = question.join('')

    res.render('magic', {
        title:  'Magic8Ball',
        message:    'Magic 8 Ball: What is it you desire?',
        question:   question + '?',   
        content:    fate
    })
})

app.listen(port, () => {
    console.log('I am listening on port', port)
 });