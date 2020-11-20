/// <reference path="jquery-3.5.1.js" />

//About button event
$("#aboutLink").on("click", function () {
    //Changing NavBar background Color depends on the user click
    $("#homeLink").removeClass("btn-primary").addClass("btn-outline-dark");
    $("#liveReportsLink").removeClass("btn-primary").addClass("btn-outline-dark");
    $("#aboutLink").removeClass("btn-outline-dark").addClass("btn-primary");

    $(".card-group").hide();
    $(".liveReports").hide();
    clearInterval(IntervalId);
    $(".about").fadeIn("slow");
    $(".progressLoading").hide();
});

//About HTML didn't want to make it hard coded in HTML to make index.html more clean
let aboutHTML = `
<div id="aboutContainer">
    <div class="aboutHTML">
        <h3>Hello Guys</h3>
        <p>My name is Roy Elmakies, </p>
        <p>
            And Welcome! to my Crypto Market Learner <br>
            Here you can learn all about the market price on every Crypto Coin out there!<br>
            I used Coingecko Api the world's most comprehensive crypto currency,<br>
            to give you the most useful info and current price that available!
        </p>
        <p>
            Now lets talk a little about me 😉 <br>
            like I said my name is Roy Elmakies and I'm 23 years old, live in Holon. <br>
            Today I'm at middle of Full Stack Web Development Course at John Bryce Academy, <br>
            My ambition is to become the best developer out there and create my own "instagram" application.
        </p>
        <p>
            Ty for visiting my web have fun marketing and learning about all the coins out there!
        </p>
        <p>Contact Info: <br>
           <a href="https://www.linkedin.com/in/royelmakies/" > <img class="linkedin" src="assets/images/Linkedin.svg.png"> </a> , Email: <a href="mailto:roye456@gmail.com">roye456@gmail.com</a>
        </p>
    </div>
    <div class="aboutHTML"><img class="personalPhoto" src="assets/images/imgOfMe.png"></div>
</div>`;

//Adding aboutHTML variable to about div
$(".about").append(aboutHTML);