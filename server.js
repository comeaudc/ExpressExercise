const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3003;
const choices = require('./models/magic.js')


const fs = require('fs');
const { parse } = require('path');
app.engine('hypatia', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err)

        const rendered = content.toString()
        .replace('#title#', options.title)
        .replace('#message#', options.message)
        .replace('#message1#', options.message1)
        .replace('#content#', options.content)
        .replace('#question#', options.question)
        .replace('#outcome#', options.outcome)
        .replace('#link#', options.link)

        return callback(null, rendered)
    });
});

app.set('views', './views');
app.set('view engine', 'hypatia');

app.get('/', (req, res) => {
    let bugs;
    if(Math.random() > 0.87){
        bugs = (Math.floor(Math.random() * 10))
        
    }
    else{
        bugs = -1
    }

    res.render('passItAround', {
        title:  `99 Bugs`,
        message:    `99 little bugs in the code!`,
        outcome:    `99 little bugs in the code!`,
        message1:   `99 little buuuugs!!!`,
        content:    `Take one down, patch it around!`,
        link:       `<a href="http://localhost:3000/${99 + bugs}">See how your patch went?</a>`
    })
});

app.get('/:number', (req, res) => {
    let option1 = "See how your patch went?"
    let option2 = "Start Over?"
    let count = parseInt(req.params.number)
    let bugs;

    if(Math.random() > 0.87){
    bugs = (Math.floor(Math.random() * 10))
    
    }
    else{
        bugs = -1
    }
    let next = count + bugs
    if(count > 0){
        res.render('passItAround', {
            title:  `${count} Bugs`,
            message:    `${count} little bugs in the code!`,
            outcome:    `${count} little bugs in the code!`,
            message1:   `${count} little buuuugs!!!`,
            content:    `Take one down, patch it around!`,
            link:       `<a href="http://localhost:3000/${next}">See how your patch went?</a>`
        })        
    }
    else{
        res.render('passItAround', {
            title:  `No More!!`,
            message:    `No more little bugs in the Code!`,
            outcome:    `No more little bugs in the code!`,
            message1:   `No more little buuuugs!!!`,
            content:    `You fixed them all, banged your head on the wall`,
            link:       `<a href="http://localhost:3000/">Patch All The Bugs Again?</a>`
        })
    }

});

app.get('/greeting', (req, res) => {
    res.render('template', {
        title: 'Greetings',
        message: 'Greetings!',
        content: 'Howdy there, Sheriff Stranger!!!!' 
    });
});

app.get('/greeting/:firstName', (req, res) => {
    res.render('template', {
        title: 'Greetings',
        message: 'Greetings!',
        content: `Howdy there, Sheriff ${req.params.firstName}`
    });
});

app.get('/tip/:total/:tipPercentage', (req, res) => {

    let tip = (req.params.total * (req.params.tipPercentage / 100)).toFixed(2)

    res.render('template', {
        title:  'Tip Calc',
        message:    'Tip Calculator',
        content:    `Your ${req.params.tipPercentage}% tip on $${req.params.total} is $${tip}!`
    });
});

app.get('/magic/:question', (req, res) => {
    let fate = choices[Math.floor(Math.random() * (choices.length))]
    let question = (req.params.question).replace("%", ' ').replace('20', '')
     question = question.split('')
    question[0] = question[0].toUpperCase();
    question = question.join('')

    res.render('magic', {
        title:  'Magic8Ball',
        message:    'Magic 8 Ball: What is it you desire?',
        question:   question + '?',   
        content:    fate
    });
});

app.listen(port, () => {
    console.log('I am listening on port', port)
 });