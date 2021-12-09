import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Blog } from '../models/blog.model';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, AfterViewChecked{
  blogExample: Blog = {
    title: '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
    author: 'Stephon Gant',
    date: Date.now(),
    blurb: 'This is the story all about how my life got flipped turned upside-down',
    bodyText: `Verse 1
    Now this is a story all about how
    My life got flipped turned upside down
    And I'd like to take a minute, just sit right there
    I'll tell you how I became the prince of a town called Bel-Air

    /[Verse 2]
    In West Philadelphia born and raised
    On the playground is where I spent most of my days
    Chillin' out, maxin', relaxin' all cool
    And all shootin' some b-ball outside of the school
    When a couple of guys who were up to no good
    Started makin' trouble in my neighborhood
    I got in one little fight and my mom got scared
    And said "You're movin' with your auntie and uncle in Bel-Air"
    I begged and pleaded with her day after day
    But she packed my suitcase and sent me on my way
    She gave me a kiss and then she gave me my ticket
    I put my Walkman on and said "I might as well kick it"
    First class, yo, this is bad
    Drinking orange juice out of a champagne glass
    Is this what the people of Bel-Air living like?
    Hmm, this might be all right
    But wait, I hear they're prissy, bourgeois, and all that
    Is this the type of place that they should send this cool cat?
    I don't think so, I'll see when I get there
    I hope they're prepared for the Prince of Bel-Air
    /[Verse 3]
    Well, uh
    The plane landed and when I came out
    There was a dude, looked like a cop, standing there with my name out
    I ain't trying to get arrested yet, I just got here
    I sprang with the quickness like lightning, disappeared
    I whistled for a cab and when it came near
    The license plate said 'Fresh' and it had dice in the mirror
    If anything I could say that this cab was rare
    But I thought "Nah, forget it, yo, Holmes, to Bel-Air!"

    /[Verse 4]
    I pulled
    Up to a house about seven or eight
    And I yelled to the cabbie "Yo', Holmes, smell ya later"
    I looked at my kingdom, I was finally there
    To sit on my throne as the Prince of Bel-Air`,
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-PnszztUwnzlqn8z6Oky-E8ZSAKB-bNHNRQ&usqp=CAU',
    imageDescription: 'This is a bear in the woods',
  }

  constructor() { }

  ngOnInit(): void {
  }

ngAfterViewChecked(){

}

}
