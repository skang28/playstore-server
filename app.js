const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));


//Web APIs with express assignment 1
app.get('/sum', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    const sum = parseInt(req.query.a) + parseInt(req.query.b);

    const total = `The sum of ${a} and ${b} is ${sum}`;

    res.send(total);
    

});

//Web APIs with express assignment 2
app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = req.query.text;

    if(!text) {
        return res
            .status(400)
            .send('text is required')
    }

    if(!shift) {
        return res
            .status(400)
            .send('shift is required')
    }

    const numShift = parseFloat(shift);
    if(Number.isNaN(numShift)) {
        return res
            .status(400)
            .send('shift must be a number')
    }

    const base = 'A'.charCodeAt(0);

    const cipher = text
        .toUpperCase()
        .split(' ')
        .map(char => {
                const code = char.charCodeAt(0);
                
                if(code < base || code > (base + 26)) {
                    return char;
                }
                
                let diff = code - base;
                diff = diff + numShift;
                diff = diff % 26;
                
                const shiftedChar = String.fromCharCode(base + diff);
                return shiftedChar;
            })
        .join('')
    
        res.status(300).send(cipher);
})

//assignment 3

/*app.get('/lotto', (res, req) => {
    const numbers = req.query;
    const numberCheck = numbers.every(element => {
        return typeof element === 'number'
    });
    
    if(!numbers) {
        res.status(400).send('numbers is required')
    }
    
    if(!numbers.length === 6) {
        res.status(400).send('array must have 6 numbers')
    }

    if(!numberCheck === true) {
        res.status(400).send('array must only include numbers')
    }

    for(let i=0; i<numbers.length; i++) {
        if(numbers[i] < 1 && numbers[i]>20) {
            res.status(400).send('numbers must be between 1 and 20')
        }
    }

    function getRandomNumbers() {
        const randomNumArray = Array.from({length:5}, () => Math.floor(Math.random() * 5));
    }

    const randomNumbers = getRandomNumbers();
    const matches = 0;

    if(numbers.length!=randomNumbers.length) {
        return false;
    }   
    else {
        for (let i=0; i<numbers.length; i++) {
            if(numbers[i]===randomNumbers[i]) {
                matches++
            }
        }
    }

    if(matches < 4) {
        return answer = 'Sorry you lose'
    }

    else if(matches =4) {
        return answer = 'Congrats'
    }

    else if(matches=5) {
        return answer = '100$!'
    }

    else if(matches=6) {
        return answer = 'you win the lotto!'
    }

    res.send(answer);
})*/

app.get('/lotto', (req, res) => {
    const { numbers } = req.query; 
  
    // validation: 
    // 1. the numbers array must exist
    // 2. must be an array
    // 3. must be 6 numbers
    // 4. numbers must be between 1 and 20
  
    if(!numbers) {
      return res
        .status(200)
        .send("numbers is required");
    }
  
    if(!Array.isArray(numbers)) {
      return res
        .status(200)
        .send("numbers must be an array");
    }
  
    const guesses = numbers
          .map(n => parseInt(n))
          .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));
    
    if(guesses.length != 6) {
      return res
        .status(400)
        .send("numbers must contain 6 integers between 1 and 20");
    }      
  
    // fully validated numbers
  
    // here are the 20 numbers to choose from
    const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);
  
    //randomly choose 6
    const winningNumbers = [];
    for(let i = 0; i < 6; i++) {
      const ran = Math.floor(Math.random() * stockNumbers.length);
      winningNumbers.push(stockNumbers[ran]);
      stockNumbers.splice(ran, 1);
    }
  
    //compare the guesses to the winning number
    let diff = winningNumbers.filter(n => !guesses.includes(n));
  
    // construct a response
    let responseText;
  
    switch(diff.length){
      case 0: 
        responseText = 'Wow! Unbelievable! You could have won the mega millions!';
        break;
      case 1:   
        responseText = 'Congratulations! You win $100!';
        break;
      case 2:
        responseText = 'Congratulations, you win a free ticket!';
        break;
      default:
        responseText = 'Sorry, you lose';  
    }
  
  
    //uncomment below to see how the results ran
  
     res.json({
       guesses,
       winningNumbers,
       diff,
       responseText
     });
  
    res.send(responseText);
  });

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});

app.get('/video', (req, res) => {
  const video = {
    title: 'Cats falling over',
    description: '15 minutes of hilarious fun as cats fall over',
    length: '15.40'
  }
  res.json(video);
});

app.get('/grade', (req, res) => {
  // get the mark from the query
  const { mark } = req.query;

  // do some validation
  if (!mark) {
    // mark is required
    return res
      .status(400)
      .send('Please provide a mark');
  }

  const numericMark = parseFloat(mark);
  if (Number.isNaN(numericMark)) {
    // mark must be a number
    return res
      .status(400)
      .send('Mark must be a numeric value');
  }

  if (numericMark < 0 || numericMark > 100) {
    // mark must be in range 0 to 100
    return res
      .status(400)
      .send('Mark must be in range 0 to 100');
  }

  if (numericMark >= 90) {
    return res.send('A');
  }

  if (numericMark >= 80) {
    return res.send('B');
  }

  if (numericMark >= 70) {
    return res.send('C');
  }

  res.send('F');
});