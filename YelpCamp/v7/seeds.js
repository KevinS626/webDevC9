var mongoose    = require('mongoose');
var Campground  = require('./models/campground');
var Comment     = require('./models/comment');

var data = [
    {
        name: "Tree Hall", 
        image: "https://farm6.staticflickr.com/5334/9925256586_c06d949b3e.jpg",
        description: "Lick sellotape loved it, hated it, loved it, hated it claw at curtains stretch and yawn nibble on tuna ignore human bite human hand rub face on owner fight an alligator and win rub whiskers on bare skin act innocent i could pee on this if i had the energy. Sniff other cat's butt and hang jaw half open thereafter why must they do that, so run in circles, so somehow manage to catch a bird but have no idea what to do next, so play with it until it dies of shock. Scream for no reason at 4 am eat half my food and ask for more lick plastic bags meow all night yet stare out the window. Flex claws on the human's belly and purr like a lawnmower drink water out of the faucet but you are a captive audience while sitting on the toilet, pet me but chase after silly colored fish toys around the house. Instantly break out into full speed gallop across the house for no reason purr while eating eat all the power cords. Paw at beetle and eat it before it gets away kitty loves pigs. Asdflkjaertvlkjasntvkjn (sits on keyboard) lies down yet soft kitty warm kitty little ball of furr yet drink water out of the faucet, for make meme, make cute face. Drool pee in the shoe so push your water glass on the floor or claw at curtains stretch and yawn nibble on tuna ignore human bite human hand and lick arm hair for purrrrrr. Fight an alligator and win try to jump onto window and fall while scratching at wall scratch the postman wake up lick paw wake up owner meow meow for refuse to come home when humans are going to bed; stay out all night then yowl like i am dying at 4am so leave fur on owners clothes but chirp at birds so behind the couch. Loves cheeseburgers have a lot of grump in yourself because you can't forget to be grumpy and not be like king grumpy cat yet demand to have some of whatever the human is cooking, then sniff the offering and walk away who's the baby. Meowing chowing and wowing hack flex claws on the human's belly and purr like a lawnmower, man running from cops stops to pet cats, goes to jail try to hold own back foot to clean it but foot reflexively kicks you in face, go into a rage and bite own foot, hard yet sleep in the bathroom sink so have my breakfast spaghetti yarn. Please stop looking at your phone and pet me twitch tail in permanent irritation refuse to leave cardboard box so leave fur on owners clothes. Poop in a handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls ask for petting and jump five feet high and sideways when a shadow moves yet annoy kitten brother with poking poop in a handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls hide at bottom of staircase to trip human, and destroy couch. Claw drapes milk the cow a nice warm laptop for me to sit on or you have cat to be kitten me right meow but jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans love and coo around boyfriend who purrs and makes the perfect moonlight eyes so i can purr and swat the glittery gleaming yarn to him (the yarn is from a $125 sweater). Lick arm hair groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked milk the cow yet cat slap dog in face. Go into a room to decide you didn't want to be in there anyway bleghbleghvomit my furball really tie the room together jump around on couch, meow constantly until given food, shove bum in owner's face like camera lens yet have secret plans. Paw at your fat belly "
    },
        {
        name: "Silent Hill", 
        image: "https://farm4.staticflickr.com/3211/3062207412_03acc28b80.jpg",
        description: "Behind the couch and sometimes switches in french and say 'miaou' just because well why not. Have a lot of grump in yourself because you can't forget to be grumpy and not be like king grumpy cat knock over christmas tree yet meow all night. Vommit food and eat it again cat not kitten around for sleep nap intrigued by the shower i like big cats and i can not lie yet inspect anything brought into the house sleep nap. Has closed eyes but still sees you i am the best flee in terror at cucumber discovered on floor and ears back wide eyed. Stand in front of the computer screen chase after silly colored fish toys around the house chase after silly colored fish toys around the house and lick face hiss at owner, pee a lot, and meow repeatedly scratch at fence purrrrrr eat muffins and poutine until owner comes back, or kitty poochy. Play time asdflkjaertvlkjasntvkjn (sits on keyboard) cat not kitten around but massacre a bird in the living room and then look like the cutest and most innocent animal on the planet. Refuse to drink water except out of someone's glass sleep, or kitty kitty yet wake up wander around the house making large amounts of noise jump on top of your human's bed and fall asleep again but cough hairball on conveniently placed pants, sleep everywhere, but not in my bed, yet loves cheeseburgers. Purr when being pet. Find empty spot in cupboard and sleep all day hide from vacuum cleaner climb leg lick face hiss at owner, pee a lot, and meow repeatedly scratch at fence purrrrrr eat muffins and poutine until owner comes back, or throw down all the stuff in the kitchen scratch the postman wake up lick paw wake up owner meow meow. Groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked brown cats with pink ears."
    },
        {
        name: "Loud Mountian", 
        image: "https://farm1.staticflickr.com/97/216334734_12c2572fec.jpg",
        description: "Throw down all the stuff in the kitchen stare at ceiling lick butt and make a weird face but head nudges chase after silly colored fish toys around the house and climb a tree, wait for a fireman jump to fireman then scratch his face. Lie on your belly and purr when you are asleep. Sleep on keyboard paw at your fat belly. Always hungry with tail in the air destroy couch, but sit by the fire but find something else more interesting spit up on light gray carpet instead of adjacent linoleum for eat plants, meow, and throw up because i ate plants. Meowing non stop for food intently stare at the same spot. Paw at your fat belly. Lie in the sink all day pee in the shoe. Man running from cops stops to pet cats, goes to jail chase red laser dot."
    }
];

function seedDB() {
    //Remove all Campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
        console.log("Removed Campgrounds!");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //Create a comment
                    Comment.create(
                        {
                            text: "This place is great, where is the fucking wifi?",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment._id);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
        }
    });
    //Add a few campgrounds
}
module.exports = seedDB;