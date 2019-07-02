$(document).ready(function () {

    var newArray = [];
    var holder = [];
    var timer = 25;
    var userPick = "";
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;
    var selection;
    var index;

    var interval;
    var running = false;

    var options = [
        {
            question: "The Gang consists of Dennis, Mac, Charlie, Dee & ...?",
            choices: ["Cricket", "Frank", "Dooley", "Schmidty"],
            answer: 1,
            picture: "assets/images/frank.jpg"
        },
        {
            question: "Rickety Cricket's real name is?",
            choices: ["Carl Undergard", "Tim Murphy", "Matthew Mara", "Dylan Toback"],
            answer: 2,
            picture: "assets/images/ricketycricket.jpg"
        },
        {
            question: "What was Mac's Dad Luther's former profession?",
            choices: ["Meth Dealer", "Manager of Jiffy Lube", "Lawyer", "Bartender"],
            answer: 0,
            picture: "assets/images/luther.jpg"
        },
        {
            question: "Who is Dennis & Dee's 'real' father?",
            choices: ["Frank", "Eugene Hamilton", "Bill Ponderosa", "Bruce Mathis"],
            answer: 3,
            picture: "assets/images/brucemathis.jpg"
        },
        {
            question: "Which McPoyle was invited to The Philadelphia Eagles' training camp, only to be shot in the leg by Frank, who was 'tripping balls' on _______?",
            choices: ["Liam;Shrooms", "Doyle;Acid", "Ryan;PCP", "Pappy;Cocaine"],
            answer: 1,
            picture: "assets/images/doylemcpoyle.jpg"
        },
        {
            question: "Charlie & Frank call themselves the '_________'?",
            choices: ["Dynamic Duo", "Terrible Two", "Pigeon Boys", "Gruesome Twosome"],
            answer: 3,
            picture: "assets/images/gruesometwosome.jpg"
        },
        {
            question: "Complete this line from Charlie's musical 'The Nightman Cometh': 'You gotta pay the ________ if you wanna get in that boy's soul'?",
            choices: ["Nightman", "Price", "Troll Toll", "Piper"],
            answer: 2,
            picture: "assets/images/trolltoll.jpg"
        },
        {
            question: "Paddy's Pub is the Home of the Original _______?",
            choices: ["Kitten Mittons", "Gun Shot/Shot Gun", "Fight Milk", "Wolf Cola"],
            answer: 0,
            picture: "assets/"
        },
        {
            question: "Who was Frank's 'One and Only'?",
            choices: ["Bonnie Kelly", "Shadynasty", "The Waitress", "Roxy"],
            answer: 1,
            picture: "assets/images/shadynasty.jpg"
        },
        {
            question: "Who is the father of Dee's baby?",
            choices: ["Mac", "Ben the Soldier", "Rex", "Carmen aka The Tranny"],
            answer: 3,
            picture: "assets/images/carmen.jpg"
        },
        {
            question: "Dennis is the self-proclaimed '_______' of this world?",
            choices: ["King", "Ruler", "Golden God", "Master"],
            answer: 2,
            picture: "assets/images/goldengod.jpg"
        },
        {
            question: "Mac & Charlie's Christmas traditions include: Waiting until Christmas Eve to put up all the decorations, getting blackout drunk, & ...",
            choices: ["Throwing rocks at trains", "Midnight Caroling", "Eating Rum Ham", "Being Bad Asses"],
            answer: 0,
            picture: "assets/images/rocksattrains.jpg"
        }];



    $("#reset").hide();

    $("#begin").on("click", function () {
        $("#begin").hide();
        showQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })

    function runTimer() {
        if (!running) {
            interval = setInterval(decrease, 1000);
            running = true;
        }
    }

    function decrease() {
        $("#timeLeft").html("<h4>Time Left: " + timer + "</h4>");
        timer--;

        if (timer === 0) {
            numUnanswered++;
            stop();
            $("#answers").html("<p>Time's Up Bozo! You Shoulda picked: " + selection.choices[selection.answer] + "</p>");

            hidepicture();

        }
    }

    function stop() {
        running = false;
        clearInterval(interval);
    }

    function showQuestion() {
        index = Math.floor(Math.random() * options.length);
        selection = options[index];
        $("#questions").html("<h2>" + selection.question + "</h2>");
        for (var i = 0; i < selection.choices.length; i++) {
            var userGuess = $("<div>");
            userGuess.addClass("answerchoice");
            userGuess.html(selection.choices[i]);
            userGuess.attr("data-guessvalue", i);
            $("#answers").append(userGuess);
        }
    }

    $(".answerchoice").on("click", function () {
        userPick = parseInt($(this).attr("data-guessvalue"));

        if (userPick === selection.answer) {
            stop();
            numCorrect++;
            userPick = "";
            $("#answers").html("<p>Eyyy Yo! Correct!</p>");

            hidepicture();
        } else {
            stop();
            numIncorrect++;
            userPick = "";
            $("#answers").html("<p>Wrong Answer Jabroni! You shoulda picked: " + selection.choices[selection.answer] + "<?p>");

            hidepicture();
        }

    })


    function hidepicture() {
        $("#answers").append("<img src=" + selection.photo + ">");
        newArray.push(selection);
        options.splice(index, 1);

        setTimeout(function () {
            $("#answers").empty();
            timer = 30;

            if ((numIncorrect + numCorrect + numUnanswered) === options.length) {
                $("#questions").empty();
                $("#questions").html("<h1>You've Peaked all over Philly and it looks like you finally tipped! Let's see how well you know the Gang: </h1>");
                $("#answers").append("<h3> Correct Answers: " + numCorrect + "</h3>");
                $("#answers").append("<h3> Wrong Answers: " + numIncorrect + "</h3>");
                $("#answers").append("<h3> Unanswered Questions: " + numUnanswered + "</h3>");
                $("#reset").show();
                numCorrect = 0;
                numIncorrect = 0;
                numUnanswered = 0;

            } else {
                runTimer();
                showQuestion();

            }
        }, 3000);
    }

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answers").empty();
        $("#questions").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        showQuestion();
    })
})

